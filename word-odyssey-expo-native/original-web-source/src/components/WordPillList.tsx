import React from 'react';
import { PlacedWord, ThemeConfig } from '../types/game';
import { Check, BookOpen } from 'lucide-react';

interface Props {
  words: PlacedWord[];
  theme: ThemeConfig;
  onSelectWordDefinition?: (word: string) => void;
  showVocabAction?: boolean;
}

export const WordPillList: React.FC<Props> = ({
  words,
  theme,
  onSelectWordDefinition,
  showVocabAction = true
}) => {
  const foundCount = words.filter(w => w.found).length;

  const isLight = theme.id === 'minimal-light';

  return (
    <div className="w-full max-w-[560px] mx-auto px-2">
      {/* Header counter */}
      <div className={`flex items-center justify-between text-xs mb-2 px-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
        <span className={`font-medium tracking-wide uppercase text-[11px] ${isLight ? 'text-[#0D9488]' : 'text-[#35D6B0]'}`}>
          Target Words
        </span>
        <span className="tabular-nums font-mono font-medium">
          {foundCount} / {words.length} Found
        </span>
      </div>

      {/* Grid of word chips */}
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {words.map((w, i) => {
          return (
            <div
              key={w.word + i}
              onClick={() => {
                if (w.found && onSelectWordDefinition) {
                  onSelectWordDefinition(w.word);
                }
              }}
              className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs md:text-sm font-semibold tracking-wider transition-all duration-200 select-none ${
                w.found
                  ? isLight
                    ? 'border-[#0D9488] bg-[#CCFBF1] text-[#0F766E] shadow-sm cursor-pointer'
                    : 'border-[#35D6B0]/40 bg-[#35D6B0]/15 text-[#35D6B0] shadow-sm cursor-pointer'
                  : isLight
                  ? 'border-slate-300 bg-white text-slate-800 shadow-xs hover:border-slate-400'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
              }`}
            >
              {/* Checkmark or empty dot */}
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  w.found 
                    ? isLight ? 'bg-[#0D9488] text-white' : 'bg-[#35D6B0] text-black' 
                    : isLight ? 'border border-slate-400' : 'border border-white/20'
                }`}
              >
                {w.found ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : null}
              </div>

              {/* Word text with animated strike */}
              <span className={`transition-all ${w.found ? 'line-through opacity-85' : ''}`}>
                {w.word}
              </span>

              {/* Subtle dictionary icon affordance if found */}
              {w.found && showVocabAction && (
                <BookOpen className={`w-3 h-3 ${isLight ? 'text-[#0D9488]' : 'text-[#35D6B0]/60'} group-hover:text-current transition-colors ml-0.5`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
