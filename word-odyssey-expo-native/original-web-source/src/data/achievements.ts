import { Achievement } from '../types/game';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-discovery',
    title: 'First Discovery',
    description: 'Find your very first hidden word.',
    icon: 'Compass',
    rewardCoins: 50,
    rewardXp: 100,
    maxProgress: 1,
    currentProgress: 0,
    unlocked: false
  },
  {
    id: 'globe-trotter',
    title: 'Globe Trotter',
    description: 'Complete 5 adventure levels.',
    icon: 'MapPin',
    rewardCoins: 100,
    rewardXp: 200,
    maxProgress: 5,
    currentProgress: 0,
    unlocked: false
  },
  {
    id: 'eagle-eye',
    title: 'Eagle Eye',
    description: 'Find 50 words across any game mode.',
    icon: 'Eye',
    rewardCoins: 150,
    rewardXp: 300,
    maxProgress: 50,
    currentProgress: 0,
    unlocked: false
  },
  {
    id: 'treasure-seeker',
    title: 'Treasure Seeker',
    description: 'Discover 10 hidden bonus words.',
    icon: 'Gem',
    rewardCoins: 200,
    rewardXp: 400,
    maxProgress: 10,
    currentProgress: 0,
    unlocked: false
  },
  {
    id: 'daily-devotee',
    title: 'Daily Devotee',
    description: 'Complete 3 daily challenge puzzles.',
    icon: 'Calendar',
    rewardCoins: 250,
    rewardXp: 500,
    maxProgress: 3,
    currentProgress: 0,
    unlocked: false
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Finish any puzzle in under 60 seconds.',
    icon: 'Zap',
    rewardCoins: 150,
    rewardXp: 250,
    maxProgress: 1,
    currentProgress: 0,
    unlocked: false
  },
  {
    id: 'lexicon-master',
    title: 'Lexicon Master',
    description: 'Find 150 total words in Word Odyssey.',
    icon: 'BookOpen',
    rewardCoins: 300,
    rewardXp: 600,
    maxProgress: 150,
    currentProgress: 0,
    unlocked: false
  },
  {
    id: 'cartographer',
    title: 'Master Cartographer',
    description: 'Unlock 4 regional destinations on the world map.',
    icon: 'Globe',
    rewardCoins: 400,
    rewardXp: 800,
    maxProgress: 4,
    currentProgress: 1, // India unlocked initially
    unlocked: false
  },
  {
    id: 'star-collector',
    title: 'Constellation of Stars',
    description: 'Earn 30 total stars in Adventure Mode.',
    icon: 'Star',
    rewardCoins: 350,
    rewardXp: 700,
    maxProgress: 30,
    currentProgress: 0,
    unlocked: false
  }
];
