import React from 'react';
import { Destination, GameSaveData } from '../types/game';
import { DESTINATIONS } from '../data/destinations';
import { ImageWithFallback } from './ImageWithFallback';
import { Lock, Star, ChevronRight, ArrowLeft, Trophy } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  saveData: GameSaveData;
  onSelectDestination: (dest: Destination) => void;
  onBack: () => void;
}

export const WorldMap: React.FC<Props> = ({ saveData, onSelectDestination, onBack }) => {
  const currentStars = saveData.stats.starsEarned;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
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
          <span>Home</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5C66B]/15 border border-[#F5C66B]/30 text-xs font-bold text-[#F5C66B]">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-mono">{currentStars} Stars Collected</span>
          </div>
        </div>
      </div>

      <div className="text-left">
        <h2 className="text-3xl font-black font-['Outfit'] text-white tracking-wide">
          World Expeditions (10 Regions · 100 Levels)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Explore iconic cultures and natural wonders. Collect stars to unlock distant lands and face regional boss guardians.
        </p>
      </div>

      {/* Destinations Grid (10 Worlds) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DESTINATIONS.map((dest, idx) => {
          const isUnlocked = dest.unlockedByDefault || currentStars >= dest.requiredStars;
          const starsNeeded = Math.max(0, dest.requiredStars - currentStars);

          // Calculate completed levels for this destination
          const completedCount = dest.levels.filter(lvl => saveData.completedLevels[lvl.id]).length;
          const totalLevels = dest.levels.length;
          const isFullyCompleted = completedCount === totalLevels;

          return (
            <div
              key={dest.id}
              onClick={() => {
                if (isUnlocked) {
                  audio.playClick();
                  onSelectDestination(dest);
                } else {
                  audio.playInvalid();
                }
              }}
              className={`relative rounded-3xl overflow-hidden border transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-[#153C43] border-white/10 hover:border-[#35D6B0] hover:shadow-[0_0_20px_rgba(53,214,176,0.25)] cursor-pointer group'
                  : 'bg-black/40 border-white/5 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Real Destination Photography Card with Resilient Fallback */}
              <div className="relative w-full h-40 overflow-hidden">
                <ImageWithFallback
                  src={dest.imageUrl}
                  alt={dest.imageAlt}
                  fallbackDestinationId={dest.id}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Locked Overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 text-center z-20">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-slate-300 mb-1.5">
                      <Lock className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-xs font-bold text-white">Locked Frontier</span>
                    <span className="text-[11px] text-amber-400 font-mono mt-0.5">
                      Need {starsNeeded} more ★
                    </span>
                  </div>
                )}

                {/* Completed Badge */}
                {isFullyCompleted && (
                  <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-[#F5C66B] to-[#D97706] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md z-20 flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    <span>Mastered</span>
                  </div>
                )}
              </div>

              {/* Destination info */}
              <div className="p-4 text-left flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#35D6B0]">
                      World 0{idx + 1} · {dest.region}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Levels {(idx * 10) + 1}–{(idx + 1) * 10}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#35D6B0] transition-colors font-['Outfit'] mt-1">
                    {dest.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                    {dest.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">
                    {completedCount} / {totalLevels} Levels
                  </span>
                  {isUnlocked && (
                    <div className="flex items-center text-[#35D6B0] font-semibold text-[11px] group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
