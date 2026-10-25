import React, { useState } from 'react';
import { PowerUpInventory } from '../types/game';
import { 
  X, 
  Coins, 
  Search, 
  Compass, 
  Sparkles, 
  Snowflake, 
  Shuffle, 
  CircleDollarSign, 
  Shield, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  coins: number;
  powerUps: PowerUpInventory;
  onPurchase: (itemKey: keyof PowerUpInventory, cost: number, amount: number) => void;
  onClose: () => void;
}

interface StoreItem {
  key: keyof PowerUpInventory;
  title: string;
  description: string;
  cost: number;
  amount: number;
  icon: React.ReactNode;
  accentColor: string;
}

export const PowerUpStoreModal: React.FC<Props> = ({
  coins,
  powerUps,
  onPurchase,
  onClose
}) => {
  const [confirmItem, setConfirmItem] = useState<StoreItem | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  const STORE_ITEMS: StoreItem[] = [
    {
      key: 'letterReveals',
      title: 'Magnifying Letter Hint',
      description: 'Pulses the starting letter tile of an undiscovered word.',
      cost: 50,
      amount: 3,
      icon: <Search className="w-5 h-5 text-[#35D6B0]" />,
      accentColor: '#35D6B0'
    },
    {
      key: 'directionArrows',
      title: 'Explorer Compass',
      description: 'Highlights the start cell and points an arrow along the target word path.',
      cost: 80,
      amount: 2,
      icon: <Compass className="w-5 h-5 text-[#F5C66B]" />,
      accentColor: '#F5C66B'
    },
    {
      key: 'wordReveals',
      title: 'Starlight Word Reveal',
      description: 'Instantly discovers and clears one complete hidden word.',
      cost: 120,
      amount: 1,
      icon: <Sparkles className="w-5 h-5 text-[#A99BFF]" />,
      accentColor: '#A99BFF'
    },
    {
      key: 'freezeTime',
      title: 'Chronos Time Freeze',
      description: 'Freezes the countdown clock for 15 seconds during Blitz and Challenge modes.',
      cost: 70,
      amount: 2,
      icon: <Snowflake className="w-5 h-5 text-cyan-400" />,
      accentColor: '#38BDF8'
    },
    {
      key: 'shuffle',
      title: 'Vortex Grid Shuffle',
      description: 'Rearranges remaining unfound words across the board while keeping solution valid.',
      cost: 60,
      amount: 2,
      icon: <Shuffle className="w-5 h-5 text-emerald-400" />,
      accentColor: '#34D399'
    },
    {
      key: 'doubleCoins',
      title: 'Golden Double Bounty',
      description: 'Doubles all coin rewards earned from the current level.',
      cost: 100,
      amount: 1,
      icon: <CircleDollarSign className="w-5 h-5 text-amber-400" />,
      accentColor: '#FBBF24'
    },
    {
      key: 'streakShields',
      title: 'Celestial Streak Aegis',
      description: 'Safeguards your daily active streak if you miss a day.',
      cost: 150,
      amount: 1,
      icon: <Shield className="w-5 h-5 text-indigo-400" />,
      accentColor: '#818CF8'
    }
  ];

  const handleBuy = (item: StoreItem) => {
    if (coins < item.cost) {
      audio.playInvalid();
      return;
    }
    // Expensive purchases require confirmation
    if (item.cost >= 100 && !confirmItem) {
      setConfirmItem(item);
      return;
    }

    onPurchase(item.key, item.cost, item.amount);
    audio.playDoubleCoins();
    setPurchaseSuccess(`Acquired ${item.amount}x ${item.title}!`);
    setConfirmItem(null);
    setTimeout(() => setPurchaseSuccess(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#153C43] border border-white/10 rounded-3xl p-6 text-left shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5C66B]">
              <Coins className="w-4 h-4" />
              <span>Odyssey Explorer Bazaar</span>
            </div>
            <h2 className="text-2xl font-black font-['Outfit'] text-white">
              Power-Up Armory
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 border border-[#F5C66B]/30 text-xs font-bold text-[#F5C66B]">
              <Coins className="w-4 h-4" />
              <span className="font-mono text-sm">{coins}</span>
            </div>

            <button
              onClick={() => {
                audio.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status notification */}
        {purchaseSuccess && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{purchaseSuccess}</span>
          </div>
        )}

        {/* Confirmation dialogue */}
        {confirmItem && (
          <div className="mt-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Confirm purchase of <strong>{confirmItem.title}</strong> for <strong>{confirmItem.cost} Coins</strong>?</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleBuy(confirmItem)}
                className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmItem(null)}
                className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 text-xs hover:bg-white/15 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="mt-4 space-y-2.5 overflow-y-auto pr-1 flex-1">
          {STORE_ITEMS.map(item => {
            const currentOwned = powerUps[item.key] || 0;
            const canAfford = coins >= item.cost;

            return (
              <div
                key={item.key}
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                    style={{ backgroundColor: `${item.accentColor}20` }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white font-['Outfit']">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-black/40 text-slate-300">
                        Owned: {currentOwned}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5 leading-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleBuy(item)}
                  disabled={!canAfford}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shrink-0 ${
                    canAfford
                      ? 'bg-gradient-to-r from-[#F5C66B] to-[#D97706] text-slate-950 hover:brightness-110 active:scale-95 cursor-pointer shadow-md'
                      : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>{item.cost}g · Get {item.amount}x</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
