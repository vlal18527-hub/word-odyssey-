import React from 'react';
import { GameMode, PlayerStats, Destination, DifficultyTier } from '../types/game';
import { ImageWithFallback } from './ImageWithFallback';
import { 
  Play, 
  Sparkles, 
  Flame, 
  Map, 
  Palette, 
  Trophy, 
  BarChart3, 
  Clock, 
  BookOpen, 
  Compass, 
  Flame as FireIcon, 
  ShieldCheck,
  ChevronRight,
  ShoppingBag,
  Target,
  User,
  Infinity,
  Swords,
  Sliders,
  Award
} from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  stats: PlayerStats;
  currentDestination: Destination;
  nextLevelNumber: number;
  selectedDifficulty: DifficultyTier;
  onSelectDifficulty: (tier: DifficultyTier) => void;
  onSelectMode: (mode: GameMode) => void;
  onOpenWorldMap: () => void;
  onOpenThemeStudio: () => void;
  onOpenAchievements: () => void;
  onOpenStats: () => void;
  onOpenStore: () => void;
  onOpenMissions: () => void;
  onOpenProfile: () => void;
  onOpenTestRunner: () => void;
  onOpenPassport: () => void;
  onOpenVocabCoach: () => void;
  onOpenPractice: () => void;
}

export const HomeDashboard: React.FC<Props> = ({
  stats,
  currentDestination,
  nextLevelNumber,
  selectedDifficulty,
  onSelectDifficulty,
  onSelectMode,
  onOpenWorldMap,
  onOpenThemeStudio,
  onOpenAchievements,
  onOpenStats,
  onOpenStore,
  onOpenMissions,
  onOpenProfile,
  onOpenTestRunner,
  onOpenPassport,
  onOpenVocabCoach,
  onOpenPractice
}) => {
  const isBossLevel = nextLevelNumber % 10 === 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-5 space-y-5">
      {/* Top Quick Utility Cluster */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2">
          {/* Living Passport Button */}
          <button
            onClick={() => {
              audio.playClick();
              onOpenPassport();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5C66B]/15 hover:bg-[#F5C66B]/25 border border-[#F5C66B]/30 text-xs font-semibold text-[#F5C66B] transition-colors cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Travel Passport</span>
          </button>

          {/* Word Coach Button */}
          <button
            onClick={() => {
              audio.playClick();
              onOpenVocabCoach();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#35D6B0]/15 hover:bg-[#35D6B0]/25 border border-[#35D6B0]/30 text-xs font-semibold text-[#35D6B0] transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Word Coach</span>
          </button>

          {/* Practice Tutorial Button */}
          <button
            onClick={() => {
              audio.playClick();
              onOpenPractice();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Practice</span>
          </button>

          {/* Profile Button */}
          <button
            onClick={() => {
              audio.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-[#35D6B0]" />
            <span>Profile (Lv {stats.playerLevel})</span>
          </button>

          {/* Missions Button */}
          <button
            onClick={() => {
              audio.playClick();
              onOpenMissions();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
          >
            <Target className="w-3.5 h-3.5 text-[#F5C66B]" />
            <span>Missions</span>
          </button>

          {/* Power-Up Store Button */}
          <button
            onClick={() => {
              audio.playClick();
              onOpenStore();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Armory Bazaar</span>
          </button>
        </div>

        {/* Difficulty Tier Selector */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
          <Sliders className="w-3 h-3 text-slate-400 ml-1.5 mr-0.5" />
          {(['beginner', 'easy', 'medium', 'hard', 'expert'] as DifficultyTier[]).map(tier => (
            <button
              key={tier}
              onClick={() => {
                audio.playClick();
                onSelectDifficulty(tier);
              }}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                selectedDifficulty === tier
                  ? 'bg-[#35D6B0] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Hero: Active Expedition Card with Real Destination Photography */}
      <div className="relative overflow-hidden rounded-3xl bg-[#153C43] border border-[#35D6B0]/30 shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-20 max-w-md text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#35D6B0] mb-2">
            <Compass className="w-4 h-4" />
            <span>Active Expedition · {currentDestination.region}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black font-['Outfit'] text-white tracking-wide mb-1">
            {currentDestination.name}
          </h2>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-5">
            {isBossLevel ? (
              <span className="text-red-400 font-bold">
                Level {nextLevelNumber}: BOSS TRIAL — {currentDestination.levels[nextLevelNumber - 1]?.title || 'Titan Encounter'}
              </span>
            ) : (
              <span>
                Level {nextLevelNumber}: {currentDestination.levels[nextLevelNumber - 1]?.title || 'Next Frontier'}
              </span>
            )}
          </p>

          <button
            onClick={() => {
              audio.playClick();
              onSelectMode('adventure');
            }}
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#35D6B0] to-[#22B38E] text-slate-950 font-black text-sm tracking-wide flex items-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(53,214,176,0.35)] cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isBossLevel ? 'CHALLENGE BOSS' : 'CONTINUE EXPEDITION'}</span>
          </button>
        </div>

        {/* Real Destination Photography Hero Card with fallback */}
        <div className="relative w-full md:w-80 h-48 rounded-2xl overflow-hidden border border-white/10 shadow-lg shrink-0">
          <ImageWithFallback
            src={currentDestination.imageUrl}
            alt={currentDestination.imageAlt}
            fallbackDestinationId={currentDestination.id}
            priority={true}
          />
          {currentDestination.photographer && (
            <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white/50 bg-black/60 px-1.5 py-0.5 rounded z-20">
              Photo: {currentDestination.photographer}
            </div>
          )}
        </div>
      </div>

      {/* Streak & Daily Challenge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Streak card */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F5C66B] to-[#D97706] flex items-center justify-center text-slate-950 font-black">
              <Flame className="w-6 h-6 fill-current text-white" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Daily Explorer Streak</div>
              <div className="text-base font-bold text-white font-['Outfit']">
                {stats.streakDays} Day{stats.streakDays > 1 ? 's' : ''} Active · Best: {stats.longestStreak || stats.streakDays}
              </div>
            </div>
          </div>
          <div className="text-xs font-mono text-[#F5C66B] font-semibold bg-[#F5C66B]/15 px-2.5 py-1 rounded-lg">
            +{stats.streakDays * 15} Coins
          </div>
        </div>

        {/* Daily Challenge Card */}
        <div 
          onClick={() => {
            audio.playClick();
            onSelectMode('daily');
          }}
          className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#153C43] to-[#1E293B] border border-[#F5C66B]/30 hover:border-[#F5C66B] transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#F5C66B]/20 flex items-center justify-center text-[#F5C66B]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-[#F5C66B] font-semibold tracking-wide">TODAY'S SPECIAL</div>
              <div className="text-sm font-bold text-white font-['Outfit']">Daily Wonder Puzzle</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#F5C66B] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Playable Game Modes Grid */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
          Explore Game Modes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Adventure */}
          <div
            onClick={() => {
              audio.playClick();
              onSelectMode('adventure');
            }}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#35D6B0]/50 transition-all cursor-pointer flex flex-col justify-between h-32 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#35D6B0]/20 flex items-center justify-center text-[#35D6B0]">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400">100+ Levels</span>
            </div>
            <div>
              <div className="font-bold text-sm text-white group-hover:text-[#35D6B0] transition-colors">Adventure Journey</div>
              <div className="text-[11px] text-slate-400">10 worlds, 100 levels & boss trials.</div>
            </div>
          </div>

          {/* Zen Mode */}
          <div
            onClick={() => {
              audio.playClick();
              onSelectMode('zen');
            }}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A99BFF]/50 transition-all cursor-pointer flex flex-col justify-between h-32 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#A99BFF]/20 flex items-center justify-center text-[#A99BFF]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-[#A99BFF]">No Timer</span>
            </div>
            <div>
              <div className="font-bold text-sm text-white group-hover:text-[#A99BFF] transition-colors">Zen Sanctuary</div>
              <div className="text-[11px] text-slate-400">Untimed puzzles with ambient sound.</div>
            </div>
          </div>

          {/* Blitz Countdown */}
          <div
            onClick={() => {
              audio.playClick();
              onSelectMode('blitz');
            }}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer flex flex-col justify-between h-32 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-amber-400">120s Rush</span>
            </div>
            <div>
              <div className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">Blitz Countdown</div>
              <div className="text-[11px] text-slate-400">Combo multipliers & time bonuses.</div>
            </div>
          </div>

          {/* Challenge Mode */}
          <div
            onClick={() => {
              audio.playClick();
              onSelectMode('challenge');
            }}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-400/50 transition-all cursor-pointer flex flex-col justify-between h-32 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-xl bg-rose-400/20 flex items-center justify-center text-rose-400">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-rose-400">Strict Rules</span>
            </div>
            <div>
              <div className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors">Challenge Mode</div>
              <div className="text-[11px] text-slate-400">Zero hints & zero error tolerance.</div>
            </div>
          </div>

          {/* Endless Mode */}
          <div
            onClick={() => {
              audio.playClick();
              onSelectMode('endless');
            }}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer flex flex-col justify-between h-32 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-xl bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                <Infinity className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400">Streak: {stats.endlessStreak || 0}</span>
            </div>
            <div>
              <div className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">Endless Mode</div>
              <div className="text-[11px] text-slate-400">Continuous infinite procedural grids.</div>
            </div>
          </div>

          {/* Boss Encounter Mode */}
          <div
            onClick={() => {
              audio.playClick();
              onSelectMode('boss');
            }}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-400/50 transition-all cursor-pointer flex flex-col justify-between h-32 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-xl bg-red-400/20 flex items-center justify-center text-red-400">
                <Swords className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-red-400">Multi-Stage</span>
            </div>
            <div>
              <div className="font-bold text-sm text-white group-hover:text-red-400 transition-colors">Boss Trials</div>
              <div className="text-[11px] text-slate-400">Battle titans with milestone words.</div>
            </div>
          </div>

          {/* Treasure Hunt */}
          <div
            onClick={() => {
              audio.playClick();
              onSelectMode('treasure');
            }}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 transition-all cursor-pointer flex flex-col justify-between h-32 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-xl bg-emerald-400/20 flex items-center justify-center text-emerald-400">
                <FireIcon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Chests</span>
            </div>
            <div>
              <div className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">Treasure Hunt</div>
              <div className="text-[11px] text-slate-400">Discover hidden bonus words.</div>
            </div>
          </div>

          {/* Vocabulary Mode */}
          <div
            onClick={() => {
              audio.playClick();
              onSelectMode('vocab');
            }}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/50 transition-all cursor-pointer flex flex-col justify-between h-32 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-xl bg-sky-400/20 flex items-center justify-center text-sky-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-sky-400">Lexicon</span>
            </div>
            <div>
              <div className="font-bold text-sm text-white group-hover:text-sky-400 transition-colors">Vocabulary Mode</div>
              <div className="text-[11px] text-slate-400">Educational definitions & origins.</div>
            </div>
          </div>

          {/* Mystery Landmark Reveal Mode */}
          <div
            onClick={() => {
              audio.playClick();
              onSelectMode('mystery');
            }}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F5C66B]/50 transition-all cursor-pointer flex flex-col justify-between h-32 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#F5C66B]/20 flex items-center justify-center text-[#F5C66B]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-[#F5C66B]">Reveal</span>
            </div>
            <div>
              <div className="font-bold text-sm text-white group-hover:text-[#F5C66B] transition-colors">Mystery Landmark</div>
              <div className="text-[11px] text-slate-400">Dissolve shroud tiles to reveal real photos.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <button
          onClick={() => {
            audio.playClick();
            onOpenWorldMap();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
        >
          <Map className="w-3.5 h-3.5 text-purple-400" />
          <span>World Map Hub</span>
        </button>

        <button
          onClick={() => {
            audio.playClick();
            onOpenThemeStudio();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
        >
          <Palette className="w-3.5 h-3.5 text-[#35D6B0]" />
          <span>Themes (8 Palettes)</span>
        </button>

        <button
          onClick={() => {
            audio.playClick();
            onOpenAchievements();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5 text-[#F5C66B]" />
          <span>Achievements</span>
        </button>

        <button
          onClick={() => {
            audio.playClick();
            onOpenStats();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
        >
          <BarChart3 className="w-3.5 h-3.5 text-[#A99BFF]" />
          <span>Statistics</span>
        </button>

        <button
          onClick={() => {
            audio.playClick();
            onOpenTestRunner();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Engine Test Suite</span>
        </button>
      </div>
    </div>
  );
};
