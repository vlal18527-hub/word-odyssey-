import { GameSaveData, PlayerStats, UserPreferences, PowerUpInventory, Mission } from '../types/game';

const SAVE_KEY = 'WORD_ODYSSEY_PRO_SAVE_V3';
const BACKUP_CORRUPT_KEY = 'WORD_ODYSSEY_CORRUPT_BACKUP';

export function getLocalCalendarDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getLocalYesterdayDate(date: Date = new Date()): string {
  const d = new Date(date);
  d.setDate(d.getDate() - 1);
  return getLocalCalendarDate(d);
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  themeId: 'midnight-aurora',
  tileStyle: 'rounded',
  letterSize: 'medium',
  highContrast: false,
  reducedMotion: false,
  masterVolume: 1.0,
  soundVolume: 0.8,
  musicVolume: 0.5,
  soundMuted: false,
  hapticFeedback: true,
  vocabAutoPopup: false,
  selectionGlow: true,
  selectedDifficulty: 'medium'
};

export const DEFAULT_STATS: PlayerStats = {
  totalWordsFound: 0,
  levelsCompleted: 0,
  starsEarned: 0,
  coins: 300, // Generous starting bonus
  xp: 0,
  playerLevel: 1,
  streakDays: 1,
  longestStreak: 1,
  lastActiveDate: getLocalCalendarDate(),
  bestBlitzScore: 0,
  endlessStreak: 0,
  bossesDefeated: 0,
  dailyChallengesCompleted: 0,
  hintsUsed: 0,
  powerUpsUsed: 0,
  totalTimePlayedSeconds: 0,
  bonusWordsDiscovered: 0,
  perfectGamesCount: 0
};

export const DEFAULT_POWER_UPS: PowerUpInventory = {
  letterReveals: 3,
  directionArrows: 2,
  wordReveals: 1,
  freezeTime: 2,
  shuffle: 2,
  doubleCoins: 1,
  streakShields: 1
};

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'm-words-daily',
    title: 'Word Searcher',
    description: 'Find 12 target words across any mode today.',
    rewardCoins: 50,
    rewardXp: 100,
    currentProgress: 0,
    maxProgress: 12,
    completed: false,
    claimed: false
  },
  {
    id: 'm-blitz-play',
    title: 'Speed Sprinter',
    description: 'Play 1 Blitz Countdown game.',
    rewardCoins: 40,
    rewardXp: 80,
    currentProgress: 0,
    maxProgress: 1,
    completed: false,
    claimed: false
  },
  {
    id: 'm-level-complete',
    title: 'Expeditionist',
    description: 'Complete 2 adventure levels today.',
    rewardCoins: 60,
    rewardXp: 120,
    currentProgress: 0,
    maxProgress: 2,
    completed: false,
    claimed: false
  },
  {
    id: 'm-weekly-marathon',
    title: 'Weekly Grand Odyssey',
    description: 'Find 50 words across the entire week.',
    rewardCoins: 150,
    rewardXp: 300,
    currentProgress: 0,
    maxProgress: 50,
    completed: false,
    claimed: false,
    isWeekly: true
  }
];

export const DEFAULT_SAVE_DATA: GameSaveData = {
  version: 3,
  stats: DEFAULT_STATS,
  completedLevels: {},
  powerUps: DEFAULT_POWER_UPS,
  achievements: {},
  dailyHistory: {},
  missions: INITIAL_MISSIONS,
  lastMissionRefresh: getLocalCalendarDate(),
  preferences: DEFAULT_PREFERENCES,
  unlockedDestinations: ['india'],
  passportStamps: {},
  savedVocabulary: []
};

