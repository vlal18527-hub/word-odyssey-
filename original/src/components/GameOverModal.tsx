import React from 'react';
import { RotateCcw, ArrowLeft, Clock, AlertTriangle, Trophy } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  mode: string;
  levelTitle: string;
  wordsFound: number;
  totalWords: number;
  score?: number;
  isNewBestScore?: boolean;
  onRetry: () => void;
  onQuit: () => void;
}

export const GameOverModal: React.FC<Props> = ({
  mode,
  levelTitle,
  wordsFound,
  totalWords,
  score,
  isNewBestScore,
  onRetry,
  onQuit
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#1E1424] border border-rose-500/30 rounded-3xl p-6 text-center shadow-2xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Hourglass Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 p-0.5 shadow-lg flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-rose-400 animate-pulse" />
        </div>

        <h2 className="text-2xl font-black font-['Outfit'] text-white tracking-wide mb-1">
          Time's Up!
        </h2>
        <p className="text-xs text-rose-300 font-medium mb-5">
          {mode.toUpperCase()} MODE · {levelTitle}
        </p>

        {/* Stats Summary */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Words Discovered</span>
            <span className="font-mono font-bold text-white">{wordsFound} / {totalWords}</span>
          </div>

          {score !== undefined && (
            <div className="flex items-center justify-between text-xs border-t border-white/10 pt-2 text-slate-300">
              <span>Final Blitz Score</span>
              <div className="flex items-center gap-1.5 font-mono font-bold text-amber-400">
                {isNewBestScore && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{score} pts</span>
              </div>
            </div>
          )}

          {isNewBestScore && (
            <div className="text-[11px] font-bold text-amber-300 bg-amber-500/10 py-1 px-2 rounded-lg border border-amber-500/20">
              New Personal Best Blitz Score!
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          The countdown expired before all target words could be located. Stars and completion rewards are only awarded on victory.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              audio.playClick();
              onRetry();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-black text-xs tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>RETRY PUZZLE</span>
          </button>

          <button
            onClick={() => {
              audio.playClick();
              onQuit();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
