import React, { useEffect } from 'react';
import { Play, Calendar, Compass, Volume2, VolumeX, Sparkles, Trophy } from 'lucide-react';
import { audio } from '../utils/audio';
import { PlayerStats } from '../types/game';

interface Props {
  stats: PlayerStats;
  isMuted: boolean;
  onStartAdventure: () => void;
  onOpenDaily: () => void;
  onOpenWorldMap: () => void;
  onToggleMute: () => void;
  onOpenAchievements: () => void;
}

export const TitleScreen: React.FC<Props> = ({
  stats,
  isMuted,
  onStartAdventure,
  onOpenDaily,
  onOpenWorldMap,
  onToggleMute,
  onOpenAchievements
}) => {
  // Listen for Enter / Space to start immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        audio.playClick();
        onStartAdventure();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStartAdventure]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 overflow-hidden">
      {/* Ambient background particles & constellation lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15%" cy="20%" r="2" fill="#35D6B0" />
          <circle cx="85%" cy="25%" r="2" fill="#A99BFF" />
          <circle cx="20%" cy="80%" r="2.5" fill="#F5C66B" />
          <circle cx="80%" cy="75%" r="2" fill="#35D6B0" />
          <circle cx="50%" cy="15%" r="1.5" fill="#FFFFFF" />
          <line x1="15%" y1="20%" x2="50%" y2="15%" stroke="#35D6B0" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
          <line x1="50%" y1="15%" x2="85%" y2="25%" stroke="#A99BFF" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
        </svg>
      </div>

      {/* Top utility cluster */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-[#35D6B0]" />
          <span>Odyssey Level {stats.playerLevel}</span>
          <span className="text-white/20">·</span>
          <span className="text-[#F5C66B] font-mono font-bold">{stats.coins} Coins</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audio.playClick();
              onOpenAchievements();
            }}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Achievements"
          >
            <Trophy className="w-4 h-4 text-[#F5C66B]" />
          </button>

          <button
            onClick={onToggleMute}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#35D6B0]" />}
          </button>
        </div>
      </div>

      {/* Hero Centerpiece Lockup */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto max-w-xl">
        {/* Bespoke inline SVG Title Lockup */}
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto mb-4 relative flex items-center justify-center">
            {/* Ambient rotating ring */}
            <div className="absolute inset-0 rounded-3xl border-2 border-[#35D6B0]/30 rotate-12 animate-pulse" />
            <div className="absolute inset-0 rounded-3xl bg-[#153C43] border border-[#35D6B0]/50 shadow-2xl flex items-center justify-center">
              <Compass className="w-12 h-12 text-[#35D6B0] animate-float" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black font-['Outfit'] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F3F5F8] via-[#35D6B0] to-[#A99BFF] drop-shadow-md">
            WORD ODYSSEY
          </h1>
          <p className="mt-2 text-sm md:text-base font-medium text-slate-400 tracking-widest uppercase">
            A Journey of Words Across Ancient Civilizations
          </p>
        </div>

        {/* Primary CTA with keyboard hint */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          <button
            onClick={() => {
              audio.playClick();
              onStartAdventure();
            }}
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-[#35D6B0] to-[#22B38E] text-slate-950 font-black text-lg tracking-wider flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(53,214,176,0.4)] hover:shadow-[0_0_35px_rgba(53,214,176,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <Play className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
            <span>START ODYSSEY</span>
          </button>

          {/* Secondary Quick Action: Daily Puzzle */}
          <div className="flex w-full gap-2">
            <button
              onClick={() => {
                audio.playClick();
                onOpenDaily();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#F5C66B]" />
              <span>Daily Challenge</span>
            </button>

            <button
              onClick={() => {
                audio.playClick();
                onOpenWorldMap();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#A99BFF]" />
              <span>World Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flat control-hint line (Game craft rule) */}
      <div className="z-10 text-center pb-2">
        <p className="text-xs font-mono tracking-wider text-slate-400">
          Drag / Mouse / Tap letters · Space / Enter Start · Esc Pause
        </p>
      </div>
    </div>
  );
};
