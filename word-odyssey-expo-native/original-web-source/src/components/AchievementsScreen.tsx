import React from 'react';
import { GameSaveData } from '../types/game';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { ArrowLeft, Trophy, Coins, Zap, Check, Gift } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  saveData: GameSaveData;
  onClaimAchievement: (id: string, coins: number, xp: number) => void;
  onBack: () => void;
}

export const AchievementsScreen: React.FC<Props> = ({ saveData, onClaimAchievement, onBack }) => {
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

        <span className="text-xs font-mono text-[#F5C66B]">
          Hall of Achievements
        </span>
      </div>

      <div className="text-left">
        <h2 className="text-3xl font-black font-['Outfit'] text-white">
          Explorer Trophies
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Complete milestones to earn coins and experience to advance your explorer rank.
        </p>
      </div>

      {/* Achievements List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {INITIAL_ACHIEVEMENTS.map(ach => {
          // Derive current progress from live save stats
          let currentVal = 0;
          if (ach.id === 'first-discovery') currentVal = saveData.stats.totalWordsFound > 0 ? 1 : 0;
          else if (ach.id === 'globe-trotter') currentVal = saveData.stats.levelsCompleted;
          else if (ach.id === 'eagle-eye') currentVal = saveData.stats.totalWordsFound;
          else if (ach.id === 'treasure-seeker') currentVal = saveData.stats.bonusWordsDiscovered;
          else if (ach.id === 'daily-devotee') currentVal = saveData.stats.dailyChallengesCompleted;
          else if (ach.id === 'speed-demon') currentVal = Object.values(saveData.completedLevels).some(l => l.bestTime < 60) ? 1 : 0;
          else if (ach.id === 'lexicon-master') currentVal = saveData.stats.totalWordsFound;
          else if (ach.id === 'cartographer') currentVal = saveData.unlockedDestinations.length;
          else if (ach.id === 'star-collector') currentVal = saveData.stats.starsEarned;

          const isComplete = currentVal >= ach.maxProgress;
          const isClaimed = !!saveData.achievements[ach.id]?.unlocked;

          return (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                isClaimed
                  ? 'bg-white/5 border-emerald-500/30'
                  : isComplete
                  ? 'bg-[#153C43] border-[#F5C66B] shadow-[0_0_15px_rgba(245,198,107,0.2)]'
                  : 'bg-white/5 border-white/10 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isClaimed
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isComplete
                          ? 'bg-[#F5C66B]/20 text-[#F5C66B]'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-['Outfit']">
                        {ach.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] font-mono mt-0.5">
                        <span className="text-[#F5C66B]">+{ach.rewardCoins} Coins</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-[#35D6B0]">+{ach.rewardXp} XP</span>
                      </div>
                    </div>
                  </div>

                  {isClaimed && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-normal mt-2">
                  {ach.description}
                </p>
              </div>

              {/* Progress and Claim */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>Progress</span>
                  <span>{Math.min(currentVal, ach.maxProgress)} / {ach.maxProgress}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-[#35D6B0] to-[#F5C66B] transition-all duration-300"
                    style={{ width: `${Math.min(100, (currentVal / ach.maxProgress) * 100)}%` }}
                  />
                </div>

                {isComplete && !isClaimed && (
                  <button
                    onClick={() => {
                      audio.playBonusWord();
                      onClaimAchievement(ach.id, ach.rewardCoins, ach.rewardXp);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#F5C66B] to-[#D97706] text-black font-black text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-md"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>CLAIM REWARD</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
