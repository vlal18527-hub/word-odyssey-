import React from 'react';
import { Skull, ShieldAlert, Sparkles, Flame } from 'lucide-react';

interface Props {
  title: string;
  totalWords: number;
  remainingWords: number;
  stage?: number;
  totalStages?: number;
}

export const BossBattleHeader: React.FC<Props> = ({
  title,
  totalWords,
  remainingWords,
  stage = 1,
  totalStages = 1
}) => {
  const foundWords = totalWords - remainingWords;
  const healthPercent = Math.max(0, Math.round((remainingWords / totalWords) * 100));

  return (
    <div className="w-full max-w-[560px] mx-auto px-2 pt-1 animate-in fade-in">
      <div className="relative overflow-hidden p-3 rounded-2xl bg-gradient-to-r from-red-950/70 via-purple-950/70 to-slate-900 border border-red-500/40 shadow-xl">
        {/* Glow backdrop */}
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-red-500/20 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Skull className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-red-400 flex items-center gap-1.5">
                <Flame className="w-3 h-3 fill-current" />
                <span>BOSS ENCOUNTER</span>
                {totalStages > 1 && (
                  <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-mono text-[9px] border border-red-500/30">
                    STAGE {stage} OF {totalStages}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-black font-['Outfit'] text-white tracking-wide">
                {title.replace('BOSS: ', '')}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-mono font-bold text-red-300">
              {remainingWords} / {totalWords} Words Left
            </div>
            {totalStages > 1 && (
              <div className="text-[10px] text-amber-300/90 font-mono">
                {stage === 1 ? 'Phase 1: Outer Shields' : stage === 2 ? 'Phase 2: Core Defense' : 'Phase 3: Final Stand'}
              </div>
            )}
          </div>
        </div>

        {/* Boss Health Bar */}
        <div className="w-full h-2.5 rounded-full bg-black/60 border border-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 transition-all duration-300"
            style={{ width: `${healthPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
