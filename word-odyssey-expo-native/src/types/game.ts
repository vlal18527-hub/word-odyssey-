export type GameMode = 
  | 'adventure' 
  | 'zen' 
  | 'blitz' 
  | 'daily' 
  | 'treasure' 
  | 'vocab'
  | 'challenge'
  | 'endless'
  | 'boss'
  | 'mystery';

export type DifficultyTier = 'beginner' | 'easy' | 'medium' | 'hard' | 'expert';

export type Direction = [number, number]; // [rowDelta, colDelta]

export interface CellCoord {
  r: number;
  c: number;
}

export interface PlacedWord {
  word: string;
  start: CellCoord;
  end: CellCoord;
  direction: Direction;
  path: CellCoord[];
  found: boolean;
  colorIndex?: number;
}

export interface WordDefinition {
  word: string;
  phonetic?: string;
  partOfSpeech: string;
  definition: string;
  funFact?: string;
  exampleSentence?: string;
  synonyms?: string[];
  hindiMeaning?: string;
}

export interface PassportStamp {
  levelId: string;
  destinationId: string;
  landmark: string;
  country: string;
  stampedAt: string;
  fact: string;
  imageUrl?: string;
}

export interface BoardData {
  size: number;
  grid: string[][];
  words: PlacedWord[];
  bonusWordsFound: string[];
}

export interface LevelConfig {
  id: string;
  levelNumber: number;
  destinationId: string;
  title: string;
  description: string;
  gridSize: number;
  words: string[];
  allowedDirections?: Direction[];
  bonusWords?: string[];
  targetTimeSeconds?: number;
  difficulty?: DifficultyTier;
  isBossLevel?: boolean;
  bossStages?: number;
  specialObjective?: string;
  imageUrl?: string;
}

export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  region: string;
  description: string;
  requiredStars: number;
  color: string;
  accentColor: string;
  levels: LevelConfig[];
  unlockedByDefault?: boolean;
  imageUrl: string;
  thumbnailUrl: string;
  imageAlt: string;
  photographer?: string;
}

export type ThemeId = 
  | 'midnight-aurora' 
  | 'golden-horizon' 
  | 'emerald-expedition' 
  | 'ocean-depths' 
  | 'sakura-dreams' 
  | 'arctic-glow' 
  | 'desert-mirage' 
  | 'minimal-light';

export type TileStyle = 'rounded' | 'square' | 'pill' | 'circle';

export type LetterSize = 'small' | 'medium' | 'large';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  colors: {
    bg: string;
    surface: string;
    surfaceHover: string;
    border: string;
    primary: string;
    primaryGlow: string;
    reward: string;
    secondary: string;
    text: string;
    textMuted: string;
    gridTile: string;
    gridTileSelected: string;
    gridTileFound: string;
    selectionLine: string;
    wordFoundPill: string;
  };
}

export interface PlayerStats {
  totalWordsFound: number;
  levelsCompleted: number;
  starsEarned: number;
  coins: number;
  xp: number;
  playerLevel: number;
  streakDays: number;
  longestStreak: number;
  lastActiveDate: string;
  bestBlitzScore: number;
  endlessStreak: number;
  bossesDefeated: number;
  dailyChallengesCompleted: number;
  hintsUsed: number;
  powerUpsUsed: number;
  totalTimePlayedSeconds: number;
  bonusWordsDiscovered: number;
  perfectGamesCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rewardCoins: number;
  rewardXp: number;
  maxProgress: number;
  currentProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface PowerUpInventory {
  letterReveals: number;   // Hint: reveal 1st letter
  directionArrows: number; // Compass: indicate direction
  wordReveals: number;     // Reveal: solve full word
  freezeTime: number;      // Freeze time for 15s
  shuffle: number;         // Shuffle unfound letters
  doubleCoins: number;     // 2x rewards for current level
  streakShields: number;   // Protect streak against misses
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  rewardCoins: number;
  rewardXp: number;
  currentProgress: number;
  maxProgress: number;
  completed: boolean;
  claimed: boolean;
  isWeekly?: boolean;
}

export interface UserPreferences {
  themeId: ThemeId;
  tileStyle: TileStyle;
  letterSize: LetterSize;
  highContrast: boolean;
  reducedMotion: boolean;
  masterVolume: number;
  soundVolume: number;
  musicVolume: number;
  soundMuted: boolean;
  hapticFeedback: boolean;
  vocabAutoPopup: boolean;
  selectionGlow: boolean;
  selectedDifficulty: DifficultyTier;
}

export interface GameSaveData {
  version: number;
  stats: PlayerStats;
  completedLevels: Record<string, { stars: number; bestTime: number; bestScore: number }>;
  powerUps: PowerUpInventory;
  achievements: Record<string, { unlocked: boolean; progress: number }>;
  dailyHistory: Record<string, { completed: boolean; score: number; wordsFound: number }>;
  missions: Mission[];
  lastMissionRefresh: string;
  preferences: UserPreferences;
  unlockedDestinations: string[];
  passportStamps: Record<string, PassportStamp>;
  savedVocabulary: string[];
}

export type ScreenState = 
  | 'title'
  | 'home'
  | 'world-map'
  | 'level-select'
  | 'game'
  | 'daily'
  | 'achievements'
  | 'stats'
  | 'theme-studio'
  | 'settings'
  | 'store'
  | 'missions'
  | 'profile'
  | 'test-suite'
  | 'passport'
  | 'vocab-coach';
