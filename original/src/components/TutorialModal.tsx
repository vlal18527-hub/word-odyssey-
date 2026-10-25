import React from 'react';
import { X, Move, Sparkles, BookOpen, Search, Compass, Zap } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  onClose: () => void;
}

export const TutorialModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#153C43] border border-white/10 rounded-3xl p-6 text-left shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            audio.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-2xl font-black font-['Outfit'] text-white mb-1">
          How to Play Word Odyssey
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Master the rules of the expedition and uncover every hidden secret.
        </p>

        <div className="space-y-4 mb-6">
          {/* Step 1: 8 Directions */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-xl bg-[#35D6B0]/20 text-[#35D6B0] flex items-center justify-center shrink-0 mt-0.5">
              <Move className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">
                Swipe in All 8 Directions
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Connect letters in straight horizontal, vertical, or diagonal lines. Dragging backwards from the last letter to the first is fully supported!
              </p>
            </div>
          </div>

          {/* Step 2: Smart Hints */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-xl bg-[#F5C66B]/20 text-[#F5C66B] flex items-center justify-center shrink-0 mt-0.5">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">
                Smart Hints
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Stuck on a tricky word? Use the <strong>Letter Magnifier</strong> to pulse the first tile, the <strong>Compass</strong> to show starting location and direction, or the <strong>Starlight</strong> to instantly find a word.
              </p>
            </div>
          </div>

          {/* Step 3: Bonus Words & Hidden Treasure */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-xl bg-[#A99BFF]/20 text-[#A99BFF] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">
                Bonus Words & Hidden Treasure
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Notice a valid English word on the grid that isn't on the target list? Swipe across it anyway to discover bonus words and earn extra gold coins!
              </p>
            </div>
          </div>

          {/* Step 4: Controls & Accessibility */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-xl bg-sky-400/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">
                Controls & Accessibility
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Play using touch swipe, mouse drag, or keyboard arrow keys! On desktop, press <span className="font-mono text-white bg-black/40 px-1 py-0.5 rounded">Space</span> to start your selection, move arrows, and press <span className="font-mono text-white bg-black/40 px-1 py-0.5 rounded">Space</span> again to finish.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            audio.playClick();
            onClose();
          }}
          className="w-full py-3 px-4 rounded-xl bg-[#35D6B0] text-slate-950 font-bold text-sm tracking-wide hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg"
        >
          Got It, Let's Play!
        </button>
      </div>
    </div>
  );
};
