import React from 'react';
import { PowerUpInventory, ThemeConfig, PlacedWord } from '../types/game';
import { 
  Search, 
  Compass, 
  Sparkles, 
  Snowflake, 
  Shuffle, 
  CircleDollarSign, 
  Coins, 
  ShoppingBag 
} from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  powerUps: PowerUpInventory;
  coins: number;
  theme: ThemeConfig;
  unfoundWords: PlacedWord[];
  isTimeFrozen?: boolean;
  freezeSecondsRemaining?: number;
  isDoubleCoinsActive?: boolean;
  onUseLetterHint: () => void;
  onUseDirectionHint: () => void;
  onUseWordHint: () => void;
  onUseFreezeTime: () => void;
  onUseShuffle: () => void;
  onUseDoubleCoins: () => void;
  onOpenStore: () => void;
}

export const PowerUpBar: React.FC<Props> = ({
  powerUps,
  coins,
  theme,
  unfoundWords,
  isTimeFrozen = false,
  freezeSecondsRemaining = 0,
  isDoubleCoinsActive = false,
  onUseLetterHint,
  onUseDirectionHint,
  onUseWordHint,
  onUseFreezeTime,
  onUseShuffle,
  onUseDoubleCoins,
  onOpenStore
}) => {
  const hasUnfound = unfoundWords.length > 0;

  return (
    <div className="flex flex-col gap-2 max-w-[560px] mx-auto w-full px-2 pt-2">
      {/* Active freeze banner if active */}
      {isTimeFrozen && (
        <div className="py-1 px-3 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-1.5">
            <Snowflake className="w-3.5 h-3.5 animate-spin" />
            <span>Time Frozen!</span>
          </div>
          <span className="font-mono">{freezeSecondsRemaining}s left</span>
        </div>
      )}

      {/* Main Bar */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {/* Coin balance & Store trigger */}
        <button
          onClick={() => {
            audio.playClick();
            onOpenStore();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors shrink-0 cursor-pointer"
          title="Open Power-Up Store"
        >
          <Coins className="w-3.5 h-3.5 text-[#F5C66B]" />
          <span className="tabular-nums font-mono text-[#F5C66B] font-bold">{coins}</span>
          <ShoppingBag className="w-3 h-3 text-slate-400 ml-0.5" />
        </button>

        {/* Power-up action buttons cluster */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* 1. Letter Reveal (Hint) */}
          <button
            onClick={onUseLetterHint}
            disabled={!hasUnfound || (powerUps.letterReveals === 0 && coins < 25)}
            className="group relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#35D6B0]/40 disabled:opacity-40 transition-all text-xs font-medium cursor-pointer"
            title="Hint: Pulse first letter"
          >
            <Search className="w-3.5 h-3.5 text-[#35D6B0]" />
            <span className="text-[10px] font-mono px-1 rounded bg-[#35D6B0]/20 text-[#35D6B0]">
              {powerUps.letterReveals > 0 ? powerUps.letterReveals : '25g'}
            </span>
          </button>

          {/* 2. Compass */}
          <button
            onClick={onUseDirectionHint}
            disabled={!hasUnfound || (powerUps.directionArrows === 0 && coins < 50)}
            className="group relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#F5C66B]/40 disabled:opacity-40 transition-all text-xs font-medium cursor-pointer"
            title="Compass: Point path direction"
          >
            <Compass className="w-3.5 h-3.5 text-[#F5C66B]" />
            <span className="text-[10px] font-mono px-1 rounded bg-[#F5C66B]/20 text-[#F5C66B]">
              {powerUps.directionArrows > 0 ? powerUps.directionArrows : '50g'}
            </span>
          </button>

          {/* 3. Word Reveal */}
          <button
            onClick={onUseWordHint}
            disabled={!hasUnfound || (powerUps.wordReveals === 0 && coins < 100)}
            className="group relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#A99BFF]/40 disabled:opacity-40 transition-all text-xs font-medium cursor-pointer"
            title="Reveal: Auto-solve full word"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A99BFF]" />
            <span className="text-[10px] font-mono px-1 rounded bg-[#A99BFF]/20 text-[#A99BFF]">
              {powerUps.wordReveals > 0 ? powerUps.wordReveals : '100g'}
            </span>
          </button>

          {/* 4. Time Freeze */}
          <button
            onClick={onUseFreezeTime}
            disabled={isTimeFrozen || (powerUps.freezeTime === 0 && coins < 70)}
            className={`group relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl border transition-all text-xs font-medium cursor-pointer ${
              isTimeFrozen 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/40 disabled:opacity-40'
            }`}
            title="Freeze Time for 15s"
          >
            <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono px-1 rounded bg-cyan-400/20 text-cyan-300">
              {powerUps.freezeTime > 0 ? powerUps.freezeTime : '70g'}
            </span>
          </button>

          {/* 5. Grid Shuffle */}
          <button
            onClick={onUseShuffle}
            disabled={!hasUnfound || (powerUps.shuffle === 0 && coins < 60)}
            className="group relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-400/40 disabled:opacity-40 transition-all text-xs font-medium cursor-pointer"
            title="Shuffle: Rearrange unfound words"
          >
            <Shuffle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-mono px-1 rounded bg-emerald-400/20 text-emerald-300">
              {powerUps.shuffle > 0 ? powerUps.shuffle : '60g'}
            </span>
          </button>

          {/* 6. Double Coins */}
          <button
            onClick={onUseDoubleCoins}
            disabled={isDoubleCoinsActive || (powerUps.doubleCoins === 0 && coins < 100)}
            className={`group relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl border transition-all text-xs font-medium cursor-pointer ${
              isDoubleCoinsActive 
                ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-400/40 disabled:opacity-40'
            }`}
            title="Double level rewards (2x)"
          >
            <CircleDollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-mono px-1 rounded bg-amber-400/20 text-amber-300">
              {isDoubleCoinsActive ? '2X ON' : powerUps.doubleCoins > 0 ? powerUps.doubleCoins : '100g'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