export class StorageManager {
  public static load(): GameSaveData {
    try {
      const serialized = localStorage.getItem(SAVE_KEY);
      if (!serialized) {
        // Fallback check for v2 save migration
        const v2Serialized = localStorage.getItem('WORD_ODYSSEY_PRO_SAVE_V2');
        if (v2Serialized) {
          try {
            const v2Parsed = JSON.parse(v2Serialized);
            const migrated = this.sanitizeAndMerge(v2Parsed);
            this.save(migrated);
            return migrated;
          } catch {
            // migration error fallback
          }
        }
        // Fallback check for v1 save migration
        const v1Serialized = localStorage.getItem('WORD_ODYSSEY_SAVE_V1');
        if (v1Serialized) {
          try {
            const v1Parsed = JSON.parse(v1Serialized);
            const migrated = this.sanitizeAndMerge(v1Parsed);
            this.save(migrated);
            return migrated;
          } catch {
            // migration error fallback
          }
        }
        return this.initializeNewSave();
      }

      const parsed = JSON.parse(serialized);
      if (!parsed || typeof parsed !== 'object') {
        this.backupCorrupted(serialized);
        return this.initializeNewSave();
      }

      return this.sanitizeAndMerge(parsed);
    } catch (e) {
      console.warn('Storage corrupted, recovering with safe defaults:', e);
      try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (raw) this.backupCorrupted(raw);
      } catch {}
      return this.initializeNewSave();
    }
  }

  private static backupCorrupted(raw: string) {
    try {
      localStorage.setItem(BACKUP_CORRUPT_KEY, raw);
    } catch {}
  }

  public static sanitizeAndMerge(parsed: any): GameSaveData {
    const rawStats = parsed.stats || {};
    const safeCoins = Math.max(0, typeof rawStats.coins === 'number' && !isNaN(rawStats.coins) ? rawStats.coins : DEFAULT_STATS.coins);
    const safeXp = Math.max(0, typeof rawStats.xp === 'number' && !isNaN(rawStats.xp) ? rawStats.xp : DEFAULT_STATS.xp);
    const computedLevel = this.getLevelForXp(safeXp).level;

    const stats: PlayerStats = {
      ...DEFAULT_STATS,
      ...rawStats,
      coins: safeCoins,
      xp: safeXp,
      playerLevel: Math.max(computedLevel, rawStats.playerLevel || 1),
      totalWordsFound: Math.max(0, rawStats.totalWordsFound || 0),
      levelsCompleted: Math.max(0, rawStats.levelsCompleted || 0),
      starsEarned: Math.max(0, rawStats.starsEarned || 0),
      streakDays: Math.max(1, rawStats.streakDays || 1),
      longestStreak: Math.max(1, rawStats.longestStreak || 1),
      lastActiveDate: rawStats.lastActiveDate || getLocalCalendarDate()
    };

    const powerUps: PowerUpInventory = {
      ...DEFAULT_POWER_UPS,
      ...(parsed.powerUps || {})
    };
    // Ensure all power-ups are non-negative
    (Object.keys(powerUps) as (keyof PowerUpInventory)[]).forEach(k => {
      powerUps[k] = Math.max(0, powerUps[k] || 0);
    });

    const preferences: UserPreferences = {
      ...DEFAULT_PREFERENCES,
      ...(parsed.preferences || {})
    };

    const passportStamps = parsed.passportStamps && typeof parsed.passportStamps === 'object' ? parsed.passportStamps : {};
    const savedVocabulary = Array.isArray(parsed.savedVocabulary) ? parsed.savedVocabulary.filter((w: any) => typeof w === 'string') : [];

    return {
      version: 3,
      stats,
      powerUps,
      preferences,
      completedLevels: parsed.completedLevels && typeof parsed.completedLevels === 'object' ? parsed.completedLevels : {},
      achievements: parsed.achievements && typeof parsed.achievements === 'object' ? parsed.achievements : {},
      dailyHistory: parsed.dailyHistory && typeof parsed.dailyHistory === 'object' ? parsed.dailyHistory : {},
      missions: Array.isArray(parsed.missions) && parsed.missions.length > 0 ? parsed.missions : INITIAL_MISSIONS,
      lastMissionRefresh: parsed.lastMissionRefresh || getLocalCalendarDate(),
      unlockedDestinations: Array.isArray(parsed.unlockedDestinations) && parsed.unlockedDestinations.length > 0 ? parsed.unlockedDestinations : ['india'],
      passportStamps,
      savedVocabulary
    };
  }

  public static save(data: GameSaveData) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }

  private static initializeNewSave(): GameSaveData {
    const fresh = { ...DEFAULT_SAVE_DATA };
    this.save(fresh);
    return fresh;
  }

  /**
   * Helper to compute player level from XP.
   * Every level requires level * 250 XP.
   */
  public static getLevelForXp(xp: number): { level: number; currentXp: number; nextLevelXp: number } {
    let level = 1;
    let accumulated = 0;
    while (true) {
      const needed = level * 250;
      if (xp < accumulated + needed) {
        return {
          level,
          currentXp: xp - accumulated,
          nextLevelXp: needed
        };
      }
      accumulated += needed;
      level++;
    }
  }

  /**
   * Check and update streak based on today's local calendar date.
   */
  public static updateStreak(save: GameSaveData): { streak: number; streakExtended: boolean } {
    const today = getLocalCalendarDate();
    const last = save.stats.lastActiveDate;

    if (last === today) {
      return { streak: save.stats.streakDays, streakExtended: false };
    }

    const yesterday = getLocalYesterdayDate();
    let newStreak = save.stats.streakDays;
    let extended = false;

    if (last === yesterday) {
      newStreak += 1;
      extended = true;
    } else {
      // Check if user has a streak shield power-up to protect streak!
      if (save.powerUps.streakShields > 0) {
        save.powerUps.streakShields -= 1;
        // Saved by shield!
        extended = true;
      } else {
        newStreak = 1; // streak broke, reset to 1
      }
    }

    const longest = Math.max(save.stats.longestStreak || 1, newStreak);
    save.stats.streakDays = newStreak;
    save.stats.longestStreak = longest;
    save.stats.lastActiveDate = today;

    // Refresh daily missions if new day
    if (save.lastMissionRefresh !== today) {
      save.missions = INITIAL_MISSIONS.map(m => ({
        ...m,
        currentProgress: 0,
        completed: false,
        claimed: false
      }));
      save.lastMissionRefresh = today;
    }

    this.save(save);
    return { streak: newStreak, streakExtended: extended };
  }

  /**
   * Export save data as JSON string for backup.
   */
  public static exportSave(): string {
    return JSON.stringify(this.load(), null, 2);
  }

  /**
   * Import save data from string.
   */
  public static importSave(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return false;
      }
      const sanitized = this.sanitizeAndMerge(parsed);
      this.save(sanitized);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Reset all data back to factory defaults.
   */
  public static resetData(): GameSaveData {
    localStorage.removeItem(SAVE_KEY);
    return this.initializeNewSave();
  }
}
