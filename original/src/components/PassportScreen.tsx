import React, { useState } from 'react';
import { GameSaveData, PassportStamp, Destination } from '../types/game';
import { DESTINATIONS } from '../data/destinations';
import { getLevelAsset } from '../data/levelAssets';
import { ImageWithFallback } from './ImageWithFallback';
import { 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  Lock, 
  Globe, 
  Sparkles, 
  Download, 
  Share2, 
  Search,
  BookOpen
} from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  saveData: GameSaveData;
  onBack: () => void;
  onSelectLevelToPlay?: (destination: Destination, levelIndex: number) => void;
}

export const PassportScreen: React.FC<Props> = ({ 
  saveData, 
  onBack,
  onSelectLevelToPlay 
}) => {
  const [selectedWorldId, setSelectedWorldId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStamp, setSelectedStamp] = useState<PassportStamp | null>(null);

  // Compute total stamps
  const totalPossibleStamps = 100;
  const collectedStamps = saveData.passportStamps || {};
  const totalCollectedCount = Object.keys(collectedStamps).length;
  const progressPercent = Math.round((totalCollectedCount / totalPossibleStamps) * 100);

  // Gather stamps across destinations
  const allLandmarks = React.useMemo(() => {
    const list: Array<{
      levelId: string;
      levelNumber: number;
      destination: Destination;
      landmarkName: string;
      country: string;
      fact: string;
      isCollected: boolean;
      stampedAt?: string;
      imageUrl: string;
    }> = [];

    DESTINATIONS.forEach(dest => {
      dest.levels.forEach((lvl, idx) => {
        const asset = getLevelAsset(lvl.id);
        const stamp = collectedStamps[lvl.id];
        const isCollected = !!stamp || !!saveData.completedLevels[lvl.id];

        list.push({
          levelId: lvl.id,
          levelNumber: lvl.levelNumber,
          destination: dest,
          landmarkName: asset.caption.replace(/BOSS ARENA: /g, ''),
          country: dest.region,
          fact: asset.imageAlt,
          isCollected,
          stampedAt: stamp?.stampedAt || (saveData.completedLevels[lvl.id] ? 'Expedition Complete' : undefined),
          imageUrl: asset.imageUrl
        });
      });
    });

    return list;
  }, [collectedStamps, saveData.completedLevels]);

  const filteredLandmarks = allLandmarks.filter(item => {
    if (selectedWorldId !== 'all' && item.destination.id !== selectedWorldId) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.landmarkName.toLowerCase().includes(q) ||
        item.destination.name.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const exportPassport = () => {
    audio.playClick();
    const exportData = {
      playerLevel: saveData.stats.playerLevel,
      totalStamps: totalCollectedCount,
      completedLevels: Object.keys(saveData.completedLevels).length,
      stamps: collectedStamps,
      exportedAt: new Date().toISOString()
    };
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    alert('Passport Dossier copied to clipboard!');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6 text-left">
      {/* Header bar */}
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

        <button
          onClick={exportPassport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5C66B]/20 hover:bg-[#F5C66B]/30 border border-[#F5C66B]/40 text-[#F5C66B] text-xs font-semibold transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Passport Dossier</span>
        </button>
      </div>

      {/* Main Passport Album Cover / Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A2E35] via-[#101827] to-[#0A0E17] border border-[#F5C66B]/40 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F5C66B] mb-2">
              <Globe className="w-4 h-4" />
              <span>Official Explorer Credential</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-['Outfit'] text-white">
              Living Travel Passport
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Every completed world expedition awards a permanent digital landmark stamp, capturing verified geography, architecture, and cultural wonders.
            </p>
          </div>

          {/* Stamp counter badge */}
          <div className="p-4 rounded-2xl bg-black/40 border border-[#F5C66B]/30 text-center shrink-0 min-w-44">
            <div className="text-3xl font-black font-['Outfit'] text-[#F5C66B]">
              {totalCollectedCount} / {totalPossibleStamps}
            </div>
            <div className="text-xs font-medium text-slate-400 mt-0.5">
              Landmarks Stamped ({progressPercent}%)
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2.5">
              <div 
                className="bg-gradient-to-r from-[#F5C66B] to-[#35D6B0] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* World Filter Tabs & Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search landmark or country..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#35D6B0]"
            />
          </div>

          <div className="text-xs font-mono text-slate-400">
            Showing {filteredLandmarks.length} Landmarks
          </div>
        </div>

        {/* World pills carousel */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => {
              audio.playClick();
              setSelectedWorldId('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedWorldId === 'all'
                ? 'bg-[#35D6B0] text-slate-950 shadow-sm'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            All Worlds (100)
          </button>

          {DESTINATIONS.map(d => {
            const countInWorld = d.levels.filter(l => !!collectedStamps[l.id] || !!saveData.completedLevels[l.id]).length;
            const isCompleted = countInWorld === 10;

            return (
              <button
                key={d.id}
                onClick={() => {
                  audio.playClick();
                  setSelectedWorldId(d.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedWorldId === d.id
                    ? 'bg-[#F5C66B] text-slate-950 shadow-sm'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <span>{d.name}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                  selectedWorldId === d.id ? 'bg-black/20 text-slate-900' : isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-slate-400'
                }`}>
                  {countInWorld}/10
                </span>
                {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400 fill-emerald-400/20" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Passport Stamp Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredLandmarks.map(item => {
          return (
            <div
              key={item.levelId}
              onClick={() => {
                if (item.isCollected) {
                  audio.playClick();
                  setSelectedStamp({
                    levelId: item.levelId,
                    destinationId: item.destination.id,
                    landmark: item.landmarkName,
                    country: item.country,
                    stampedAt: item.stampedAt || 'Completed',
                    fact: item.fact,
                    imageUrl: item.imageUrl
                  });
                } else if (onSelectLevelToPlay) {
                  audio.playClick();
                  const lvlIdx = item.destination.levels.findIndex(l => l.id === item.levelId);
                  onSelectLevelToPlay(item.destination, lvlIdx !== -1 ? lvlIdx : 0);
                }
              }}
              className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                item.isCollected
                  ? 'bg-gradient-to-b from-[#18343B] to-[#101827] border-[#F5C66B]/50 hover:border-[#F5C66B] shadow-lg hover:shadow-2xl hover:scale-[1.02]'
                  : 'bg-white/5 border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Landmark Image or Embossed Silhouette */}
              <div className="relative h-36 w-full overflow-hidden bg-black/40">
                {item.isCollected ? (
                  <>
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.landmarkName}
                      fallbackDestinationId={item.destination.id}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Official Ink Stamp watermark */}
                    <div className="absolute top-2 right-2 border-2 border-[#F5C66B] text-[#F5C66B] font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-md rotate-[-8deg] shadow-lg backdrop-blur-xs bg-black/40 z-20 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>OFFICIAL STAMP</span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-2">
                      <Lock className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Level {item.levelNumber} Unstamped
                    </span>
                  </div>
                )}
              </div>

              {/* Card Footer Info */}
              <div className="p-3.5 space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#35D6B0] font-bold">
                  {item.destination.name} · Level {item.levelNumber}
                </div>
                <h3 className="font-bold text-sm text-white font-['Outfit'] truncate">
                  {item.landmarkName}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                  {item.fact}
                </p>
                {item.isCollected && (
                  <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-[#F5C66B]">
                    <span>Stamped</span>
                    <span className="text-slate-400">{item.stampedAt}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Stamp Detail Modal */}
      {selectedStamp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#153C43] border border-[#F5C66B]/50 rounded-3xl p-6 text-left shadow-2xl overflow-hidden">
            <button
              onClick={() => {
                audio.playClick();
                setSelectedStamp(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-30"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F5C66B] mb-2">
              <Award className="w-4 h-4" />
              <span>Travel Passport Collector's Edition</span>
            </div>

            <h2 className="text-2xl font-black font-['Outfit'] text-white mb-1">
              {selectedStamp.landmark}
            </h2>
            <div className="text-xs font-mono text-[#35D6B0] mb-4">
              Region: {selectedStamp.country} · Verified Explorer Stamp
            </div>

            {selectedStamp.imageUrl && (
              <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10 mb-4 shadow-lg">
                <ImageWithFallback
                  src={selectedStamp.imageUrl}
                  alt={selectedStamp.landmark}
                  fallbackDestinationId={selectedStamp.destinationId}
                  priority={true}
                />
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 text-xs text-slate-200 leading-relaxed mb-5">
              <span className="font-bold text-[#F5C66B] mr-1">Discovery Note:</span>
              {selectedStamp.fact}
            </div>

            <button
              onClick={() => {
                audio.playClick();
                setSelectedStamp(null);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F5C66B] text-slate-950 font-bold text-sm tracking-wide hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
