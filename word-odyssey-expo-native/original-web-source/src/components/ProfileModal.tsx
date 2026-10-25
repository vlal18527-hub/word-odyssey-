import React from 'react';
import { GameSaveData } from '../types/game';
import { StorageManager } from '../utils/storage';
import { 
  X, 
  Award, 
  Flame, 
  Trophy, 
  Clock, 
  Star, 
  CheckCircle, 
  Gem, 
  ShieldCheck, 
  Zap, 
  Coins 
} from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  saveData: GameSaveData;
  onClose: () => void;
}

export const ProfileModal: React.FC<Props> = ({ saveData, onClose }) => {
  const { stats } = saveData;
  const levelInfo = StorageManager.getLevelForXp(stats.xp);
  const totalLevelsTarget = 100;
  const completionPercent = Math.min(100, Math.round((stats.levelsCompleted / totalLevelsTarget) * 100));

  const formatPlaytime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#153C43] border border-white/10 rounded-3xl p-6 text-left shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            audio.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Profile Identity Hero */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#35D6B0] to-[#A99BFF] p-0.5 shadow-xl flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#101827] rounded-[14px] flex items-center justify-center text-white">
              <Award className="w-8 h-8 text-[#35D6B0]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black font-['Outfit'] text-white">
                Explorer Dossier
              </h2>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#35D6B0]/20 text-[#35D6B0]">
                Lv {levelInfo.level}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Grand Cartographer · World Odyssey Pro
            </p>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="p-4 rounded-2xl bg-[#101827]/70 border border-white/10 mb-6">
          <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1.5">
            <span>Experience to Level {levelInfo.level + 1}</span>
            <span className="font-mono text-[#35D6B0]">{levelInfo.currentXp} / {levelInfo.nextLevelXp} XP</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#35D6B0] to-[#A99BFF] transition-all duration-500"
              style={{ width: `${Math.min(100, (levelInfo.currentXp / levelInfo.nextLevelXp) * 100)}%` }}
            />
          </div>
        </div>

        {/* Key Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-[#35D6B0]" />
              <span>Words Discovered</span>
            </div>
            <div className="text-xl font-bold font-mono text-white">
              {stats.totalWordsFound}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Star className="w-3.5 h-3.5 text-[#F5C66B] fill-current" />
              <span>Stars Earned</span>
            </div>
            <div className="text-xl font-bold font-mono text-[#F5C66B]">
              {stats.starsEarned}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-current" />
              <span>Longest Streak</span>
            </div>
            <div className="text-xl font-bold font-mono text-amber-400">
              {stats.longestStreak || stats.streakDays} Days
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Trophy className="w-3.5 h-3.5 text-purple-400" />
              <span>World Progress</span>
            </div>
            <div className="text-xl font-bold font-mono text-white">
              {completionPercent}%
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bosses Defeated</span>
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400">
              {stats.bossesDefeated || 0}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Total Playtime</span>
            </div>
            <div className="text-xl font-bold font-mono text-white">
              {formatPlaytime(stats.totalTimePlayedSeconds || 360)}
            </div>
          </div>
        </div>

        {/* Insignia Badges Showcase */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#A99BFF] mb-3">
            Insignia Milestones
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { label: 'Pioneer', desc: '10 Levels', unlocked: stats.levelsCompleted >= 10 },
              { label: 'Voyager', desc: '30 Levels', unlocked: stats.levelsCompleted >= 30 },
              { label: 'Centurion', desc: '100 Levels', unlocked: stats.levelsCompleted >= 100 },
              { label: 'Polyglot', desc: '100 Words', unlocked: stats.totalWordsFound >= 100 },
            ].map((badge, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  badge.unlocked
                    ? 'bg-[#35D6B0]/15 border-[#35D6B0]/50 text-white'
                    : 'bg-white/5 border-white/10 opacity-40 text-slate-400'
                }`}
              >
                <div className="text-xs font-bold font-['Outfit']">{badge.label}</div>
                <div className="text-[10px] text-slate-300 mt-0.5">{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
