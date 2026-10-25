import React, { useState } from 'react';
import { GameSaveData, WordDefinition } from '../types/game';
import { WORD_DEFINITIONS } from '../data/dictionary';
import { 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Globe, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Search,
  Quote,
  RotateCcw,
  Coins
} from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  saveData: GameSaveData;
  onUpdateSave: (next: GameSaveData) => void;
  onBack: () => void;
}

export const VocabCoachScreen: React.FC<Props> = ({
  saveData,
  onUpdateSave,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'book' | 'quiz'>('book');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Quiz state
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Saved vocabulary
  const savedWords = saveData.savedVocabulary || [];

  // All available dictionary terms
  const allTerms = React.useMemo(() => Object.keys(WORD_DEFINITIONS), []);

  const filteredTerms = allTerms.filter(wordKey => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const def = WORD_DEFINITIONS[wordKey];
      return (
        wordKey.toLowerCase().includes(q) ||
        def.definition.toLowerCase().includes(q) ||
        (def.hindiMeaning && def.hindiMeaning.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const toggleBookmark = (word: string) => {
    audio.playClick();
    const upper = word.toUpperCase();
    const isCurrentlySaved = savedWords.includes(upper);
    const updated = isCurrentlySaved 
      ? savedWords.filter(w => w !== upper)
      : [...savedWords, upper];

    const next: GameSaveData = {
      ...saveData,
      savedVocabulary: updated
    };
    onUpdateSave(next);
  };

  const speakWord = (word: string) => {
    audio.playClick();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word.toLowerCase());
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      } catch {}
    } else {
      audio.playTileSelect(3);
    }
  };

  // Generate 3 questions for revision quiz
  const quizQuestions = React.useMemo(() => {
    const questions: Array<{
      word: string;
      correctDefinition: string;
      options: string[];
      correctIndex: number;
    }> = [];

    const keys = allTerms.slice(0, 15);
    for (let i = 0; i < 3; i++) {
      const targetWord = keys[(i * 3 + 1) % keys.length];
      const correctDef = WORD_DEFINITIONS[targetWord].definition;
      
      const wrongWord1 = keys[(i * 3 + 2) % keys.length];
      const wrongWord2 = keys[(i * 3 + 4) % keys.length];
      const wrongDef1 = WORD_DEFINITIONS[wrongWord1].definition;
      const wrongDef2 = WORD_DEFINITIONS[wrongWord2].definition;

      const options = [correctDef, wrongDef1, wrongDef2];
      // Deterministic shuffle
      const correctIndex = i % 3;
      if (correctIndex !== 0) {
        const tmp = options[0];
        options[0] = options[correctIndex];
        options[correctIndex] = tmp;
      }

      questions.push({
        word: targetWord,
        correctDefinition: correctDef,
        options,
        correctIndex
      });
    }

    return questions;
  }, [allTerms]);

  const handleSelectQuizAnswer = (optionIndex: number) => {
    if (selectedAnswerIndex !== null) return;
    setSelectedAnswerIndex(optionIndex);

    const q = quizQuestions[quizQuestionIndex];
    const isCorrect = optionIndex === q.correctIndex;

    if (isCorrect) {
      audio.playBonusWord();
      setQuizScore(prev => prev + 1);
    } else {
      audio.playInvalid();
    }

    setTimeout(() => {
      if (quizQuestionIndex < quizQuestions.length - 1) {
        setQuizQuestionIndex(prev => prev + 1);
        setSelectedAnswerIndex(null);
      } else {
        setQuizCompleted(true);
        // Award rewards
        const earnedCoins = (isCorrect ? quizScore + 1 : quizScore) * 20;
        const earnedXp = (isCorrect ? quizScore + 1 : quizScore) * 50;

        if (earnedCoins > 0) {
          const next: GameSaveData = {
            ...saveData,
            stats: {
              ...saveData.stats,
              coins: saveData.stats.coins + earnedCoins,
              xp: saveData.stats.xp + earnedXp
            }
          };
          onUpdateSave(next);
        }
      }
    }, 1200);
  };

  const restartQuiz = () => {
    setQuizQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
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

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#35D6B0]">
            {savedWords.length} Bookmarked Words
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#153C43] to-[#0A1324] border border-[#35D6B0]/30 p-6 md:p-8 shadow-2xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#35D6B0] mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Word Learning Coach & Lexicon</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black font-['Outfit'] text-white">
          Vocabulary Coach
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-xl">
          Expand your global vocabulary with authentic definitions, phonetics, Hindi translations for Indian landmarks, and spaced repetition quizzes.
        </p>

        {/* Tab switcher */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => {
              audio.playClick();
              setActiveTab('book');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'book'
                ? 'bg-[#35D6B0] text-slate-950 shadow-sm'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            Personal Vocabulary Book ({allTerms.length} Words)
          </button>

          <button
            onClick={() => {
              audio.playClick();
              setActiveTab('quiz');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-[#F5C66B] text-slate-950 shadow-sm'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spaced Repetition Quiz</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Vocabulary Book */}
      {activeTab === 'book' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search words, definitions, or Hindi translations..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#35D6B0]"
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map(key => {
              const info = WORD_DEFINITIONS[key];
              const isBookmarked = savedWords.includes(key);

              return (
                <div
                  key={key}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#35D6B0]/40 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-xl font-black font-['Outfit'] text-white">
                          {info.word}
                        </h3>
                        {info.phonetic && (
                          <span className="text-xs font-mono text-slate-400">{info.phonetic}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakWord(info.word)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#35D6B0] transition-colors cursor-pointer"
                          title="Listen to pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => toggleBookmark(info.word)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isBookmarked ? 'text-[#F5C66B] bg-[#F5C66B]/20' : 'text-slate-400 hover:text-white bg-white/5'
                          }`}
                          title={isBookmarked ? 'Bookmarked' : 'Add to Book'}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 my-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono italic bg-white/10 text-[#F5C66B]">
                        {info.partOfSpeech}
                      </span>
                      {info.hindiMeaning && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-sans">
                          {info.hindiMeaning}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      {info.definition}
                    </p>

                    {info.exampleSentence && (
                      <p className="text-[11px] text-slate-400 italic mt-2 border-l-2 border-[#35D6B0]/40 pl-2">
                        "{info.exampleSentence}"
                      </p>
                    )}
                  </div>

                  {info.funFact && (
                    <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 text-[11px] text-slate-300">
                      <span className="font-bold text-[#F5C66B] mr-1">Trivia:</span>
                      {info.funFact}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Spaced Repetition Quiz */}
      {activeTab === 'quiz' && (
        <div className="max-w-xl mx-auto p-6 rounded-3xl bg-[#153C43] border border-[#F5C66B]/30 shadow-2xl">
          {!quizCompleted ? (
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pb-2 border-b border-white/10">
                <span>Question {quizQuestionIndex + 1} of {quizQuestions.length}</span>
                <span>Score: {quizScore}</span>
              </div>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F5C66B] block mb-1">
                  What is the meaning of:
                </span>
                <h3 className="text-3xl font-black font-['Outfit'] text-white">
                  {quizQuestions[quizQuestionIndex].word}
                </h3>
              </div>

              <div className="space-y-3">
                {quizQuestions[quizQuestionIndex].options.map((option, idx) => {
                  const isSelected = selectedAnswerIndex === idx;
                  const isCorrect = idx === quizQuestions[quizQuestionIndex].correctIndex;
                  const showResult = selectedAnswerIndex !== null;

                  let btnStyle = 'bg-white/5 border-white/10 hover:border-white/30 text-slate-200';
                  if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizAnswer(idx)}
                      disabled={showResult}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed flex-1">{option}</span>
                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5C66B]/20 text-[#F5C66B] flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black font-['Outfit'] text-white">
                Quiz Session Complete!
              </h3>
              <p className="text-sm text-slate-300">
                You scored <span className="font-bold text-[#F5C66B]">{quizScore} / {quizQuestions.length}</span> correct.
              </p>

              {quizScore > 0 && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F5C66B]/20 border border-[#F5C66B]/40 text-xs font-mono text-[#F5C66B]">
                  <Coins className="w-4 h-4" />
                  <span>+{quizScore * 20} Coins & +{quizScore * 50} XP Awarded!</span>
                </div>
              )}

              <div className="pt-4 flex gap-3 justify-center">
                <button
                  onClick={restartQuiz}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Practice Again</span>
                </button>
                <button
                  onClick={() => setActiveTab('book')}
                  className="px-4 py-2 rounded-xl bg-[#35D6B0] text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Return to Lexicon
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
