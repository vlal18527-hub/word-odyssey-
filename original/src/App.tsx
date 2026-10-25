/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ScreenState, 
  GameMode, 
  GameSaveData, 
  LevelConfig, 
  Destination, 
  BoardData, 
  PlacedWord, 
  UserPreferences,
  DifficultyTier,
  PowerUpInventory
} from './types/game';
import { StorageManager, DEFAULT_PREFERENCES, getLocalCalendarDate } from './utils/storage';
import { WordSearchEngine, createSeededRandom } from './engine/wordSearch';
import { DESTINATIONS, generateProceduralLevel } from './data/destinations';
import { THEMES } from './data/themes';
import { audio } from './utils/audio';

// Components
import { TitleScreen } from './components/TitleScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { WorldMap } from './components/WorldMap';
import { LevelSelect } from './components/LevelSelect';
import { WordSearchBoard } from './components/WordSearchBoard';
import { WordPillList } from './components/WordPillList';
import { PowerUpBar } from './components/PowerUpBar';
import { BossBattleHeader } from './components/BossBattleHeader';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { GameOverModal } from './components/GameOverModal';
import { VocabularyModal } from './components/VocabularyModal';
import { DailyChallengeScreen } from './components/DailyChallengeScreen';
import { ThemeStudio } from './components/ThemeStudio';
import { AchievementsScreen } from './components/AchievementsScreen';
import { StatsScreen } from './components/StatsScreen';
import { SettingsModal } from './components/SettingsModal';
import { TutorialModal } from './components/TutorialModal';
import { PauseMenu } from './components/PauseMenu';
import { BonusWordsModal } from './components/BonusWordsModal';
import { TestRunnerModal } from './components/TestRunnerModal';
import { PowerUpStoreModal } from './components/PowerUpStoreModal';
import { MissionsModal } from './components/MissionsModal';
import { ProfileModal } from './components/ProfileModal';
import { PassportScreen } from './components/PassportScreen';
import { VocabCoachScreen } from './components/VocabCoachScreen';
import { MysteryLandmarkView } from './components/MysteryLandmarkView';
import { PracticePuzzleModal } from './components/PracticePuzzleModal';
import { getLevelAsset } from './data/levelAssets';

// Icons
import { 
  Pause, 
  Clock, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Gem, 
  Coins, 
  Flame,
  Award,
  ShoppingBag,
  Target,
  Snowflake,
  CircleDollarSign
} from 'lucide-react';

