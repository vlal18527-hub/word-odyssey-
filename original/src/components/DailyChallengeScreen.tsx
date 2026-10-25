import React from 'react';
import { GameSaveData } from '../types/game';
import { getLocalCalendarDate } from '../utils/storage';
import { Calendar, Trophy, Star, ArrowLeft, Play, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  saveData: GameSaveData;
  onPlayDaily: () => void;
  onBack: () => void;
}

export const DailyChallengeScreen: React.FC<Props> = ({ saveData, onPlayDaily, onBack }) => {
  const today = getLocalCalendarDate();
  const todayEntry = saveData.dailyHistory[today];
  const isCompletedToday = !!todayEntry?.completed;

  // Generate calendar days for the current month
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = now.toLocaleString('default', { month: 'long' });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            audio.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-[#F5C66B]">
          <Flame className="w-4 h-4 fill-current" />
          <span>{saveData.stats.streakDays} Day Streak</span>
        </div>
      </div>

      {/* Main Today's Challenge Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#153C43] to-[#101827] border border-[#F5C66B]/30 p-6 md:p-8 text-left shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F5C66B] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Today's Synchronized Puzzle · {today}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black font-['Outfit'] text-white">
            Wonders of the Cosmos
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            A unique 10×10 celestial puzzle identical for all players today. Complete it to preserve your active explorer streak and claim bonus coins!
          </p>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => {
                audio.playClick();
                onPlayDaily();
              }}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#F5C66B] to-[#D97706] text-slate-950 font-black text-sm tracking-wide flex items-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(245,198,107,0.35)] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isCompletedToday ? 'PLAY AGAIN' : 'START DAILY CHALLENGE'}</span>
            </button>

            {isCompletedToday && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Today's Trophy Claimed (+150 Coins & Stamp)</span>
              </div>
            )}
          </div>
        </div>

        {/* Daily trophy icon */}
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#F5C66B]/20 to-[#D97706]/10 border border-[#F5C66B]/30 flex items-center justify-center shrink-0">
          <Trophy className="w-16 h-16 text-[#F5C66B] animate-pulse" />
        </div>
      </div>

      {/* 3 Daily Quests & Weekly Themed Collection Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        {/* 3 Daily Quests */}
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#35D6B0]">
              Today's 3 Expedition Quests
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {isCompletedToday ? '3/3 Complete' : 'Active'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${isCompletedToday ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className={isCompletedToday ? 'text-slate-300 line-through' : 'text-white font-medium'}>
                  1. Solve Today's Celestial Board
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#F5C66B] font-bold">+50 Coins</span>
            </div>

            <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${(todayEntry?.score || 0) >= 600 ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className={(todayEntry?.score || 0) >= 600 ? 'text-slate-300 line-through' : 'text-white font-medium'}>
                  2. Achieve 600+ Expedition Score
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#F5C66B] font-bold">+40 Coins</span>
            </div>

            <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${isCompletedToday ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className={isCompletedToday ? 'text-slate-300 line-through' : 'text-white font-medium'}>
                  3. Earn Daily Explorer Streak Seal
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#35D6B0] font-bold">+80 XP</span>
            </div>
          </div>
        </div>

        {/* Weekly Themed Collection */}
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5C66B]">
                Weekly Cosmic Reliquary
              </span>
              <span className="text-xs font-mono text-slate-300 font-bold">
                {Math.min(7, (saveData.stats.dailyChallengesCompleted % 7) || (isCompletedToday ? 1 : 0))}/7 Days
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Complete daily expeditions across the week to assemble the full Cosmic Reliquary. Missing a day does not delete previous milestones!
            </p>

            <div className="flex gap-1.5 py-1">
              {[1, 2, 3, 4, 5, 6, 7].map(d => {
                const completedCount = Math.min(7, (saveData.stats.dailyChallengesCompleted % 7) || (isCompletedToday ? 1 : 0));
                const isCollected = d <= completedCount;

                return (
                  <div
                    key={d}
                    className={`flex-1 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold border transition-all ${
                      isCollected
                        ? 'bg-[#F5C66B]/20 border-[#F5C66B] text-[#F5C66B] shadow-sm'
                        : 'bg-white/5 border-white/10 text-slate-500'
                    }`}
                  >
                    {isCollected ? <Sparkles className="w-3.5 h-3.5" /> : d}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Weekly Vault Bonus:</span>
            <span className="font-mono text-[#F5C66B] font-bold">+250 Coins & 1x Streak Shield</span>
          </div>
        </div>
      </div>

      {/* Calendar representation */}
      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-left">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#35D6B0]" />
            <span className="font-bold text-white font-['Outfit']">{monthName} {year}</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {saveData.stats.dailyChallengesCompleted} Total Completed
          </span>
        </div>

        {/* Calendar days grid */}
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-[10px] font-mono text-slate-400 py-1">
              {d}
            </div>
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const dayNum = i + 1;
            const dayStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
            const completed = !!saveData.dailyHistory[dayStr]?.completed;
            const isToday = dayStr === today;

            return (
              <div
                key={dayStr}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-mono transition-all ${
                  completed
                    ? 'bg-[#35D6B0]/20 border border-[#35D6B0] text-[#35D6B0] font-bold shadow-sm'
                    : isToday
                    ? 'border-2 border-[#F5C66B] text-white font-bold'
                    : 'bg-white/5 text-slate-400'
                }`}
              >
                <span>{dayNum}</span>
                {completed && <Star className="w-2.5 h-2.5 fill-current mt-0.5" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
