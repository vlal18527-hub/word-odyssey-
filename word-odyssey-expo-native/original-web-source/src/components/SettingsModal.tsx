import React, { useState } from 'react';
import { UserPreferences, GameSaveData } from '../types/game';
import { StorageManager } from '../utils/storage';
import { audio } from '../utils/audio';
import { X, Volume2, VolumeX, Download, Upload, Trash2, Check, AlertTriangle } from 'lucide-react';

interface Props {
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
  onDataReset: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({
  preferences,
  onUpdatePreferences,
  onDataReset,
  onClose
}) => {
  const [copiedExport, setCopiedExport] = useState(false);
  const [importString, setImportString] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleExport = () => {
    const data = StorageManager.exportSave();
    navigator.clipboard.writeText(data);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  const handleImport = () => {
    if (!importString.trim()) return;
    const ok = StorageManager.importSave(importString.trim());
    if (ok) {
      setImportStatus('Save data restored successfully! Reloading...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setImportStatus('Invalid save format. Please check the JSON.');
    }
  };

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
          Settings & Audio
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Adjust sound volumes, backup game progress, or manage device settings.
        </p>

        {/* Audio Volume Controls */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#35D6B0]">
              Audio Channels
            </span>
            <button
              onClick={() => {
                const nextMute = !preferences.soundMuted;
                onUpdatePreferences({ soundMuted: nextMute });
                audio.setVolumes(preferences.masterVolume, preferences.soundVolume, preferences.musicVolume, nextMute);
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              {preferences.soundMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span>Unmute All</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#35D6B0]" />
                  <span>Mute All</span>
                </>
              )}
            </button>
          </div>

          {/* Master Volume */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
              <span>Master Volume</span>
              <span className="font-mono">{Math.round(preferences.masterVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={preferences.masterVolume}
              onChange={e => {
                const val = parseFloat(e.target.value);
                onUpdatePreferences({ masterVolume: val });
                audio.setVolumes(val, preferences.soundVolume, preferences.musicVolume, preferences.soundMuted);
              }}
              className="w-full accent-[#35D6B0] cursor-pointer"
            />
          </div>

          {/* Sound FX */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
              <span>Sound Effects</span>
              <span className="font-mono">{Math.round(preferences.soundVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={preferences.soundVolume}
              onChange={e => {
                const val = parseFloat(e.target.value);
                onUpdatePreferences({ soundVolume: val });
                audio.setVolumes(preferences.masterVolume, val, preferences.musicVolume, preferences.soundMuted);
              }}
              className="w-full accent-[#F5C66B] cursor-pointer"
            />
          </div>

          {/* Music */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
              <span>Music & Ambient Drone</span>
              <span className="font-mono">{Math.round(preferences.musicVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={preferences.musicVolume}
              onChange={e => {
                const val = parseFloat(e.target.value);
                onUpdatePreferences({ musicVolume: val });
                audio.setVolumes(preferences.masterVolume, preferences.soundVolume, val, preferences.soundMuted);
              }}
              className="w-full accent-[#A99BFF] cursor-pointer"
            />
          </div>
        </div>

        {/* Cloud / Local Save Management */}
        <div className="space-y-4 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F5C66B] block pb-2 border-b border-white/10">
            Save Data Backup & Restore
          </span>

          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedExport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-[#35D6B0]" />}
              <span>{copiedExport ? 'Copied to Clipboard!' : 'Export Save JSON'}</span>
            </button>
          </div>

          {/* Import JSON input */}
          <div className="space-y-2">
            <textarea
              placeholder="Paste save data JSON string here to restore..."
              value={importString}
              onChange={e => setImportString(e.target.value)}
              className="w-full h-16 p-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300 resize-none focus:outline-none focus:border-[#35D6B0]"
            />
            {importString && (
              <button
                onClick={handleImport}
                className="w-full py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#F5C66B]" />
                <span>Restore Backup Data</span>
              </button>
            )}
            {importStatus && (
              <p className="text-xs font-medium text-emerald-400">{importStatus}</p>
            )}
          </div>
        </div>

        {/* Reset Progress Section */}
        <div className="pt-4 border-t border-white/10">
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset All Progress</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Are you sure? All stars, coins, and levels will be erased.</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    audio.playClick();
                    onDataReset();
                    setConfirmReset(false);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Yes, Erase Everything
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