export default function App() {
  // Persistence state
  const [saveData, setSaveData] = useState<GameSaveData>(() => StorageManager.load());
  const [screen, setScreen] = useState<ScreenState>('title');
  const [currentMode, setCurrentMode] = useState<GameMode>('adventure');

  // Destination & Level Selection
  const [activeDestination, setActiveDestination] = useState<Destination>(() => DESTINATIONS[0]);
  const [activeLevel, setActiveLevel] = useState<LevelConfig>(() => DESTINATIONS[0].levels[0]);

  // Board State
  const [board, setBoard] = useState<BoardData | null>(null);
  const [activeHint, setActiveHint] = useState<{ type: 'letter' | 'direction' | 'word'; word: PlacedWord } | null>(null);

  // Gameplay Run State
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [blitzRemainingSeconds, setBlitzRemainingSeconds] = useState(120);
  const [blitzScore, setBlitzScore] = useState(0);
  const [blitzMultiplier, setBlitzMultiplier] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [levelWon, setLevelWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [bossStage, setBossStage] = useState(1);
  const [foundBonusWords, setFoundBonusWords] = useState<string[]>([]);

  // Power-up active effects
  const [isTimeFrozen, setIsTimeFrozen] = useState(false);
  const [freezeSecondsRemaining, setFreezeSecondsRemaining] = useState(0);
  const [isDoubleCoinsActive, setIsDoubleCoinsActive] = useState(false);

  // Modals & Screens
  const [showSettings, setShowSettings] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [showTestRunner, setShowTestRunner] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [showMissions, setShowMissions] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [activeVocabWord, setActiveVocabWord] = useState<string | null>(null);
  const [lastCalculatedScore, setLastCalculatedScore] = useState(850);
  const [isLandmarkMinimized, setIsLandmarkMinimized] = useState(false);

  // References
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const freezeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const comboTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isAttemptResolvedRef = useRef(false);
  const isProcessingPowerUpRef = useRef(false);
  const preferences = saveData.preferences;
  const currentTheme = THEMES[preferences.themeId] || THEMES['midnight-aurora'];

  // Initialize Audio & Streak on startup
  useEffect(() => {
    audio.setVolumes(
      preferences.masterVolume,
      preferences.soundVolume,
      preferences.musicVolume,
      preferences.soundMuted
    );
    const { streakExtended } = StorageManager.updateStreak(saveData);
    if (streakExtended) {
      setSaveData(prev => {
        const next = {
          ...prev,
          stats: {
            ...prev.stats,
            coins: prev.stats.coins + prev.stats.streakDays * 15
          }
        };
        StorageManager.save(next);
        return next;
      });
    }
  }, []);

  // Update preferences helper
  const handleUpdatePreferences = (updated: Partial<UserPreferences>) => {
    setSaveData(prev => {
      const nextPref = { ...prev.preferences, ...updated };
      const nextSave = { ...prev, preferences: nextPref };
      StorageManager.save(nextSave);
      return nextSave;
    });
  };

  // Mute toggle helper
  const handleToggleMute = () => {
    const nextMuted = !preferences.soundMuted;
    handleUpdatePreferences({ soundMuted: nextMuted });
    audio.setVolumes(preferences.masterVolume, preferences.soundVolume, preferences.musicVolume, nextMuted);
  };

  // Generate Board for Level / Mode
  const startPuzzle = useCallback((level: LevelConfig, mode: GameMode) => {
    isAttemptResolvedRef.current = false;
    setCurrentMode(mode);
    setActiveLevel(level);
    setElapsedSeconds(0);
    setBlitzRemainingSeconds(mode === 'challenge' ? 90 : 120);
    setBlitzScore(0);
    setBlitzMultiplier(1);
    setLevelWon(false);
    setIsGameOver(false);
    setBossStage(1);
    setIsPaused(false);
    setActiveHint(null);
    setFoundBonusWords([]);
    setIsTimeFrozen(false);
    setFreezeSecondsRemaining(0);
    setIsDoubleCoinsActive(false);

    if (freezeTimerRef.current) clearInterval(freezeTimerRef.current);

    // Audio cues
    if (level.isBossLevel) {
      audio.playBossRoar();
    } else if (mode === 'zen') {
      audio.startAmbientZen();
    } else {
      audio.stopAmbientZen();
    }

    // Seeded random for daily challenge based on local date
    let randomFn: (() => number) | undefined = undefined;
    if (mode === 'daily') {
      const today = getLocalCalendarDate();
      const numericSeed = parseInt(today.replace(/-/g, ''), 10);
      randomFn = createSeededRandom(numericSeed);
    }

    // Directions enforcement based on player difficulty or level
    const diff = level.difficulty || preferences.selectedDifficulty || 'medium';
    const allowedDirections = WordSearchEngine.getDirectionsForDifficulty(diff);

    const generated = WordSearchEngine.generateBoard({
      size: level.gridSize,
      words: level.words,
      allowedDirections,
      randomFn
    });

    setBoard(generated);
    setScreen('game');
  }, [preferences.selectedDifficulty]);

  // Start next level with procedural continuation preserving current mode and checking world unlocks
  const startNextLevel = () => {
    // If procedural level 101+ or beyond campaign, preserve active mode!
    if (activeLevel.levelNumber >= 100 || activeLevel.id.startsWith('proc-')) {
      const nextProcNum = activeLevel.levelNumber + 1;
      const procLevel = generateProceduralLevel(nextProcNum);
      const nextMode = currentMode === 'endless' ? 'endless' : currentMode;
      startPuzzle(procLevel, nextMode);
      return;
    }

    const currentIdx = activeDestination.levels.findIndex(l => l.id === activeLevel.id);
    if (currentIdx !== -1 && currentIdx < activeDestination.levels.length - 1) {
      const nextLvl = activeDestination.levels[currentIdx + 1];
      startPuzzle(nextLvl, currentMode);
    } else {
      // Find next unlocked destination or world map
      const destIdx = DESTINATIONS.findIndex(d => d.id === activeDestination.id);
      if (destIdx !== -1 && destIdx < DESTINATIONS.length - 1) {
        const nextDest = DESTINATIONS[destIdx + 1];
        if (saveData.stats.starsEarned >= nextDest.requiredStars) {
          setActiveDestination(nextDest);
          setScreen('level-select');
        } else {
          // If destination is locked, return to world map
          setScreen('world-map');
        }
      } else {
        setScreen('world-map');
      }
    }
  };

  // Timer loop
  useEffect(() => {
    if (screen !== 'game' || isPaused || levelWon || isGameOver) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      // If time is frozen by power-up, do not increment/decrement game timer
      if (isTimeFrozen) {
        return;
      }

      if (currentMode === 'blitz' || currentMode === 'challenge') {
        setBlitzRemainingSeconds(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          if (prev <= 10) {
            audio.playTimerTick(true);
          }
          return prev - 1;
        });
      } else {
        setElapsedSeconds(prev => prev + 1);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screen, isPaused, levelWon, isGameOver, currentMode, isTimeFrozen]);

  // Handle countdown time up: Strictly failure, never victory!
  const handleTimeUp = () => {
    if (isAttemptResolvedRef.current || levelWon || isGameOver) return;
    isAttemptResolvedRef.current = true;
    audio.playInvalid();
    setIsGameOver(true);
  };

  // Word Discovered Handler
  const handleWordDiscovered = (matched: PlacedWord, isBonus: boolean) => {
    if (!board) return;

    if (isBonus) {
      const wordStr = matched.word.toUpperCase();
      if (!foundBonusWords.includes(wordStr)) {
        setFoundBonusWords(prev => [...prev, wordStr]);
        audio.playBonusWord();

        const addedCoins = isDoubleCoinsActive ? 20 : 10;
        setSaveData(prev => {
          const next = {
            ...prev,
            stats: {
              ...prev.stats,
              coins: prev.stats.coins + addedCoins,
              bonusWordsDiscovered: prev.stats.bonusWordsDiscovered + 1
            }
          };
          StorageManager.save(next);
          return next;
        });
      }
      return;
    }

    // Target word discovered
    const updatedWords = board.words.map(w => {
      if (w.word.toUpperCase() === matched.word.toUpperCase()) {
        return { ...w, found: true };
      }
      return w;
    });

    setBoard({
      ...board,
      words: updatedWords
    });

    // Clear active hint if it matched this word
    if (activeHint && activeHint.word.word.toUpperCase() === matched.word.toUpperCase()) {
      setActiveHint(null);
    }

    // Check boss stage phase transition if applicable
    if (activeLevel.isBossLevel && (activeLevel.bossStages || 1) > 1) {
      const remaining = updatedWords.filter(w => !w.found).length;
      const total = updatedWords.length;
      const targetStage = remaining <= Math.floor(total / 3) ? 3 : remaining <= Math.floor((2 * total) / 3) ? 2 : 1;
      if (targetStage > bossStage) {
        setBossStage(targetStage);
        audio.playBossRoar();
      }
    }

    // Blitz mode combo & time bonus (+5 seconds per find!)
    if (currentMode === 'blitz') {
      setBlitzRemainingSeconds(prev => Math.min(180, prev + 5));
      const addedPoints = matched.word.length * 100 * blitzMultiplier;
      setBlitzScore(prev => prev + addedPoints);
      setBlitzMultiplier(prev => Math.min(5, prev + 1));

      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => {
        setBlitzMultiplier(1);
      }, 8000);
    }

    // Update global words found stats & missions progress
    setSaveData(prev => {
      const nextMissions = prev.missions.map(m => {
        if (m.id === 'm-words-daily' || m.id === 'm-weekly-marathon') {
          const nextProg = m.currentProgress + 1;
          return {
            ...m,
            currentProgress: nextProg,
            completed: nextProg >= m.maxProgress
          };
        }
        return m;
      });

      const nextCoins = prev.stats.coins + (isDoubleCoinsActive ? 10 : 5);
      const nextStats = {
        ...prev.stats,
        totalWordsFound: prev.stats.totalWordsFound + 1,
        coins: nextCoins,
        xp: prev.stats.xp + 25
      };

      const next = { ...prev, stats: nextStats, missions: nextMissions };
      StorageManager.save(next);
      return next;
    });

    // If Vocabulary mode or preference has vocab auto popup, open definition
    if (currentMode === 'vocab' || preferences.vocabAutoPopup) {
      setActiveVocabWord(matched.word);
    }

    // Check if ALL target words found
    const allFound = updatedWords.every(w => w.found);
    if (allFound) {
      handlePuzzleComplete();
    }
  };

  // Puzzle Completion: Dedicated handler ensuring rewards are non-duplicative and game over is respected
  const handlePuzzleComplete = () => {
    if (isAttemptResolvedRef.current || levelWon || isGameOver) return;
    isAttemptResolvedRef.current = true;

    if (activeLevel.isBossLevel) {
      audio.playBossDefeat();
    } else {
      audio.playVictory();
    }
    setLevelWon(true);

    const target = activeLevel.targetTimeSeconds || 180;
    let starsEarned = 1;
    if (elapsedSeconds <= target) starsEarned = 3;
    else if (elapsedSeconds <= target * 1.5) starsEarned = 2;

    // Real computed score based on word volume, speed bonus, and accuracy
    const baseWordScore = activeLevel.words.length * 150;
    const timeBonus = Math.max(0, (target - elapsedSeconds) * 12);
    const hintsUsedPenalty = activeHint ? 100 : 0;
    const computedScore = Math.max(150, Math.round(baseWordScore + timeBonus - hintsUsedPenalty));
    setLastCalculatedScore(computedScore);

    setSaveData(prev => {
      const existing = prev.completedLevels[activeLevel.id];
      const isReplay = !!existing;
      const starDelta = existing ? Math.max(0, starsEarned - existing.stars) : starsEarned;

      let baseCoins = 0;
      let xpReward = 0;
      if (!isReplay) {
        baseCoins = starsEarned * 30 + (activeLevel.isBossLevel ? 150 : 60);
        xpReward = starsEarned * 100 + (activeLevel.isBossLevel ? 400 : 150);
      } else {
        // Fair replay incentive without reward duplication farming
        baseCoins = 5 + starDelta * 30;
        xpReward = 10 + starDelta * 50;
      }
      const finalCoinsReward = isDoubleCoinsActive ? baseCoins * 2 : baseCoins;

      const bestStars = existing ? Math.max(existing.stars, starsEarned) : starsEarned;
      const bestTime = existing ? Math.min(existing.bestTime, elapsedSeconds) : elapsedSeconds;
      const bestScore = existing ? Math.max(existing.bestScore || 0, computedScore) : computedScore;

      const nextStarsTotal = prev.stats.starsEarned + starDelta;
      const unlocked = [...prev.unlockedDestinations];
      DESTINATIONS.forEach(d => {
        if (!unlocked.includes(d.id) && nextStarsTotal >= d.requiredStars) {
          unlocked.push(d.id);
        }
      });

      // Update missions
      const nextMissions = prev.missions.map(m => {
        if (m.id === 'm-level-complete') {
          const nextProg = m.currentProgress + 1;
          return {
            ...m,
            currentProgress: nextProg,
            completed: nextProg >= m.maxProgress
          };
        }
        return m;
      });

      const dailyHist = { ...prev.dailyHistory };
      const today = getLocalCalendarDate();
      let isFirstDailyToday = false;
      if (currentMode === 'daily') {
        if (!dailyHist[today]?.completed) {
          isFirstDailyToday = true;
          dailyHist[today] = {
            completed: true,
            score: computedScore,
            wordsFound: activeLevel.words.length
          };
        }
      }

      // Living Travel Passport Stamp
      const asset = getLevelAsset(activeLevel.id);
      const nextStamps = {
        ...(prev.passportStamps || {}),
        [activeLevel.id]: {
          levelId: activeLevel.id,
          destinationId: activeDestination.id,
          landmark: asset.caption.replace(/BOSS ARENA: /g, ''),
          country: activeDestination.region,
          stampedAt: getLocalCalendarDate(),
          fact: asset.imageAlt,
          imageUrl: asset.imageUrl
        }
      };

      const nextData: GameSaveData = {
        ...prev,
        stats: {
          ...prev.stats,
          starsEarned: nextStarsTotal,
          levelsCompleted: isReplay ? prev.stats.levelsCompleted : prev.stats.levelsCompleted + 1,
          coins: Math.max(0, prev.stats.coins + finalCoinsReward),
          xp: Math.max(0, prev.stats.xp + xpReward),
          bossesDefeated: activeLevel.isBossLevel && !isReplay ? (prev.stats.bossesDefeated || 0) + 1 : prev.stats.bossesDefeated,
          endlessStreak: currentMode === 'endless' ? (prev.stats.endlessStreak || 0) + 1 : prev.stats.endlessStreak,
          dailyChallengesCompleted: isFirstDailyToday ? prev.stats.dailyChallengesCompleted + 1 : prev.stats.dailyChallengesCompleted,
          bestBlitzScore: currentMode === 'blitz' ? Math.max(prev.stats.bestBlitzScore, blitzScore) : prev.stats.bestBlitzScore,
          totalTimePlayedSeconds: (prev.stats.totalTimePlayedSeconds || 0) + elapsedSeconds
        },
        completedLevels: {
          ...prev.completedLevels,
          [activeLevel.id]: {
            stars: bestStars,
            bestTime: bestTime,
            bestScore: bestScore
          }
        },
        unlockedDestinations: unlocked,
        dailyHistory: dailyHist,
        missions: nextMissions,
        passportStamps: nextStamps
      };

      StorageManager.save(nextData);
      return nextData;
    });
  };

  // Power-Up: Letter Reveal (Guaranteed negative balance protection & debouncing)
  const handleUseLetterHint = () => {
    if (isProcessingPowerUpRef.current || !board) return;
    isProcessingPowerUpRef.current = true;
    setTimeout(() => { isProcessingPowerUpRef.current = false; }, 250);

    const unfound = board.words.filter(w => !w.found);
    if (unfound.length === 0) return;

    if (saveData.powerUps.letterReveals <= 0 && saveData.stats.coins < 25) {
      audio.playInvalid();
      setShowStore(true);
      return;
    }

    const target = unfound[Math.floor(Math.random() * unfound.length)];
    setActiveHint({ type: 'letter', word: target });
    audio.playHint();

    setSaveData(prev => {
      const nextPowerUps = { ...prev.powerUps };
      let nextCoins = prev.stats.coins;
      if (nextPowerUps.letterReveals > 0) {
        nextPowerUps.letterReveals -= 1;
      } else {
        nextCoins -= 25;
      }
      const next = {
        ...prev,
        powerUps: nextPowerUps,
        stats: { ...prev.stats, coins: Math.max(0, nextCoins), hintsUsed: prev.stats.hintsUsed + 1 }
      };
      StorageManager.save(next);
      return next;
    });
  };

  // Power-Up: Direction Compass
  const handleUseDirectionHint = () => {
    if (isProcessingPowerUpRef.current || !board) return;
    isProcessingPowerUpRef.current = true;
    setTimeout(() => { isProcessingPowerUpRef.current = false; }, 250);

    const unfound = board.words.filter(w => !w.found);
    if (unfound.length === 0) return;

    if (saveData.powerUps.directionArrows <= 0 && saveData.stats.coins < 50) {
      audio.playInvalid();
      setShowStore(true);
      return;
    }

    const target = unfound[Math.floor(Math.random() * unfound.length)];
    setActiveHint({ type: 'direction', word: target });
    audio.playHint();

    setSaveData(prev => {
      const nextPowerUps = { ...prev.powerUps };
      let nextCoins = prev.stats.coins;
      if (nextPowerUps.directionArrows > 0) {
        nextPowerUps.directionArrows -= 1;
      } else {
        nextCoins -= 50;
      }
      const next = {
        ...prev,
        powerUps: nextPowerUps,
        stats: { ...prev.stats, coins: Math.max(0, nextCoins), hintsUsed: prev.stats.hintsUsed + 1 }
      };
      StorageManager.save(next);
      return next;
    });
  };

  // Power-Up: Full Word Reveal
  const handleUseWordHint = () => {
    if (isProcessingPowerUpRef.current || !board) return;
    isProcessingPowerUpRef.current = true;
    setTimeout(() => { isProcessingPowerUpRef.current = false; }, 250);

    const unfound = board.words.filter(w => !w.found);
    if (unfound.length === 0) return;

    if (saveData.powerUps.wordReveals <= 0 && saveData.stats.coins < 100) {
      audio.playInvalid();
      setShowStore(true);
      return;
    }

    const target = unfound[Math.floor(Math.random() * unfound.length)];
    audio.playHint();
    handleWordDiscovered(target, false);

    setSaveData(prev => {
      const nextPowerUps = { ...prev.powerUps };
      let nextCoins = prev.stats.coins;
      if (nextPowerUps.wordReveals > 0) {
        nextPowerUps.wordReveals -= 1;
      } else {
        nextCoins -= 100;
      }
      const next = {
        ...prev,
        powerUps: nextPowerUps,
        stats: { ...prev.stats, coins: Math.max(0, nextCoins), hintsUsed: prev.stats.hintsUsed + 1 }
      };
      StorageManager.save(next);
      return next;
    });
  };

  // Power-Up: Freeze Time (15s)
  const handleUseFreezeTime = () => {
    if (isTimeFrozen) return;

    if (saveData.powerUps.freezeTime <= 0 && saveData.stats.coins < 70) {
      audio.playInvalid();
      setShowStore(true);
      return;
    }

    audio.playFreezeTime();
    setIsTimeFrozen(true);
    setFreezeSecondsRemaining(15);

    setSaveData(prev => {
      const nextPowerUps = { ...prev.powerUps };
      let nextCoins = prev.stats.coins;
      if (nextPowerUps.freezeTime > 0) {
        nextPowerUps.freezeTime -= 1;
      } else {
        nextCoins -= 70;
      }
      const next = {
        ...prev,
        powerUps: nextPowerUps,
        stats: { ...prev.stats, coins: Math.max(0, nextCoins), powerUpsUsed: (prev.stats.powerUpsUsed || 0) + 1 }
      };
      StorageManager.save(next);
      return next;
    });

    if (freezeTimerRef.current) clearInterval(freezeTimerRef.current);
    freezeTimerRef.current = setInterval(() => {
      setFreezeSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(freezeTimerRef.current!);
          setIsTimeFrozen(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Power-Up: Grid Shuffle
  const handleUseShuffle = () => {
    if (!board) return;

    if (saveData.powerUps.shuffle <= 0 && saveData.stats.coins < 60) {
      audio.playInvalid();
      setShowStore(true);
      return;
    }

    audio.playShuffle();
    const diff = activeLevel.difficulty || preferences.selectedDifficulty || 'medium';
    const shuffled = WordSearchEngine.shuffleBoard(board, diff);
    setBoard(shuffled);
    setActiveHint(null);

    setSaveData(prev => {
      const nextPowerUps = { ...prev.powerUps };
      let nextCoins = prev.stats.coins;
      if (nextPowerUps.shuffle > 0) {
        nextPowerUps.shuffle -= 1;
      } else {
        nextCoins -= 60;
      }
      const next = {
        ...prev,
        powerUps: nextPowerUps,
        stats: { ...prev.stats, coins: Math.max(0, nextCoins), powerUpsUsed: (prev.stats.powerUpsUsed || 0) + 1 }
      };
      StorageManager.save(next);
      return next;
    });
  };

  // Power-Up: Double Coins
  const handleUseDoubleCoins = () => {
    if (isDoubleCoinsActive) return;

    if (saveData.powerUps.doubleCoins <= 0 && saveData.stats.coins < 100) {
      audio.playInvalid();
      setShowStore(true);
      return;
    }

    audio.playDoubleCoins();
    setIsDoubleCoinsActive(true);

    setSaveData(prev => {
      const nextPowerUps = { ...prev.powerUps };
      let nextCoins = prev.stats.coins;
      if (nextPowerUps.doubleCoins > 0) {
        nextPowerUps.doubleCoins -= 1;
      } else {
        nextCoins -= 100;
      }
      const next = {
        ...prev,
        powerUps: nextPowerUps,
        stats: { ...prev.stats, coins: Math.max(0, nextCoins), powerUpsUsed: (prev.stats.powerUpsUsed || 0) + 1 }
      };
      StorageManager.save(next);
      return next;
    });
  };

  // Purchase item in Power-Up Armory Bazaar (Protected against negative balance)
  const handlePurchasePowerUp = (itemKey: keyof PowerUpInventory, cost: number, amount: number) => {
    setSaveData(prev => {
      if (prev.stats.coins < cost) {
        audio.playInvalid();
        return prev;
      }
      const nextPowerUps = {
        ...prev.powerUps,
        [itemKey]: (prev.powerUps[itemKey] || 0) + amount
      };
      const next = {
        ...prev,
        stats: { ...prev.stats, coins: prev.stats.coins - cost },
        powerUps: nextPowerUps
      };
      StorageManager.save(next);
      return next;
    });
  };

  // Claim Mission Reward (Protected against double claiming)
  const handleClaimMission = (missionId: string, rewardCoins: number, rewardXp: number) => {
    setSaveData(prev => {
      const mission = prev.missions.find(m => m.id === missionId);
      if (!mission || mission.claimed || !mission.completed) {
        return prev;
      }
      const updatedMissions = prev.missions.map(m => {
        if (m.id === missionId) {
          return { ...m, claimed: true };
        }
        return m;
      });
      const next = {
        ...prev,
        stats: {
          ...prev.stats,
          coins: prev.stats.coins + rewardCoins,
          xp: prev.stats.xp + rewardXp
        },
        missions: updatedMissions
      };
      StorageManager.save(next);
      return next;
    });
  };

  // Claim Achievement
  const handleClaimAchievement = (id: string, coins: number, xp: number) => {
    setSaveData(prev => {
      const next = {
        ...prev,
        stats: {
          ...prev.stats,
          coins: prev.stats.coins + coins,
          xp: prev.stats.xp + xp
        },
        achievements: {
          ...prev.achievements,
          [id]: { unlocked: true, progress: 100 }
        }
      };
      StorageManager.save(next);
      return next;
    });
  };

  // Data reset
  const handleDataReset = () => {
    const fresh = StorageManager.resetData();
    setSaveData(fresh);
    setScreen('title');
  };

  // Find next uncompleted adventure level
  const getNextAdventureLevel = (): { destination: Destination; levelNumber: number; level: LevelConfig } => {
    for (const dest of DESTINATIONS) {
      for (const lvl of dest.levels) {
        if (!saveData.completedLevels[lvl.id]) {
          return { destination: dest, levelNumber: lvl.levelNumber, level: lvl };
        }
      }
    }
    return {
      destination: DESTINATIONS[0],
      levelNumber: 1,
      level: DESTINATIONS[0].levels[0]
    };
  };

  const nextAdv = getNextAdventureLevel();

  // Mode Selection Dispatcher
  const handleSelectMode = (mode: GameMode) => {
    switch (mode) {
      case 'adventure': {
        setActiveDestination(nextAdv.destination);
        startPuzzle(nextAdv.level, 'adventure');
        break;
      }
      case 'daily': {
        setScreen('daily');
        break;
      }
      case 'zen': {
        const zenLevel: LevelConfig = {
          id: 'zen-custom',
          levelNumber: 1,
          destinationId: 'zen',
          title: 'Zen Sanctuary Garden',
          description: 'Peaceful boundless puzzle with tranquil ambient harmonics.',
          gridSize: 10,
          difficulty: 'beginner',
          words: ['TRANQUIL', 'SERENITY', 'BREATHE', 'HARMONY', 'LOTUS', 'PEACE', 'CALM', 'BALANCE'],
          bonusWords: ['ZEN', 'JOY', 'SUN']
        };
        startPuzzle(zenLevel, 'zen');
        break;
      }
      case 'blitz': {
        // Track mission play
        setSaveData(prev => {
          const updatedMissions = prev.missions.map(m => {
            if (m.id === 'm-blitz-play') {
              return { ...m, currentProgress: 1, completed: true };
            }
            return m;
          });
          const next = { ...prev, missions: updatedMissions };
          StorageManager.save(next);
          return next;
        });

        const blitzLevel: LevelConfig = {
          id: 'blitz-custom',
          levelNumber: 1,
          destinationId: 'blitz',
          title: 'Speed Lightning Rush',
          description: 'Find as many target words as fast as you can! +5s bonus per find.',
          gridSize: 10,
          difficulty: 'medium',
          words: ['LIGHTNING', 'COMBO', 'RAPID', 'SWIFT', 'ACCEL', 'SURGE', 'MOMENTUM'],
          bonusWords: ['FAST', 'RUN', 'ZAP']
        };
        startPuzzle(blitzLevel, 'blitz');
        break;
      }
      case 'challenge': {
        const chalLevel: LevelConfig = {
          id: 'chal-custom',
          levelNumber: 1,
          destinationId: 'challenge',
          title: 'Strict Iron Challenge',
          description: 'No hints allowed! Solve all words before the 90-second clock expires.',
          gridSize: 11,
          difficulty: 'hard',
          words: ['DISCIPLINE', 'PRECISION', 'PERFECTION', 'FOCUS', 'FORTITUDE', 'MASTERY'],
          bonusWords: ['TRUE', 'KEEN', 'SHARP']
        };
        startPuzzle(chalLevel, 'challenge');
        break;
      }
      case 'endless': {
        const streak = saveData.stats.endlessStreak || 0;
        const endlessLevel = generateProceduralLevel(streak + 1);
        startPuzzle(endlessLevel, 'endless');
        break;
      }
      case 'boss': {
        // Find nearest boss level (10, 20, 30...)
        const bossLevel = DESTINATIONS[0].levels.find(l => l.isBossLevel) || DESTINATIONS[0].levels[9];
        setActiveDestination(DESTINATIONS[0]);
        startPuzzle(bossLevel, 'boss');
        break;
      }
      case 'treasure': {
        const treasureLevel: LevelConfig = {
          id: 'treasure-custom',
          levelNumber: 1,
          destinationId: 'treasure',
          title: 'Bounty of the Lost Galleon',
          description: 'Hidden gold coins and mystery bonus words scattered throughout the grid.',
          gridSize: 12,
          difficulty: 'medium',
          words: ['GALLEON', 'TREASURE', 'DOUBLOON', 'COMPASS', 'ISLAND', 'SAPPHIRE', 'CORAL', 'PIRATE'],
          bonusWords: ['GOLD', 'COIN', 'GEM', 'CHEST', 'MAP']
        };
        startPuzzle(treasureLevel, 'treasure');
        break;
      }
      case 'vocab': {
        const vocabLevel: LevelConfig = {
          id: 'vocab-custom',
          levelNumber: 1,
          destinationId: 'vocab',
          title: 'Lexicon of Civilizations',
          description: 'Expand your vocabulary with rich definitions and etymological trivia.',
          gridSize: 10,
          difficulty: 'easy',
          words: ['PYRAMID', 'LOTUS', 'MATCHA', 'LAVENDER', 'AURORA', 'BAMBOO'],
          bonusWords: ['WORD', 'BOOK', 'MIND']
        };
        startPuzzle(vocabLevel, 'vocab');
        break;
      }
      case 'mystery': {
        const mysteryLevel = nextAdv.level;
        setActiveDestination(nextAdv.destination);
        startPuzzle(mysteryLevel, 'mystery');
        break;
      }
    }
  };

  // Format timer
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isBossLevel = activeLevel?.isBossLevel;

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-between selection:bg-[#35D6B0]/30 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]"
      style={{
        backgroundColor: currentTheme.colors.bg,
        color: preferences.highContrast ? '#FFFFFF' : currentTheme.colors.text
      }}
    >
      {/* Top Persistent Perimeter Bar */}
      {screen !== 'title' && (
        <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md px-4 py-2 flex items-center justify-between"
          style={{
            backgroundColor: `${currentTheme.colors.bg}E6`,
            borderColor: currentTheme.colors.border
          }}
        >
          {/* Left: Brand / Level Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                audio.playClick();
                audio.stopAmbientZen();
                setScreen('home');
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-[#153C43] border border-[#35D6B0]/40 flex items-center justify-center text-[#35D6B0] shadow-sm">
                <Award className="w-4 h-4" />
              </div>
              <span className="font-black font-['Outfit'] tracking-wider text-sm hidden sm:inline text-white">
                WORD ODYSSEY PRO
              </span>
            </button>

            {/* Level indicator if playing */}
            {screen === 'game' && activeLevel && (
              <div className="flex items-center gap-2 pl-3 border-l border-white/10 text-xs font-semibold">
                <span className="text-[#35D6B0] uppercase font-mono tracking-wider">
                  {currentMode === 'adventure' ? `Lv ${activeLevel.levelNumber}` : currentMode.toUpperCase()}
                </span>
                <span className="text-slate-400 hidden md:inline truncate max-w-[140px]">
                  {activeLevel.title}
                </span>
              </div>
            )}
          </div>

          {/* Right: Currency & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Missions button shortcut */}
            <button
              onClick={() => {
                audio.playClick();
                setShowMissions(true);
              }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#F5C66B] transition-colors cursor-pointer"
              title="Daily Missions"
            >
              <Target className="w-4 h-4" />
            </button>

            {/* Coins */}
            <button
              onClick={() => {
                audio.playClick();
                setShowStore(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#F5C66B] cursor-pointer transition-colors"
              title="Open Armory Store"
            >
              <Coins className="w-3.5 h-3.5" />
              <span className="font-mono tabular-nums">{saveData.stats.coins}</span>
              <ShoppingBag className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {/* Streak */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-400">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span className="font-mono">{saveData.stats.streakDays}</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleMute}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={preferences.soundMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {preferences.soundMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#35D6B0]" />
              )}
            </button>

            {/* Tutorial Helper */}
            <button
              onClick={() => {
                audio.playClick();
                setShowTutorial(true);
              }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="How to Play"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </header>
      )}

      {/* Main View Router */}
      <main className="flex-1 flex flex-col justify-center">
        {screen === 'title' && (
          <TitleScreen
            stats={saveData.stats}
            isMuted={preferences.soundMuted}
            onStartAdventure={() => {
              setActiveDestination(nextAdv.destination);
              startPuzzle(nextAdv.level, 'adventure');
            }}
            onOpenDaily={() => setScreen('daily')}
            onOpenWorldMap={() => setScreen('world-map')}
            onToggleMute={handleToggleMute}
            onOpenAchievements={() => setScreen('achievements')}
          />
        )}

        {screen === 'home' && (
          <HomeDashboard
            stats={saveData.stats}
            currentDestination={nextAdv.destination}
            nextLevelNumber={nextAdv.levelNumber}
            selectedDifficulty={preferences.selectedDifficulty || 'medium'}
            onSelectDifficulty={diff => handleUpdatePreferences({ selectedDifficulty: diff })}
            onSelectMode={handleSelectMode}
            onOpenWorldMap={() => setScreen('world-map')}
            onOpenThemeStudio={() => setScreen('theme-studio')}
            onOpenAchievements={() => setScreen('achievements')}
            onOpenStats={() => setScreen('stats')}
            onOpenStore={() => setShowStore(true)}
            onOpenMissions={() => setShowMissions(true)}
            onOpenProfile={() => setShowProfile(true)}
            onOpenTestRunner={() => setShowTestRunner(true)}
            onOpenPassport={() => setScreen('passport')}
            onOpenVocabCoach={() => setScreen('vocab-coach')}
            onOpenPractice={() => setShowPractice(true)}
          />
        )}

        {screen === 'passport' && (
          <PassportScreen
            saveData={saveData}
            onBack={() => setScreen('home')}
            onSelectLevelToPlay={(dest, lvlIndex) => {
              setActiveDestination(dest);
              startPuzzle(dest.levels[lvlIndex], 'adventure');
            }}
          />
        )}

        {screen === 'vocab-coach' && (
          <VocabCoachScreen
            saveData={saveData}
            onUpdateSave={(next) => {
              setSaveData(next);
              StorageManager.save(next);
            }}
            onBack={() => setScreen('home')}
          />
        )}

        {screen === 'world-map' && (
          <WorldMap
            saveData={saveData}
            onSelectDestination={dest => {
              setActiveDestination(dest);
              setScreen('level-select');
            }}
            onBack={() => setScreen('home')}
          />
        )}

        {screen === 'level-select' && (
          <LevelSelect
            destination={activeDestination}
            saveData={saveData}
            onSelectLevel={lvl => startPuzzle(lvl, 'adventure')}
            onBack={() => setScreen('world-map')}
          />
        )}

        {screen === 'daily' && (
          <DailyChallengeScreen
            saveData={saveData}
            onPlayDaily={() => {
              const dailyLvl: LevelConfig = {
                id: `daily-${getLocalCalendarDate()}`,
                levelNumber: 1,
                destinationId: 'daily',
                title: "Cosmic Odyssey Daily",
                description: 'A date-synchronized puzzle unique for all explorers today.',
                gridSize: 10,
                difficulty: 'medium',
                words: ['NEBULA', 'ECLIPSE', 'GALAXY', 'COSMOS', 'COMET', 'STARDUST', 'METEOR'],
                bonusWords: ['STAR', 'SUN', 'MOON', 'SKY']
              };
              startPuzzle(dailyLvl, 'daily');
            }}
            onBack={() => setScreen('home')}
          />
        )}

        {screen === 'theme-studio' && (
          <ThemeStudio
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
            onBack={() => setScreen('home')}
          />
        )}

        {screen === 'achievements' && (
          <AchievementsScreen
            saveData={saveData}
            onClaimAchievement={handleClaimAchievement}
            onBack={() => setScreen('home')}
          />
        )}

        {screen === 'stats' && (
          <StatsScreen
            saveData={saveData}
            onBack={() => setScreen('home')}
          />
        )}

        {/* The Playable Word Search Board View */}
        {screen === 'game' && board && (
          <div className="w-full max-w-4xl mx-auto px-4 py-2 flex flex-col items-center justify-between min-h-[calc(100vh-60px)] space-y-2">
            {/* Top Playfield HUD Bar */}
            <div className="w-full max-w-[560px] flex items-center justify-between px-2 pt-1 text-xs">
              {/* Mode Specific Status */}
              {currentMode === 'blitz' || currentMode === 'challenge' ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                    <Clock className="w-4 h-4 animate-pulse" />
                    <span className="font-mono text-sm tabular-nums">{formatTime(blitzRemainingSeconds)}</span>
                  </div>
                  {currentMode === 'blitz' && (
                    <div className="font-mono font-bold text-xs text-[#35D6B0]">
                      Score: {blitzScore} (x{blitzMultiplier})
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-300 font-mono text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#35D6B0]" />
                  <span className="tabular-nums font-semibold">{formatTime(elapsedSeconds)}</span>
                </div>
              )}

              {/* Bonus Words Counter Button & Pause Button */}
              <div className="flex items-center gap-2">
                {foundBonusWords.length > 0 && (
                  <button
                    onClick={() => {
                      audio.playClick();
                      setShowBonusModal(true);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#35D6B0]/15 border border-[#35D6B0]/30 text-[#35D6B0] text-xs font-bold hover:bg-[#35D6B0]/25 transition-colors cursor-pointer"
                  >
                    <Gem className="w-3 h-3" />
                    <span>{foundBonusWords.length} Bonus</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    audio.playClick();
                    setIsPaused(true);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Pause (Esc)"
                >
                  <Pause className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Boss Battle Header if Milestone Level */}
            {activeLevel.isBossLevel && (
              <BossBattleHeader
                title={activeLevel.title}
                totalWords={board.words.length}
                remainingWords={board.words.filter(w => !w.found).length}
                stage={bossStage}
                totalStages={activeLevel.bossStages || 1}
              />
            )}

            {/* Mystery Landmark View: dissolvable shroud reveals photographic landmark as words are solved */}
            {(currentMode === 'mystery' || currentMode === 'adventure') && (
              <MysteryLandmarkView
                asset={getLevelAsset(activeLevel.id)}
                words={board.words}
                destinationId={activeDestination.id}
                isComplete={levelWon}
                minimized={isLandmarkMinimized}
                onToggleMinimize={() => setIsLandmarkMinimized(prev => !prev)}
              />
            )}

            {/* Target Words To Find Bar */}
            <WordPillList
              words={board.words}
              theme={currentTheme}
              onSelectWordDefinition={w => setActiveVocabWord(w)}
              showVocabAction={currentMode === 'vocab'}
            />

            {/* Playable Grid */}
            <WordSearchBoard
              board={board}
              theme={currentTheme}
              tileStyle={preferences.tileStyle}
              letterSize={preferences.letterSize}
              highContrast={preferences.highContrast}
              selectionGlow={preferences.selectionGlow}
              activeHint={activeHint}
              onWordDiscovered={handleWordDiscovered}
              onInvalidSelection={() => {
                // Procedural feedback
              }}
            />

            {/* Power-Up & Hint Bar */}
            <PowerUpBar
              powerUps={saveData.powerUps}
              coins={saveData.stats.coins}
              theme={currentTheme}
              unfoundWords={board.words.filter(w => !w.found)}
              isTimeFrozen={isTimeFrozen}
              freezeSecondsRemaining={freezeSecondsRemaining}
              isDoubleCoinsActive={isDoubleCoinsActive}
              onUseLetterHint={handleUseLetterHint}
              onUseDirectionHint={handleUseDirectionHint}
              onUseWordHint={handleUseWordHint}
              onUseFreezeTime={handleUseFreezeTime}
              onUseShuffle={handleUseShuffle}
              onUseDoubleCoins={handleUseDoubleCoins}
              onOpenStore={() => setShowStore(true)}
            />
          </div>
        )}
      </main>

      {/* Pause Menu Modal */}
      {isPaused && (
        <PauseMenu
          onResume={() => setIsPaused(false)}
          onRestart={() => startPuzzle(activeLevel, currentMode)}
          onTutorial={() => setShowTutorial(true)}
          onSettings={() => setShowSettings(true)}
          onQuit={() => {
            audio.stopAmbientZen();
            setIsPaused(false);
            setScreen(currentMode === 'adventure' ? 'level-select' : 'home');
          }}
          isMuted={preferences.soundMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* Game Over / Countdown Expired Modal */}
      {isGameOver && (
        <GameOverModal
          mode={currentMode}
          levelTitle={activeLevel.title}
          wordsFound={board ? board.words.filter(w => w.found).length : 0}
          totalWords={board ? board.words.length : 0}
          score={currentMode === 'blitz' ? blitzScore : undefined}
          isNewBestScore={currentMode === 'blitz' && blitzScore > (saveData.stats.bestBlitzScore || 0)}
          onRetry={() => {
            setIsGameOver(false);
            startPuzzle(activeLevel, currentMode);
          }}
          onQuit={() => {
            audio.stopAmbientZen();
            setIsGameOver(false);
            setScreen(currentMode === 'adventure' ? 'level-select' : 'home');
          }}
        />
      )}

      {/* Level Victory Modal */}
      {levelWon && (
        <LevelCompleteModal
          levelTitle={activeLevel.title}
          timeSeconds={elapsedSeconds}
          score={lastCalculatedScore}
          stars={elapsedSeconds <= (activeLevel.targetTimeSeconds || 180) ? 3 : elapsedSeconds <= (activeLevel.targetTimeSeconds || 180) * 1.5 ? 2 : 1}
          coinsEarned={(() => {
            const existing = saveData.completedLevels[activeLevel.id];
            const isReplay = !!existing;
            const target = activeLevel.targetTimeSeconds || 180;
            let s = 1;
            if (elapsedSeconds <= target) s = 3;
            else if (elapsedSeconds <= target * 1.5) s = 2;
            const delta = existing ? Math.max(0, s - existing.stars) : s;
            const base = !isReplay ? s * 30 + (activeLevel.isBossLevel ? 150 : 60) : 15 + delta * 30;
            return isDoubleCoinsActive ? base * 2 : base;
          })()}
          xpEarned={(() => {
            const existing = saveData.completedLevels[activeLevel.id];
            const isReplay = !!existing;
            const target = activeLevel.targetTimeSeconds || 180;
            let s = 1;
            if (elapsedSeconds <= target) s = 3;
            else if (elapsedSeconds <= target * 1.5) s = 2;
            const delta = existing ? Math.max(0, s - existing.stars) : s;
            return !isReplay ? s * 100 + (activeLevel.isBossLevel ? 400 : 150) : 30 + delta * 50;
          })()}
          bonusWords={foundBonusWords}
          isLastLevelInDestination={activeDestination.levels[activeDestination.levels.length - 1].id === activeLevel.id}
          onNextLevel={startNextLevel}
          onReplay={() => startPuzzle(activeLevel, currentMode)}
          onWorldMap={() => {
            audio.stopAmbientZen();
            setScreen('world-map');
          }}
        />
      )}

      {/* Educational Vocabulary Modal */}
      {activeVocabWord && (
        <VocabularyModal
          word={activeVocabWord}
          isBookmarked={(saveData.savedVocabulary || []).includes(activeVocabWord.toUpperCase())}
          onToggleBookmark={(w) => {
            const upper = w.toUpperCase();
            setSaveData(prev => {
              const currentSaved = prev.savedVocabulary || [];
              const exists = currentSaved.includes(upper);
              const nextSaved = exists 
                ? currentSaved.filter(x => x !== upper) 
                : [...currentSaved, upper];
              const next = { ...prev, savedVocabulary: nextSaved };
              StorageManager.save(next);
              return next;
            });
          }}
          onClose={() => setActiveVocabWord(null)}
        />
      )}

      {/* Power-Up Armory Bazaar Modal */}
      {showStore && (
        <PowerUpStoreModal
          coins={saveData.stats.coins}
          powerUps={saveData.powerUps}
          onPurchase={handlePurchasePowerUp}
          onClose={() => setShowStore(false)}
        />
      )}

      {/* Daily & Weekly Missions Modal */}
      {showMissions && (
        <MissionsModal
          missions={saveData.missions}
          onClaim={handleClaimMission}
          onClose={() => setShowMissions(false)}
        />
      )}

      {/* Player Profile Modal */}
      {showProfile && (
        <ProfileModal
          saveData={saveData}
          onClose={() => setShowProfile(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          preferences={preferences}
          onUpdatePreferences={handleUpdatePreferences}
          onDataReset={handleDataReset}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* How to Play Tutorial Modal */}
      {showTutorial && (
        <TutorialModal onClose={() => setShowTutorial(false)} />
      )}

      {/* Practice Puzzle Interactive Sandbox Modal */}
      {showPractice && (
        <PracticePuzzleModal
          theme={currentTheme}
          onComplete={() => {
            setSaveData(prev => {
              const next = {
                ...prev,
                stats: {
                  ...prev.stats,
                  coins: prev.stats.coins + 50
                }
              };
              StorageManager.save(next);
              return next;
            });
            setShowPractice(false);
          }}
          onClose={() => setShowPractice(false)}
        />
      )}

      {/* Bonus Words Drawer Modal */}
      {showBonusModal && (
        <BonusWordsModal
          bonusWords={foundBonusWords}
          onClose={() => setShowBonusModal(false)}
        />
      )}

      {/* QA Engine Test Runner Modal */}
      {showTestRunner && (
        <TestRunnerModal onClose={() => setShowTestRunner(false)} />
      )}
    </div>
  );
}
