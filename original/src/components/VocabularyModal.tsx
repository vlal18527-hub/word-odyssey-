import React, { useState } from 'react';
import { WORD_DEFINITIONS } from '../data/dictionary';
import { BookOpen, Sparkles, X, Volume2, Bookmark, BookmarkCheck, Globe, Quote } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  word: string;
  isBookmarked?: boolean;
  onToggleBookmark?: (word: string) => void;
  onClose: () => void;
}

export const VocabularyModal: React.FC<Props> = ({ 
  word, 
  isBookmarked = false, 
  onToggleBookmark, 
  onClose 
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const upper = word.toUpperCase();
  const info = WORD_DEFINITIONS[upper] || {
    word: upper,
    partOfSpeech: 'noun',
    definition: `A distinctive term associated with ancient world heritage, geography, or nature.`,
    funFact: `Discovering new vocabulary through word search strengthens semantic associations and working memory.`,
    exampleSentence: `The traveler explored the ancient landscapes where ${upper.toLowerCase()} shaped early civilizations.`,
    synonyms: ['Landmark', 'Heritage']
  };

  const speakWord = () => {
    audio.playClick();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(info.word.toLowerCase());
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        utterance.onstart = () => setIsPlayingAudio(true);
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } catch {
        setIsPlayingAudio(false);
      }
    } else {
      audio.playTileSelect(3);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#153C43] border border-[#35D6B0]/40 rounded-3xl p-6 text-left shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Top actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#35D6B0]">
            <BookOpen className="w-4 h-4" />
            <span className="uppercase tracking-widest text-[11px]">Word Learning Coach</span>
          </div>

          <div className="flex items-center gap-1.5">
            {onToggleBookmark && (
              <button
                onClick={() => {
                  audio.playClick();
                  onToggleBookmark(info.word);
                }}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#F5C66B]/20 border-[#F5C66B] text-[#F5C66B]'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                }`}
                title={isBookmarked ? 'Saved to Vocabulary Book' : 'Save to Vocabulary Book'}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
            )}

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

        {/* Word, phonetics & Audio button */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div>
            <h2 className="text-3xl font-black font-['Outfit'] tracking-wide text-white">
              {info.word}
            </h2>
            {info.phonetic && (
              <span className="text-xs font-mono text-slate-400">{info.phonetic}</span>
            )}
          </div>

          <button
            onClick={speakWord}
            disabled={isPlayingAudio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#35D6B0]/20 hover:bg-[#35D6B0]/30 border border-[#35D6B0]/40 text-[#35D6B0] text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
            <span>Listen</span>
          </button>
        </div>

        {/* Part of speech tag & Hindi translation */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-white/10 text-[#F5C66B] text-[11px] font-mono italic">
            {info.partOfSpeech}
          </span>

          {info.hindiMeaning && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-medium font-sans">
              <Globe className="w-3 h-3" />
              <span>{info.hindiMeaning}</span>
            </span>
          )}
        </div>

        {/* Definition body */}
        <p className="text-sm text-slate-200 leading-relaxed mb-4">
          {info.definition}
        </p>

        {/* Example Sentence */}
        {info.exampleSentence && (
          <div className="p-3 rounded-2xl bg-black/30 border border-white/10 mb-4 flex gap-2.5 items-start">
            <Quote className="w-3.5 h-3.5 text-[#35D6B0] shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "{info.exampleSentence}"
            </p>
          </div>
        )}

        {/* Synonyms */}
        {info.synonyms && info.synonyms.length > 0 && (
          <div className="mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Synonyms & Relatives:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {info.synonyms.map(syn => (
                <span key={syn} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[11px] font-mono">
                  {syn}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Fun Fact card */}
        {info.funFact && (
          <div className="p-3.5 rounded-2xl bg-[#101827]/80 border border-[#35D6B0]/20 mb-5 flex gap-3 items-start">
            <Sparkles className="w-4 h-4 text-[#F5C66B] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-normal">
              <span className="font-bold text-[#F5C66B] mr-1">Trivia:</span>
              {info.funFact}
            </div>
          </div>
        )}

        <button
          onClick={() => {
            audio.playClick();
            onClose();
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-[#35D6B0] text-slate-950 font-bold text-sm tracking-wide hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
        >
          Continue Playing
        </button>
      </div>
    </div>
  );
};
