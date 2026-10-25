import React from 'react';
import { UserPreferences, ThemeId, TileStyle, LetterSize, ThemeConfig } from '../types/game';
import { THEMES } from '../data/themes';
import { ArrowLeft, Check, Palette, Eye, Sparkles, LayoutGrid } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
  onBack: () => void;
}

export const ThemeStudio: React.FC<Props> = ({ preferences, onUpdatePreferences, onBack }) => {
  const currentTheme = THEMES[preferences.themeId];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            audio.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="text-xs font-mono text-[#35D6B0]">
          Customization Studio
        </span>
      </div>

      <div className="text-left">
        <h2 className="text-3xl font-black font-['Outfit'] text-white">
          Visual Theme Studio
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Personalize colors, tile geometry, typography scales, and high-contrast accessibility.
        </p>
      </div>

      {/* Live Mini Preview Grid */}
      <div className="p-6 rounded-3xl border text-center transition-all shadow-xl" style={{ backgroundColor: currentTheme.colors.surface, borderColor: currentTheme.colors.border }}>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block">
          Interactive Live Preview
        </span>

        <div className="inline-grid grid-cols-4 gap-2 p-3 rounded-2xl bg-black/20 border border-white/10">
          {['A', 'U', 'R', 'O', 'R', 'A', 'S', 'K', 'Y', 'Z', 'E', 'N', 'W', 'I', 'N', 'D'].map((char, i) => {
            const isHighlight = i === 5 || i === 6;
            return (
              <div
                key={i}
                className={`w-12 h-12 flex items-center justify-center font-bold font-['Outfit'] transition-all ${
                  preferences.tileStyle === 'square'
                    ? 'rounded-none'
                    : preferences.tileStyle === 'pill'
                    ? 'rounded-full'
                    : preferences.tileStyle === 'circle'
                    ? 'rounded-full'
                    : 'rounded-xl'
                } ${
                  preferences.letterSize === 'small'
                    ? 'text-sm'
                    : preferences.letterSize === 'large'
                    ? 'text-xl'
                    : 'text-base'
                }`}
                style={{
                  backgroundColor: isHighlight ? currentTheme.colors.gridTileSelected : currentTheme.colors.gridTile,
                  color: isHighlight ? currentTheme.colors.primary : preferences.highContrast ? (currentTheme.id === 'minimal-light' ? '#0F172A' : '#FFFFFF') : currentTheme.colors.text,
                  border: isHighlight ? `1px solid ${currentTheme.colors.primary}` : '1px solid transparent'
                }}
              >
                {char}
              </div>
            );
          })}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="text-left space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
          Color Themes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.keys(THEMES) as ThemeId[]).map(themeId => {
            const t = THEMES[themeId];
            const isSelected = preferences.themeId === themeId;

            return (
              <div
                key={themeId}
                onClick={() => {
                  audio.playClick();
                  onUpdatePreferences({ themeId });
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#35D6B0] shadow-[0_0_15px_rgba(53,214,176,0.25)]'
                    : 'border-white/10 hover:border-white/20 bg-white/5'
                }`}
                style={{ backgroundColor: t.colors.surface }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm" style={{ color: t.colors.text }}>
                    {t.name}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-[#35D6B0]" />}
                </div>

                {/* Color swatches */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: t.colors.primary }} />
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: t.colors.reward }} />
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: t.colors.secondary }} />
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: t.colors.gridTile }} />
                </div>

                <p className="text-[11px] leading-tight" style={{ color: t.colors.textMuted }}>
                  {t.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tile Shapes & Letter Sizes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        {/* Tile Shapes */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <LayoutGrid className="w-4 h-4 text-[#35D6B0]" />
            <span>Tile Style</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'rounded', label: 'Rounded Square' },
              { id: 'square', label: 'Sharp Grid' },
              { id: 'pill', label: 'Oval Pill' },
              { id: 'circle', label: 'Circular' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  audio.playClick();
                  onUpdatePreferences({ tileStyle: item.id as TileStyle });
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  preferences.tileStyle === item.id
                    ? 'border-[#35D6B0] bg-[#35D6B0]/15 text-[#35D6B0] font-bold'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Letter Size */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Sparkles className="w-4 h-4 text-[#F5C66B]" />
            <span>Typography Letter Scale</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'small', label: 'Compact' },
              { id: 'medium', label: 'Standard' },
              { id: 'large', label: 'Large' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  audio.playClick();
                  onUpdatePreferences({ letterSize: item.id as LetterSize });
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  preferences.letterSize === item.id
                    ? 'border-[#F5C66B] bg-[#F5C66B]/15 text-[#F5C66B] font-bold'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility & Visual Enhancements */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <Eye className="w-4 h-4 text-[#A99BFF]" />
          <span>Accessibility & Visual Comfort</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-white/10">
          <div>
            <div className="text-sm font-semibold text-white">High Contrast Letters</div>
            <div className="text-xs text-slate-400">Forces maximum pure white contrast on all letter tiles.</div>
          </div>
          <input
            type="checkbox"
            checked={preferences.highContrast}
            onChange={e => {
              audio.playClick();
              onUpdatePreferences({ highContrast: e.target.checked });
            }}
            className="w-5 h-5 accent-[#35D6B0] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-2 border-b border-white/10">
          <div>
            <div className="text-sm font-semibold text-white">Selection Beam Glow</div>
            <div className="text-xs text-slate-400">Render dynamic ethereal radiance around active drag paths.</div>
          </div>
          <input
            type="checkbox"
            checked={preferences.selectionGlow}
            onChange={e => {
              audio.playClick();
              onUpdatePreferences({ selectionGlow: e.target.checked });
            }}
            className="w-5 h-5 accent-[#35D6B0] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <div className="text-sm font-semibold text-white">Reduced Motion</div>
            <div className="text-xs text-slate-400">Diminish animations and pulses for motion sensitivity.</div>
          </div>
          <input
            type="checkbox"
            checked={preferences.reducedMotion}
            onChange={e => {
              audio.playClick();
              onUpdatePreferences({ reducedMotion: e.target.checked });
            }}
            className="w-5 h-5 accent-[#35D6B0] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
