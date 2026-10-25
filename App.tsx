import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import mobileAds, { AdEventType, RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { DESTINATIONS } from './original/src/data/destinations';
import { WordSearchEngine } from './original/src/engine/wordSearch';
import type { BoardData, CellCoord, LevelConfig } from './original/src/types/game';

const SAVE_KEY = 'word-odyssey-native-save-v1';
const REWARDED_ID = __DEV__ ? TestIds.REWARDED : (process.env.EXPO_PUBLIC_ADMOB_REWARDED_ID || 'REPLACE_WITH_PRODUCTION_REWARDED_UNIT_ID');
const COIN_HINT_COST = 20;
type SaveData = { coins: number; xp: number; completed: string[]; foundWords: number; hintsUsed: number; onboardingSeen: boolean };
const DEFAULT_SAVE: SaveData = { coins: 100, xp: 0, completed: [], foundWords: 0, hintsUsed: 0, onboardingSeen: false };
const firstLevel: LevelConfig = DESTINATIONS[0]?.levels?.[0] ?? { id: 'fallback-1', levelNumber: 1, destinationId: 'starter', title: 'First Steps', description: 'Find the hidden words', gridSize: 8, words: ['WORD', 'GAME', 'PLAY', 'HINT'] };

function sameCoord(a: CellCoord, b: CellCoord) { return a.r === b.r && a.c === b.c; }
function isSamePath(a: CellCoord, b: CellCoord, wordPath: CellCoord[]) {
  if (!wordPath.length) return false;
  return (sameCoord(a, wordPath[0]) && sameCoord(b, wordPath[wordPath.length - 1])) || (sameCoord(b, wordPath[0]) && sameCoord(a, wordPath[wordPath.length - 1]));
}

function AppContent() {
  const [save, setSave] = useState<SaveData>(DEFAULT_SAVE);
  const [loadedSave, setLoadedSave] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const levels = useMemo(() => DESTINATIONS.flatMap(d => d.levels), []);
  const level = levels[levelIndex] ?? firstLevel;
  const [board, setBoard] = useState<BoardData>(() => WordSearchEngine.generateBoard({ size: firstLevel.gridSize || 9, words: firstLevel.words }));
  const [firstCell, setFirstCell] = useState<CellCoord | null>(null);
  const [hintWord, setHintWord] = useState<string | null>(null);
  const [hintPrompt, setHintPrompt] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const rewardedRef = useRef<RewardedAd | null>(null);
  const saveRef = useRef<SaveData>(DEFAULT_SAVE);
  const boardRef = useRef<BoardData>(board);
  useEffect(() => { saveRef.current = save; }, [save]);
  useEffect(() => { boardRef.current = board; }, [board]);
  const [screen, setScreen] = useState<'home' | 'game' | 'progress'>('home');
  const [levelComplete, setLevelComplete] = useState(false);

  const saveProgress = useCallback(async (next: SaveData) => {
    setSave(next);
    try { await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(next)); } catch { Alert.alert('Save issue', 'Progress could not be saved right now. Please check your device storage.'); }
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SAVE_KEY);
        if (raw && alive) {
          const parsed = JSON.parse(raw) as Partial<SaveData>;
          setSave({ ...DEFAULT_SAVE, ...parsed, completed: Array.isArray(parsed.completed) ? parsed.completed : [] });
        }
      } catch {
        // Recover safely from a corrupt save without crashing the game.
        try { await AsyncStorage.removeItem(SAVE_KEY); } catch { /* ignore storage recovery failure */ }
      } finally { if (alive) setLoadedSave(true); }
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    let unsubscribeLoaded = () => { };
    let unsubscribeEarned = () => { };
    let unsubscribeClosed = () => { };
    let unsubscribeError = () => { };
    try {
      mobileAds().initialize().catch(() => undefined);
      const ad = RewardedAd.createForAdRequest(REWARDED_ID, { requestNonPersonalizedAdsOnly: true });
      rewardedRef.current = ad;
      unsubscribeLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => setAdLoaded(true));
      unsubscribeEarned = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
        setAdLoaded(false);
        setHintPrompt(false);
        const currentSave = saveRef.current;
        const next = { ...currentSave, hintsUsed: currentSave.hintsUsed + 1 };
        saveRef.current = next;
        setSave(next);
        void AsyncStorage.setItem(SAVE_KEY, JSON.stringify(next)).catch(() => undefined);
        const nextHint = boardRef.current.words.find(w => !w.found)?.word;
        if (nextHint) setHintWord(nextHint);
      });
      unsubscribeClosed = ad.addAdEventListener(AdEventType.CLOSED, () => { setAdLoaded(false); try { ad.load(); } catch { /* retry next time */ } });
      unsubscribeError = ad.addAdEventListener(AdEventType.ERROR, () => setAdLoaded(false));
      ad.load();
    } catch { setAdLoaded(false); }
    return () => { unsubscribeLoaded(); unsubscribeEarned(); unsubscribeClosed(); unsubscribeError(); };
    // Ad instance is intentionally initialized once; reward handler uses current state via button callback below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startLevel = useCallback((idx: number) => {
    const selected = levels[idx] ?? firstLevel;
    setLevelIndex(idx);
    setBoard(WordSearchEngine.generateBoard({ size: selected.gridSize || 9, words: selected.words, allowedDirections: selected.allowedDirections }));
    setFirstCell(null); setHintWord(null); setLevelComplete(false); setScreen('game');
  }, [levels]);

  const revealHint = useCallback(() => {
    const word = board.words.find(w => !w.found)?.word;
    if (!word) return;
    setHintWord(word);
    // The hint identifies a word but does not mark it found; the player still solves it.
  }, [board]);

  const onCellPress = (cell: CellCoord) => {
    if (!firstCell) { setFirstCell(cell); return; }
    if (sameCoord(firstCell, cell)) { setFirstCell(null); return; }
    const target = board.words.find(w => !w.found && isSamePath(firstCell, cell, w.path));
    setFirstCell(null);
    if (!target) return;
    const nextBoard: BoardData = { ...board, words: board.words.map(w => w.word === target.word ? { ...w, found: true } : w) };
    setBoard(nextBoard);
    const allFound = nextBoard.words.every(w => w.found);
    const nextSave = { ...save, coins: save.coins + Math.max(2, target.word.length), xp: save.xp + target.word.length, foundWords: save.foundWords + 1 };
    if (allFound) {
      nextSave.coins += 25;
      nextSave.completed = Array.from(new Set([...save.completed, level.id]));
      setLevelComplete(true);
    }
    void saveProgress(nextSave);
  };

  const useCoinsForHint = () => {
    if (save.coins < COIN_HINT_COST) { Alert.alert('Not enough coins', 'Find words to earn coins, or try again when a rewarded ad is available.'); return; }
    void saveProgress({ ...save, coins: save.coins - COIN_HINT_COST, hintsUsed: save.hintsUsed + 1 });
    setHintPrompt(false); revealHint();
  };
  const watchAd = () => {
    if (!adLoaded || !rewardedRef.current) { Alert.alert('Ad not ready', 'A rewarded ad is not available right now. You can use coins or continue playing.'); return; }
    try { rewardedRef.current.show(); setHintPrompt(false); } catch { Alert.alert('Ad unavailable', 'Please try again in a moment.'); }
  };

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen !== 'home') { setScreen('home'); return true; }
      return false;
    });
    return () => sub.remove();
  }, [screen]);

  if (!loadedSave) {
  return (
    <View style={styles.loading}>
      <Text style={styles.brand}>WORD ODYSSEY</Text>
      <Text style={styles.muted}>Preparing your adventure…</Text>
    </View>
  );
}

  const totalLevels = Math.max(levels.length, 100);
  const startRandom = () => startLevel(Math.floor(Math.random() * Math.max(1, levels.length)));
  return <SafeAreaView style={styles.safe}>
    <StatusBar style="light" />
    <View style={styles.topbar}>
      <View><Text style={styles.brand}>WORD ODYSSEY</Text><Text style={styles.brandSub}>PRO • WORD SEARCH ADVENTURE</Text></View>
      <View style={styles.coinPill}><Text style={styles.coinIcon}>✦</Text><Text style={styles.coinText}>{save.coins}</Text></View>
    </View>
    {screen === 'home' && <ScrollView contentContainerStyle={styles.home}>
      <View style={styles.hero}><Text style={styles.eyebrow}>YOUR NEXT ADVENTURE</Text><Text style={styles.heroTitle}>Find words.{"\n"}Discover the world.</Text><Text style={styles.heroCopy}>Explore beautiful destinations, solve puzzles and build your vocabulary.</Text><Pressable style={styles.primaryButton} onPress={() => startLevel(Math.min(save.completed.length, Math.max(0, levels.length - 1)))}><Text style={styles.primaryButtonText}>▶  CONTINUE ADVENTURE</Text></Pressable></View>
      <View style={styles.statRow}><Stat label="LEVELS CLEARED" value={String(save.completed.length)} /><Stat label="TOTAL XP" value={String(save.xp)} /><Stat label="WORDS FOUND" value={String(save.foundWords)} /></View>
      <Text style={styles.sectionTitle}>CHOOSE YOUR ADVENTURE</Text>
      <Pressable style={styles.modeCard} onPress={() => startLevel(0)}><Text style={styles.modeEmoji}>🧭</Text><View style={styles.modeText}><Text style={styles.modeTitle}>Adventure Mode</Text><Text style={styles.muted}>Travel through destinations and unlock levels.</Text></View><Text style={styles.chevron}>›</Text></Pressable>
      <Pressable style={styles.modeCard} onPress={startRandom}><Text style={styles.modeEmoji}>⚡</Text><View style={styles.modeText}><Text style={styles.modeTitle}>Quick Puzzle</Text><Text style={styles.muted}>Jump into a randomly selected level.</Text></View><Text style={styles.chevron}>›</Text></Pressable>
      <Pressable style={styles.modeCard} onPress={() => setScreen('progress')}><Text style={styles.modeEmoji}>🏆</Text><View style={styles.modeText}><Text style={styles.modeTitle}>Your Progress</Text><Text style={styles.muted}>View saved progress and achievements.</Text></View><Text style={styles.chevron}>›</Text></Pressable>
      <Text style={styles.footerNote}>Offline-friendly gameplay • Optional rewarded hints</Text>
    </ScrollView>}
    {screen === 'progress' && <ScrollView contentContainerStyle={styles.page}><Pressable onPress={() => setScreen('home')}><Text style={styles.back}>‹  BACK</Text></Pressable><Text style={styles.pageTitle}>Your Progress</Text><Text style={styles.muted}>Your progress is saved on this device.</Text><View style={styles.statRow}><Stat label="COMPLETED" value={String(save.completed.length)} /><Stat label="XP EARNED" value={String(save.xp)} /></View><View style={styles.progressCard}><Text style={styles.modeTitle}>Hints used</Text><Text style={styles.bigNumber}>{save.hintsUsed}</Text><Text style={styles.muted}>Watch an optional rewarded ad or spend {COIN_HINT_COST} coins when you need help.</Text></View><Pressable style={styles.secondaryButton} onPress={() => Alert.alert('Privacy', 'Before publishing, add your public privacy-policy URL and complete the applicable Google UMP consent flow for your audience and region.')}><Text style={styles.secondaryButtonText}>Privacy & ad settings</Text></Pressable></ScrollView>}
    {screen === 'game' && <ScrollView contentContainerStyle={styles.gamePage}>
      <View style={styles.gameNav}><Pressable onPress={() => setScreen('home')}><Text style={styles.back}>‹  EXIT</Text></Pressable><Text style={styles.levelBadge}>LEVEL {level.levelNumber || levelIndex + 1}</Text></View>
      <Text style={styles.pageTitle}>{level.title || 'Word Search'}</Text><Text style={styles.muted}>{level.description || 'Find every hidden word in the grid.'}</Text>
      <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${board.words.length ? (board.words.filter(w => w.found).length / board.words.length) * 100 : 0}%` }]} /></View>
      <View style={styles.board}>{board.grid.map((row, r) => <View key={`r-${r}`} style={styles.gridRow}>{row.map((letter, c) => {
        const coord = { r, c };
        const selected = firstCell ? sameCoord(firstCell, coord) : false;
        const found = board.words.some(w => w.found && w.path.some(p => sameCoord(p, coord)));
        const hinted = hintWord ? board.words.find(w => w.word === hintWord)?.path.some(p => sameCoord(p, coord)) : false;
        return <Pressable key={`${r}-${c}`} onPress={() => onCellPress(coord)} style={[styles.cell, selected && styles.cellSelected, found && styles.cellFound, hinted && styles.cellHint]}><Text style={[styles.cellText, found && styles.cellTextFound]}>{letter}</Text></Pressable>;
      })}</View>)}</View>
      <View style={styles.hintRow}><Text style={styles.sectionTitle}>WORDS TO FIND</Text><Pressable style={styles.hintButton} onPress={() => setHintPrompt(true)}><Text style={styles.hintButtonText}>💡 HINT</Text></Pressable></View>
      <View style={styles.wordList}>{board.words.map(w => <View key={w.word} style={[styles.wordChip, w.found && styles.wordChipFound]}><Text style={[styles.wordText, w.found && styles.wordTextFound]}>{w.found ? '✓ ' : ''}{w.word}</Text></View>)}</View>
      {hintWord && <View style={styles.hintNotice}><Text style={styles.hintNoticeText}>Hint: look for {hintWord}. Highlighted cells show its path.</Text><Pressable onPress={() => setHintWord(null)}><Text style={styles.dismiss}>Dismiss</Text></Pressable></View>}
      <Text style={styles.instruction}>Tap the first and last letters of a hidden word. Words can run in any straight direction.</Text>
    </ScrollView>}
    {hintPrompt && <View style={styles.modalOverlay}><View style={styles.modal}><Text style={styles.modalTitle}>Need a hint?</Text><Text style={styles.muted}>Choose a free optional video ad for a hint, or spend {COIN_HINT_COST} coins.</Text><Pressable style={styles.primaryButton} onPress={watchAd}><Text style={styles.primaryButtonText}>▶  WATCH AD FOR HINT</Text></Pressable><Pressable style={styles.secondaryButton} onPress={useCoinsForHint}><Text style={styles.secondaryButtonText}>Use {COIN_HINT_COST} coins</Text></Pressable><Pressable style={styles.cancelButton} onPress={() => setHintPrompt(false)}><Text style={styles.muted}>Maybe later</Text></Pressable></View></View>}
    {levelComplete && <View style={styles.modalOverlay}><View style={styles.modal}><Text style={styles.winEmoji}>🏆</Text><Text style={styles.modalTitle}>Level Complete!</Text><Text style={styles.muted}>Wonderful work! You earned 25 bonus coins.</Text><Pressable style={styles.primaryButton} onPress={() => startLevel(Math.min(levelIndex + 1, Math.max(0, levels.length - 1)))}><Text style={styles.primaryButtonText}>NEXT LEVEL  →</Text></Pressable><Pressable style={styles.secondaryButton} onPress={() => setScreen('home')}><Text style={styles.secondaryButtonText}>Back to home</Text></Pressable></View></View>}
  </SafeAreaView>;
}
function Stat({ label, value }: { label: string; value: string }) { return <View style={styles.stat}><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>; }
export default function App() { return <SafeAreaProvider><AppContent /></SafeAreaProvider>; }

const styles = StyleSheet.create({
  logo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#F5C451',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 12,
  },
  safe: { flex: 1, backgroundColor: '#09111F' }, loading: { flex: 1, backgroundColor: '#09111F', alignItems: 'center', justifyContent: 'center' },
  topbar: { paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#1B2A40', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, brand: { color: '#F4F7FF', fontSize: 16, fontWeight: '900', letterSpacing: 1.7 }, brandSub: { color: '#7F93B3', fontSize: 8, letterSpacing: 1.5, marginTop: 3 }, coinPill: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#18243A', borderWidth: 1, borderColor: '#344663', paddingHorizontal: 13, paddingVertical: 8, borderRadius: 30 }, coinIcon: { color: '#FFD166', fontSize: 16 }, coinText: { color: '#FFE6A1', fontWeight: '800' },
  home: { padding: 20, paddingBottom: 36 }, hero: { padding: 22, borderRadius: 24, backgroundColor: '#132640', borderColor: '#294568', borderWidth: 1, overflow: 'hidden' }, eyebrow: { color: '#7DE3D2', fontWeight: '800', fontSize: 10, letterSpacing: 2 }, heroTitle: { color: '#F5F8FF', fontSize: 32, lineHeight: 38, fontWeight: '900', marginTop: 12 }, heroCopy: { color: '#B1C1D9', fontSize: 14, lineHeight: 21, marginTop: 12, marginBottom: 22 }, primaryButton: { backgroundColor: '#61E2C0', borderRadius: 14, paddingVertical: 15, paddingHorizontal: 16, alignItems: 'center', marginTop: 10 }, primaryButtonText: { color: '#09201E', fontWeight: '900', letterSpacing: .5 }, statRow: { flexDirection: 'row', gap: 8, marginTop: 16, marginBottom: 26 }, stat: { flex: 1, backgroundColor: '#111D30', borderRadius: 14, borderWidth: 1, borderColor: '#243650', paddingVertical: 15, paddingHorizontal: 5, alignItems: 'center' }, statValue: { color: '#F4F7FF', fontSize: 20, fontWeight: '900' }, statLabel: { color: '#8195B4', fontSize: 8, fontWeight: '800', letterSpacing: .7, marginTop: 5, textAlign: 'center' }, sectionTitle: { color: '#8EA3C2', fontSize: 10, fontWeight: '900', letterSpacing: 1.6, marginBottom: 12 }, modeCard: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#101C2E', borderWidth: 1, borderColor: '#253750', borderRadius: 17, marginBottom: 10, gap: 13 }, modeEmoji: { fontSize: 25, width: 38, textAlign: 'center' }, modeText: { flex: 1 }, modeTitle: { color: '#F1F5FD', fontWeight: '800', fontSize: 15, marginBottom: 5 }, muted: { color: '#8EA0BB', fontSize: 12, lineHeight: 18 }, chevron: { color: '#7D94B6', fontSize: 28 }, footerNote: { color: '#657A99', textAlign: 'center', marginTop: 16, fontSize: 11 }, page: { padding: 20 }, back: { color: '#79E0CB', fontWeight: '900', letterSpacing: 1, marginBottom: 18 }, pageTitle: { color: '#F5F7FC', fontSize: 27, fontWeight: '900', marginBottom: 7 }, progressCard: { padding: 18, backgroundColor: '#111D30', borderRadius: 18, borderWidth: 1, borderColor: '#263952', marginBottom: 16 }, bigNumber: { color: '#7DE3D2', fontSize: 34, fontWeight: '900', marginVertical: 8 }, secondaryButton: { borderWidth: 1, borderColor: '#3B536F', borderRadius: 13, padding: 14, alignItems: 'center', marginTop: 10 }, secondaryButtonText: { color: '#DDE8F7', fontWeight: '800' }, gamePage: { padding: 16, paddingBottom: 32 }, gameNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, levelBadge: { color: '#8CE6D2', fontSize: 10, fontWeight: '900', letterSpacing: 1.5, backgroundColor: '#173A3D', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20 }, progressTrack: { height: 5, backgroundColor: '#1D2A3D', borderRadius: 5, overflow: 'hidden', marginTop: 17, marginBottom: 18 }, progressFill: { height: 5, backgroundColor: '#61E2C0' }, board: { width: '100%', aspectRatio: 1, backgroundColor: '#101D30', borderColor: '#2C405B', borderWidth: 1, borderRadius: 15, padding: 5, justifyContent: 'center', marginBottom: 20 }, gridRow: { flex: 1, flexDirection: 'row' }, cell: { flex: 1, margin: 1, borderRadius: 5, backgroundColor: '#1A2B42', alignItems: 'center', justifyContent: 'center' }, cellSelected: { backgroundColor: '#F8C95C' }, cellFound: { backgroundColor: '#1E6A61' }, cellHint: { borderColor: '#FFD166', borderWidth: 1.5 }, cellText: { color: '#D8E4F5', fontWeight: '800', fontSize: 12 }, cellTextFound: { color: '#B8FFEB' }, hintRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, hintButton: { backgroundColor: '#2D2A43', borderColor: '#605487', borderWidth: 1, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12 }, hintButtonText: { color: '#D7C8FF', fontWeight: '900', fontSize: 11 }, wordList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, wordChip: { backgroundColor: '#142238', borderColor: '#2B405D', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 9 }, wordChipFound: { backgroundColor: '#17433F', borderColor: '#2C8B79' }, wordText: { color: '#D4E0F0', fontSize: 11, fontWeight: '800' }, wordTextFound: { color: '#91F4D8', textDecorationLine: 'line-through' }, hintNotice: { backgroundColor: '#2B2940', borderRadius: 12, padding: 12, marginTop: 12 }, hintNoticeText: { color: '#E5DBFF', fontSize: 12 }, dismiss: { color: '#AFA0E7', fontWeight: '800', marginTop: 7 }, instruction: { color: '#7187A7', fontSize: 11, lineHeight: 17, marginTop: 16, textAlign: 'center' }, modalOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(1,5,12,0.78)', alignItems: 'center', justifyContent: 'center', padding: 22, zIndex: 10 }, modal: { width: '100%', maxWidth: 380, backgroundColor: '#132238', borderWidth: 1, borderColor: '#354B69', borderRadius: 24, padding: 22 }, modalTitle: { color: '#F6F8FC', fontSize: 24, fontWeight: '900', marginBottom: 8 }, cancelButton: { alignItems: 'center', padding: 13, marginTop: 5 }, winEmoji: { fontSize: 40, marginBottom: 10 }
});
