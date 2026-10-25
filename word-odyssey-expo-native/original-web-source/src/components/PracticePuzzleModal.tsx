import React, { useState } from 'react';
import { ThemeConfig } from '../types/game';
import { WordSearchBoard } from './WordSearchBoard';
import { WordPillList } from './WordPillList';
import { WordSearchEngine } from '../engine/wordSearch';
import { X, Sparkles, CheckCircle2, Play } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  theme: ThemeConfig;
  onComplete: () => void;
  onClose: () => void;
}

export const PracticePuzzleModal: React.FC<Props> = ({ theme, onComplete, onClose }) => {
  const [board, setBoard] = useState(() => {
    return WordSearchEngine.generateBoard({
      size: 6,
      words: ['SUN', 'MAP', 'VOYAGE'],
      allowedDirections: [[0, 1], [1, 0], [1, 1]]
    });
  });

  const [stepMessage, setStepMessage] = useState('Step 1: Click & drag your finger or mouse across the letters to connect words.');
  const [isWon, setIsWon] = useState(false);

  const handleWordDiscovered = (matched: any) => {
    const updated = board.words.map(w => {
      if (w.word.toUpperCase() === matched.word.toUpperCase()) {
        return { ...w, found: true };
      }
      return w;
    });

    setBoard({ ...board, words: updated });
    audio.playTileSelect(4);

    const remaining = updated.filter(w => !w.found).length;
    if (remaining === 2) {
      setStepMessage('Great find! You can also connect words diagonally and backwards.');
    } else if (remaining === 1) {
      setStepMessage('Almost there! Find the last word to claim your practice badge.');
    } else if (remaining === 0) {
      setIsWon(true);
      audio.playVictory();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#153C43] border border-[#35D6B0]/50 rounded-3xl p-5 text-left shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => {
            audio.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#35D6B0] mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Interactive Practice Tutorial</span>
        </div>
        <h2 className="text-2xl font-black font-['Outfit'] text-white mb-2">
          Master the Controls
        </h2>

        {/* Live Step Advice */}
        <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-xs text-slate-200 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#35D6B0] animate-ping shrink-0" />
          <span className="leading-snug">{stepMessage}</span>
        </div>

        {/* Practice Board */}
        {!isWon ? (
          <div className="space-y-3">
            <WordSearchBoard
              board={board}
              theme={theme}
              tileStyle="rounded"
              letterSize="medium"
              highContrast={false}
              selectionGlow={true}
              onWordDiscovered={handleWordDiscovered}
              onInvalidSelection={() => audio.playInvalid()}
            />

            <WordPillList
              words={board.words}
              theme={theme}
              showVocabAction={false}
            />
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black font-['Outfit'] text-white">
              Practice Complete!
            </h3>
            <p className="text-xs text-slate-300">
              You've mastered word connections. You're ready to explore 10 worlds across 100 levels!
            </p>
            <button
              onClick={() => {
                audio.playClick();
                onComplete();
              }}
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#35D6B0] to-[#22B38E] text-slate-950 font-black text-sm tracking-wide flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Claim +50 Practice Coins</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
