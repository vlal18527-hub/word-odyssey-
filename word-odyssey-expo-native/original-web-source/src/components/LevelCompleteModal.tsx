import React, { useEffect } from 'react';
import { Star, Coins, Zap, Trophy, RotateCcw, ArrowRight, Map } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

interface Props {
  levelTitle: string;
  timeSeconds: number;
  score?: number;
  stars: number;
  coinsEarned: number;
  xpEarned: number;
  bonusWords: string[];
  isLastLevelInDestination: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  onWorldMap: () => void;
}

export const LevelCompleteModal: React.FC<Props> = ({
  levelTitle,
  timeSeconds,
  score,
  stars,
  coinsEarned,
  xpEarned,
  bonusWords,
  isLastLevelInDestination,
  onNextLevel,
  onReplay,
  onWorldMap
}) => {
  useEffect(() => {
    // Play celebratory victory fanfare
    audio.playVictory();

    // Trigger dual-cannon confetti
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.65 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    } catch {
      // safe fallback
    }
  }, []);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#153C43] border border-[#35D6B0]/30 rounded-3xl p-6 text-center shadow-2xl overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#35D6B0]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Trophy emblem */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5C66B] to-[#D97706] p-0.5 shadow-lg flex items-center justify-center mb-4">
          <div className="w-full h-full bg-[#153C43] rounded-[14px] flex items-center justify-center">
            <Trophy className="w-8 h-8 text-[#F5C66B]" />
          </div>
        </div>

        <h2 className="text-2xl font-black font-['Outfit'] text-white tracking-wide mb-1">
          Puzzle Completed!
        </h2>
        <p className="text-xs text-slate-300 font-medium mb-5">{levelTitle}</p>

        {/* Stars Display */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {[1, 2, 3].map(s => {
            const earned = s <= stars;
            return (
              <div
                key={s}
                className={`transition-all duration-300 ${
                  earned ? 'scale-110 text-[#F5C66B] drop-shadow-[0_0_12px_rgba(245,198,107,0.6)]' : 'text-slate-600'
                }`}
              >
                <Star className={`w-9 h-9 ${earned ? 'fill-current' : 'fill-none stroke-current'}`} />
              </div>
            );
          })}
        </div>

        {/* Rewards grid */}
        <div className="grid grid-cols-4 gap-1.5 p-3 rounded-2xl bg-[#101827]/70 border border-white/10 mb-6">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-medium">Score</span>
            <span className="text-sm font-mono font-bold text-[#F5C66B] mt-0.5">{score || 850}</span>
          </div>

          <div className="flex flex-col items-center border-l border-white/10">
            <span className="text-[10px] text-slate-400 font-medium">Time</span>
            <span className="text-sm font-mono font-bold text-white mt-0.5">{formatTime(timeSeconds)}</span>
          </div>

          <div className="flex flex-col items-center border-l border-white/10">
            <span className="text-[10px] text-slate-400 font-medium">Coins</span>
            <div className="flex items-center gap-0.5 mt-0.5">
              <Coins className="w-3 h-3 text-[#F5C66B]" />
              <span className="text-sm font-mono font-bold text-[#F5C66B]">+{coinsEarned}</span>
            </div>
          </div>

          <div className="flex flex-col items-center border-l border-white/10">
            <span className="text-[10px] text-slate-400 font-medium">EXP</span>
            <div className="flex items-center gap-0.5 mt-0.5">
              <Zap className="w-3 h-3 text-[#35D6B0]" />
              <span className="text-sm font-mono font-bold text-[#35D6B0]">+{xpEarned}</span>
            </div>
          </div>
        </div>

        {/* Bonus words if any */}
        {bonusWords.length > 0 && (
          <div className="mb-5 text-left p-3 rounded-xl bg-[#35D6B0]/10 border border-[#35D6B0]/20 text-xs">
            <div className="font-semibold text-[#35D6B0] mb-1 flex items-center justify-between">
              <span>Hidden Bonus Words Found!</span>
              <span className="font-mono text-[10px]">+{bonusWords.length * 10} Extra Coins</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {bonusWords.map(w => (
                <span key={w} className="px-1.5 py-0.5 rounded bg-black/40 text-slate-200 text-[11px] font-mono">
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              audio.playClick();
              onNextLevel();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#35D6B0] to-[#20BA95] text-slate-950 font-black tracking-wide flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg cursor-pointer"
          >
            <span>{isLastLevelInDestination ? 'Explore World Map' : 'Next Level'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => {
                audio.playClick();
                onReplay();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Replay</span>
            </button>

            <button
              onClick={() => {
                audio.playClick();
                onWorldMap();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Map className="w-3.5 h-3.5 text-slate-400" />
              <span>World Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
