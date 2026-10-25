import React from 'react';
import { Destination, LevelConfig, GameSaveData } from '../types/game';
import { ImageWithFallback } from './ImageWithFallback';
import { generateProceduralLevel } from '../data/destinations';
import { getLevelAsset } from '../data/levelAssets';
import { ArrowLeft, Star, Play, Lock, Skull, Flame, Infinity, AlertCircle } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  destination: Destination;
  saveData: GameSaveData;
  onSelectLevel: (level: LevelConfig) => void;
  onBack: () => void;
}

export const LevelSelect: React.FC<Props> = ({ destination, saveData, onSelectLevel, onBack }) => {
  const isCosmicWorld = destination.id === 'cosmic';
  const hasFinished100 = !!saveData.completedLevels['co-100'];
  const starsEarned = saveData.stats.starsEarned || 0;
  const isWorldUnlocked = destination.unlockedByDefault || starsEarned >= destination.requiredStars;
  const starsNeeded = Math.max(0, destination.requiredStars - starsEarned);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Back button and Destination header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            audio.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>World Map</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">
            {destination.region}
          </span>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[#F5C66B] text-xs font-mono font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{starsEarned} Stars</span>
          </div>
        </div>
      </div>

      {/* Hero Banner with Real High-Resolution Destination Photography */}
      <div className="relative rounded-3xl overflow-hidden bg-[#153C43] border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-20 max-w-lg text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#35D6B0]">
            Destination Expedition
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-['Outfit'] text-white mt-1">
            {destination.name}
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            {destination.description}
          </p>
        </div>

        <div className="relative w-full md:w-72 h-44 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <ImageWithFallback
            src={destination.imageUrl}
            alt={destination.imageAlt}
            fallbackDestinationId={destination.id}
          />
        </div>
      </div>

      {/* World Lock Alert Banner if player does not meet required stars */}
      {!isWorldUnlocked && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-['Outfit'] flex items-center gap-2">
                <span>Destination Locked</span>
                <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                  Requires {destination.requiredStars} Stars
                </span>
              </div>
              <div className="text-xs text-rose-200/80 mt-0.5">
                You have {starsEarned} stars. Collect {starsNeeded} more stars in previous worlds to unlock {destination.name}.
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              audio.playClick();
              onBack();
            }}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer shrink-0"
          >
            Return to World Map
          </button>
        </div>
      )}

      {/* Infinite Level Generator Banner (if final world or level 100 finished) */}
      {isCosmicWorld && hasFinished100 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-slate-900 border border-purple-500/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Infinity className="w-6 h-6 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white font-['Outfit']">Infinite Procedural Odyssey</div>
              <div className="text-xs text-slate-300">You conquered 100 levels! Procedural chamber levels 101+ are unlocked.</div>
            </div>
          </div>

          <button
            onClick={() => {
              audio.playClick();
              // Compute next procedural level
              const highestLevel = Math.max(100, ...Object.keys(saveData.completedLevels).map(k => {
                const match = k.match(/proc-(\d+)/);
                return match ? parseInt(match[1], 10) : 100;
              }));
              const procLevel = generateProceduralLevel(highestLevel + 1);
              onSelectLevel(procLevel);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg hover:brightness-110 active:scale-95 cursor-pointer shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Level 101+</span>
          </button>
        </div>
      )}

      {/* Levels Path Grid (10 levels) */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left">
            Expedition Levels (10 Stages)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {destination.levels.filter(l => saveData.completedLevels[l.id]).length} / {destination.levels.length} Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {destination.levels.map((level, idx) => {
            const completedInfo = saveData.completedLevels[level.id];
            const isCompleted = !!completedInfo;
            const prevLevel = idx > 0 ? destination.levels[idx - 1] : null;
            const isUnlocked = isWorldUnlocked && (idx === 0 || (prevLevel && !!saveData.completedLevels[prevLevel.id]));
            const isBoss = level.isBossLevel;
            const asset = getLevelAsset(level.id);

            return (
              <div
                key={level.id}
                onClick={() => {
                  if (isUnlocked) {
                    audio.playClick();
                    onSelectLevel(level);
                  } else {
                    audio.playInvalid();
                  }
                }}
                className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between overflow-hidden relative ${
                  isBoss
                    ? isUnlocked
                      ? 'bg-gradient-to-br from-red-950/40 to-[#153C43] border-red-500/50 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] cursor-pointer group'
                      : 'bg-black/30 border-red-950/30 opacity-40 cursor-not-allowed'
                    : isUnlocked
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-[#35D6B0]/50 hover:shadow-lg cursor-pointer group'
                    : 'bg-black/30 border-white/5 opacity-40 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="flex items-start gap-3 mb-2.5">
                    {/* Level Photography Thumbnail */}
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black/40">
                      <img
                        src={asset.thumbnailUrl}
                        alt={asset.imageAlt}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${!isUnlocked ? 'grayscale' : ''}`}
                        onError={(e) => {
                          // Fallback to placeholder if offline or blocked
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      {isBoss && (
                        <div className="absolute inset-0 bg-red-950/40 flex items-center justify-center">
                          <Skull className="w-5 h-5 text-red-400 drop-shadow" />
                        </div>
                      )}
                    </div>

                    {/* Level meta and title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-[11px] font-bold font-mono ${isBoss ? 'text-red-400 flex items-center gap-1' : 'text-[#35D6B0]'}`}>
                          <span>Level {level.levelNumber}</span>
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                          {level.gridSize}×{level.gridSize}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#35D6B0] transition-colors font-['Outfit'] truncate">
                        {level.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {asset.caption || level.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2.5 border-t border-white/10 flex items-center justify-between">
                  {/* Stars rating */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map(s => {
                      const earned = completedInfo && s <= completedInfo.stars;
                      return (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            earned
                              ? 'text-[#F5C66B] fill-current'
                              : 'text-slate-600 fill-none stroke-current'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Play Action / Lock status */}
                  {isUnlocked ? (
                    <div className={`flex items-center gap-1 text-xs font-semibold ${isBoss ? 'text-red-400' : 'text-[#35D6B0]'}`}>
                      {isCompleted ? (
                        <span className="text-slate-400 font-mono text-[11px]">
                          {Math.floor(completedInfo.bestTime / 60)}:{(completedInfo.bestTime % 60).toString().padStart(2, '0')}
                        </span>
                      ) : (
                        <span>{isBoss ? 'Battle Boss' : 'Play'}</span>
                      )}
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
