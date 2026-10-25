import React from 'react';
import { GameSaveData } from '../types/game';
import { StorageManager } from '../utils/storage';
import { ArrowLeft, BarChart3, Star, Clock, Trophy, Flame, Zap, Gem, CheckCircle } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  saveData: GameSaveData;
  onBack: () => void;
}

export const StatsScreen: React.FC<Props> = ({ saveData, onBack }) => {
  const { stats } = saveData;
  const levelInfo = StorageManager.getLevelForXp(stats.xp);

  // Calculate fastest time among completed levels
  const levelRecords = Object.values(saveData.completedLevels);
  const bestLevelTime = levelRecords.length > 0 
    ? Math.min(...levelRecords.map(l => l.bestTime))
    : 0;

  const formatSeconds = (sec: number) => {
    if (sec === 0) return 'None yet';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            audio.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="text-xs font-mono text-[#A99BFF]">
          Explorer Dossier
        </span>
      </div>

      <div className="text-left">
        <h2 className="text-3xl font-black font-['Outfit'] text-white">
          Player Statistics
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Comprehensive log of your linguistic discoveries, speed records, and adventure milestones.
        </p>
      </div>

      {/* Level & XP Hero Bar */}
      <div className="p-6 rounded-3xl bg-[#153C43] border border-white/10 text-left shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#35D6B0]">
              Odyssey Rank
            </div>
            <div className="text-2xl font-black font-['Outfit'] text-white">
              Level {levelInfo.level} Scholar
            </div>
          </div>

          <div className="text-xs font-mono text-slate-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            {levelInfo.currentXp} / {levelInfo.nextLevelXp} XP to Level {levelInfo.level + 1}
          </div>
        </div>

        {/* XP Bar */}
        <div className="w-full h-3 rounded-full bg-black/40 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#35D6B0] to-[#A99BFF] transition-all duration-500"
            style={{ width: `${Math.min(100, (levelInfo.currentXp / levelInfo.nextLevelXp) * 100)}%` }}
          />
        </div>
      </div>

      {/* Stats Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 text-left">
        {/* Total Words Found */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-xl bg-[#35D6B0]/20 flex items-center justify-center text-[#35D6B0] mb-2">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-400 font-medium">Words Discovered</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            {stats.totalWordsFound}
          </div>
        </div>

        {/* Stars Earned */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-xl bg-[#F5C66B]/20 flex items-center justify-center text-[#F5C66B] mb-2">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <div className="text-xs text-slate-400 font-medium">Stars Collected</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            {stats.starsEarned}
          </div>
        </div>

        {/* Levels Completed */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-xl bg-purple-400/20 flex items-center justify-center text-purple-400 mb-2">
            <Trophy className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-400 font-medium">Levels Conquered</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            {stats.levelsCompleted}
          </div>
        </div>

        {/* Fastest Solve */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-xl bg-emerald-400/20 flex items-center justify-center text-emerald-400 mb-2">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-400 font-medium">Fastest Solve</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            {formatSeconds(bestLevelTime)}
          </div>
        </div>

        {/* Daily Streak */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400 mb-2">
            <Flame className="w-4 h-4 fill-current" />
          </div>
          <div className="text-xs text-slate-400 font-medium">Current Streak</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            {stats.streakDays} Days
          </div>
        </div>

        {/* Bonus Words */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-xl bg-pink-400/20 flex items-center justify-center text-pink-400 mb-2">
            <Gem className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-400 font-medium">Bonus Words Found</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            {stats.bonusWordsDiscovered}
          </div>
        </div>

        {/* Hints Utilized */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-xl bg-sky-400/20 flex items-center justify-center text-sky-400 mb-2">
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-400 font-medium">Hints Used</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            {stats.hintsUsed}
          </div>
        </div>

        {/* Daily Challenges */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-xl bg-indigo-400/20 flex items-center justify-center text-indigo-400 mb-2">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-400 font-medium">Daily Challenges</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            {stats.dailyChallengesCompleted}
          </div>
        </div>
      </div>
    </div>
  );
};
