import React from 'react';
import { PlacedWord } from '../types/game';
import { LevelAsset } from '../data/levelAssets';
import { ImageWithFallback } from './ImageWithFallback';
import { Eye, Sparkles, MapPin, Award } from 'lucide-react';

interface Props {
  asset: LevelAsset;
  words: PlacedWord[];
  destinationId: string;
  isComplete: boolean;
  minimized?: boolean;
  onToggleMinimize?: () => void;
}

export const MysteryLandmarkView: React.FC<Props> = ({
  asset,
  words,
  destinationId,
  isComplete,
  minimized = false,
  onToggleMinimize
}) => {
  const totalWords = words.length;
  const foundWords = words.filter(w => w.found).length;
  const tilesCount = 9; // 3x3 grid of mystery shroud tiles
  
  // Calculate how many tiles are revealed proportional to found words
  const revealedTilesCount = isComplete 
    ? tilesCount 
    : Math.floor((foundWords / Math.max(1, totalWords)) * tilesCount);

  return (
    <div className="w-full max-w-[560px] mx-auto px-2 mb-3">
      <div className="relative rounded-2xl overflow-hidden border border-[#F5C66B]/30 bg-black/40 shadow-xl transition-all">
        {/* Header bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-black/60 border-b border-white/10 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#F5C66B] font-['Outfit']">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase text-[11px] tracking-wider">Mystery Landmark Reveal</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-300">
              {isComplete ? 'Fully Revealed!' : `${foundWords}/${totalWords} Clues Found`}
            </span>
            {onToggleMinimize && (
              <button
                onClick={onToggleMinimize}
                className="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-white/5 cursor-pointer"
              >
                {minimized ? 'Expand' : 'Collapse'}
              </button>
            )}
          </div>
        </div>

        {!minimized && (
          <div className="relative h-44 sm:h-52 w-full overflow-hidden">
            {/* The Hidden Real Landmark Photo */}
            <ImageWithFallback
              src={asset.imageUrl}
              alt={asset.imageAlt}
              fallbackDestinationId={destinationId}
              overlayGradient={false}
              className="w-full h-full object-cover"
              priority={true}
            />

            {/* 3x3 Shroud Grid covering the photograph */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 p-0.5 pointer-events-none">
              {Array.from({ length: tilesCount }, (_, i) => {
                const isRevealed = i < revealedTilesCount || isComplete;

                return (
                  <div
                    key={i}
                    className={`relative w-full h-full transition-all duration-700 ${
                      isRevealed
                        ? 'opacity-0 scale-95 pointer-events-none'
                        : 'opacity-100 bg-gradient-to-br from-[#1A2E35] to-[#101827] border border-[#35D6B0]/20 flex items-center justify-center'
                    }`}
                  >
                    {!isRevealed && (
                      <div className="text-[10px] font-mono font-bold text-[#F5C66B]/40 select-none">
                        ?
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Completion Banner */}
            {isComplete && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-6 z-20 flex items-end justify-between animate-in fade-in duration-300">
                <div>
                  <div className="flex items-center gap-1 text-[10px] font-mono uppercase text-[#35D6B0] font-bold">
                    <MapPin className="w-3 h-3" />
                    <span>Landmark Discovered</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-['Outfit'] truncate max-w-xs">
                    {asset.caption.replace(/BOSS ARENA: /g, '')}
                  </h4>
                  <p className="text-[10px] text-slate-300 line-clamp-1">
                    {asset.imageAlt}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono text-[#F5C66B] bg-black/60 px-2 py-1 rounded-md border border-[#F5C66B]/40 shrink-0">
                  <Award className="w-3 h-3" />
                  <span>Passport Stamp Earned</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
