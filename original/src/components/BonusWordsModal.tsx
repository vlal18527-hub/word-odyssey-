import React from 'react';
import { Sparkles, Coins, X, Gem } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  bonusWords: string[];
  onClose: () => void;
}

export const BonusWordsModal: React.FC<Props> = ({ bonusWords, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#153C43] border border-[#F5C66B]/30 rounded-3xl p-6 text-center shadow-2xl">
        <button
          onClick={() => {
            audio.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5C66B] to-[#D97706] p-0.5 mx-auto mb-3 flex items-center justify-center">
          <div className="w-full h-full bg-[#153C43] rounded-[14px] flex items-center justify-center">
            <Gem className="w-6 h-6 text-[#F5C66B]" />
          </div>
        </div>

        <h3 className="text-xl font-black font-['Outfit'] text-white">
          Secret Bonus Words
        </h3>
        <p className="text-xs text-slate-300 mt-1 mb-4">
          Hidden English words discovered outside the target list. Each one awards 10 gold coins!
        </p>

        {bonusWords.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-center max-h-48 overflow-y-auto p-2 bg-black/30 rounded-2xl border border-white/10 mb-4">
            {bonusWords.map((word, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-[#35D6B0]/15 border border-[#35D6B0]/30 text-[#35D6B0] font-mono text-xs font-bold"
              >
                {word}
              </span>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 mb-4">
            No bonus words discovered in this puzzle yet. Look closely for unexpected English words in the grid!
          </div>
        )}

        <button
          onClick={() => {
            audio.playClick();
            onClose();
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-[#35D6B0] text-slate-950 font-bold text-xs tracking-wide hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
        >
          Keep Hunting
        </button>
      </div>
    </div>
  );
};
