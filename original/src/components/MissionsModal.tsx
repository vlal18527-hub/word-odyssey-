import React from 'react';
import { Mission } from '../types/game';
import { X, Target, Gift, Check, Coins, Zap, Calendar } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  missions: Mission[];
  onClaim: (missionId: string, rewardCoins: number, rewardXp: number) => void;
  onClose: () => void;
}

export const MissionsModal: React.FC<Props> = ({ missions, onClaim, onClose }) => {
  const dailyMissions = missions.filter(m => !m.isWeekly);
  const weeklyMissions = missions.filter(m => m.isWeekly);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#153C43] border border-white/10 rounded-3xl p-6 text-left shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#35D6B0]/20 text-[#35D6B0] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black font-['Outfit'] text-white">
                Explorer Expeditions
              </h2>
              <p className="text-xs text-slate-300">
                Complete daily orders and weekly feats to claim gold and rank XP.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audio.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Missions Scroll Area */}
        <div className="mt-4 space-y-5 overflow-y-auto pr-1 flex-1">
          {/* Daily Section */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#35D6B0] mb-2.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Daily Tasks (Refreshes Daily)</span>
            </div>

            <div className="space-y-2.5">
              {dailyMissions.map(mission => {
                const isComplete = mission.currentProgress >= mission.maxProgress;

                return (
                  <div
                    key={mission.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      mission.claimed
                        ? 'bg-emerald-950/20 border-emerald-500/25 opacity-70'
                        : isComplete
                        ? 'bg-[#35D6B0]/10 border-[#35D6B0] shadow-[0_0_15px_rgba(53,214,176,0.2)]'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-white font-['Outfit']">
                          {mission.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] font-mono">
                          <span className="text-[#F5C66B]">+{mission.rewardCoins}g</span>
                          <span className="text-slate-500">·</span>
                          <span className="text-[#35D6B0]">+{mission.rewardXp} XP</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 mb-2">
                        {mission.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#35D6B0] to-[#F5C66B] transition-all"
                          style={{ width: `${Math.min(100, (mission.currentProgress / mission.maxProgress) * 100)}%` }}
                        />
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-1">
                        {mission.currentProgress} / {mission.maxProgress}
                      </div>
                    </div>

                    {/* Claim Button */}
                    {isComplete && !mission.claimed && (
                      <button
                        onClick={() => {
                          audio.playBonusWord();
                          onClaim(mission.id, mission.rewardCoins, mission.rewardXp);
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5C66B] to-[#D97706] text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Claim Reward</span>
                      </button>
                    )}

                    {mission.claimed && (
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 shrink-0">
                        <Check className="w-4 h-4" />
                        <span>Claimed</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Section */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A99BFF] mb-2.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Weekly Grand Feat</span>
            </div>

            <div className="space-y-2.5">
              {weeklyMissions.map(mission => {
                const isComplete = mission.currentProgress >= mission.maxProgress;

                return (
                  <div
                    key={mission.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      mission.claimed
                        ? 'bg-emerald-950/20 border-emerald-500/25 opacity-70'
                        : isComplete
                        ? 'bg-[#A99BFF]/15 border-[#A99BFF] shadow-[0_0_15px_rgba(169,155,255,0.2)]'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-white font-['Outfit']">
                          {mission.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] font-mono">
                          <span className="text-[#F5C66B]">+{mission.rewardCoins}g</span>
                          <span className="text-slate-500">·</span>
                          <span className="text-[#35D6B0]">+{mission.rewardXp} XP</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 mb-2">
                        {mission.description}
                      </p>

                      <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#A99BFF] to-[#35D6B0] transition-all"
                          style={{ width: `${Math.min(100, (mission.currentProgress / mission.maxProgress) * 100)}%` }}
                        />
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-1">
                        {mission.currentProgress} / {mission.maxProgress}
                      </div>
                    </div>

                    {isComplete && !mission.claimed && (
                      <button
                        onClick={() => {
                          audio.playBonusWord();
                          onClaim(mission.id, mission.rewardCoins, mission.rewardXp);
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5C66B] to-[#D97706] text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Claim Reward</span>
                      </button>
                    )}

                    {mission.claimed && (
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 shrink-0">
                        <Check className="w-4 h-4" />
                        <span>Claimed</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
