import React from 'react';
import { Play, RotateCcw, HelpCircle, Settings, Map, Volume2, VolumeX, X } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  onResume: () => void;
  onRestart: () => void;
  onTutorial: () => void;
  onSettings: () => void;
  onQuit: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const PauseMenu: React.FC<Props> = ({
  onResume,
  onRestart,
  onTutorial,
  onSettings,
  onQuit,
  isMuted,
  onToggleMute
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#153C43] border border-white/10 rounded-3xl p-6 text-center shadow-2xl space-y-4">
        {/* Close Button */}
        <button
          onClick={() => {
            audio.playClick();
            onResume();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-2xl font-black font-['Outfit'] text-white">
          Game Paused
        </h3>
        <p className="text-xs text-slate-400">Take a breath, explorer. Your timer is on hold.</p>

        <div className="space-y-2 pt-2">
          {/* Resume */}
          <button
            onClick={() => {
              audio.playClick();
              onResume();
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#35D6B0] text-slate-950 font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Resume Game</span>
          </button>

          {/* Restart */}
          <button
            onClick={() => {
              audio.playClick();
              onRestart();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#F5C66B]" />
            <span>Restart Puzzle</span>
          </button>

          {/* How to Play */}
          <button
            onClick={() => {
              audio.playClick();
              onTutorial();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#A99BFF]" />
            <span>How to Play Guide</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => {
              audio.playClick();
              onSettings();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>Audio & Settings</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              audio.playClick();
              onToggleMute();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span>Unmute Audio</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#35D6B0]" />
                <span>Mute Audio</span>
              </>
            )}
          </button>

          {/* Quit to World Map */}
          <button
            onClick={() => {
              audio.playClick();
              onQuit();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer pt-3 mt-2"
          >
            <Map className="w-3.5 h-3.5" />
            <span>Return to Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};
