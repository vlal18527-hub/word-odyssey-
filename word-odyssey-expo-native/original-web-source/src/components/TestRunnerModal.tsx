import React, { useState, useEffect } from 'react';
import { runWordSearchTests, TestResult } from '../engine/wordSearch.test';
import { ShieldCheck, CheckCircle2, XCircle, RotateCcw, X, Clock } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  onClose: () => void;
}

export const TestRunnerModal: React.FC<Props> = ({ onClose }) => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const executeTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = runWordSearchTests();
      setResults(res);
      setIsRunning(false);
      audio.playBonusWord();
    }, 150);
  };

  useEffect(() => {
    executeTests();
  }, []);

  const totalPassed = results.filter(r => r.passed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#153C43] border border-white/10 rounded-3xl p-6 text-left shadow-2xl max-h-[90vh] flex flex-col">
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

        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black font-['Outfit'] text-white">
              Engine QA Test Suite
            </h2>
            <p className="text-xs text-slate-400">
              Automated tests for 8 directions, reverse selection, solvability, and boundaries.
            </p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-4 p-3 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between">
          <div className="text-xs font-mono">
            <span className="text-slate-400">Status: </span>
            <span className={totalPassed === results.length && results.length > 0 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
              {results.length > 0 ? `${totalPassed}/${results.length} PASSED` : 'Running tests...'}
            </span>
          </div>

          <button
            onClick={() => {
              audio.playClick();
              executeTests();
            }}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 disabled:opacity-50 cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>Re-run Tests</span>
          </button>
        </div>

        {/* Results List */}
        <div className="mt-4 space-y-2.5 overflow-y-auto pr-1 flex-1">
          {results.map((res, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border flex items-start gap-3 ${
                res.passed
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-rose-950/20 border-rose-500/30'
              }`}
            >
              {res.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white font-['Outfit']">
                    {res.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {res.durationMs}ms
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-normal">
                  {res.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
