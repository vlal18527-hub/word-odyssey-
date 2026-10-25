import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GameSaveData } from '../types/game';
const KEY = 'WORD_ODYSSEY_PRO_SAVE_NATIVE_V1';
const DEFAULT_SAVE: GameSaveData = {
 version:3, stats:{totalWordsFound:0,levelsCompleted:0,starsEarned:0,coins:300,xp:0,playerLevel:1,streakDays:1,longestStreak:1,lastActiveDate:new Date().toISOString().slice(0,10),bestBlitzScore:0,endlessStreak:0,bossesDefeated:0,dailyChallengesCompleted:0,hintsUsed:0,powerUpsUsed:0,totalTimePlayedSeconds:0,bonusWordsDiscovered:0,perfectGamesCount:0},
 completedLevels:{}, powerUps:{letterReveals:3,directionArrows:2,wordReveals:1,freezeTime:2,shuffle:2,doubleCoins:1,streakShields:1}, achievements:{}, dailyHistory:{}, missions:[], lastMissionRefresh:new Date().toISOString().slice(0,10),
 preferences:{themeId:'midnight-aurora',tileStyle:'rounded',letterSize:'medium',highContrast:false,reducedMotion:false,masterVolume:1,soundVolume:0.8,musicVolume:0.5,soundMuted:false,hapticFeedback:true,vocabAutoPopup:false,selectionGlow:true,selectedDifficulty:'medium'},
 unlockedDestinations:['india'],passportStamps:{},savedVocabulary:[]
};
export async function loadSave(): Promise<GameSaveData> {
 try { const raw=await AsyncStorage.getItem(KEY); if(!raw)return DEFAULT_SAVE; const p=JSON.parse(raw) as Partial<GameSaveData>; if(!p||typeof p!=='object'||!p.stats||!p.powerUps)return DEFAULT_SAVE; return {...DEFAULT_SAVE,...p,stats:{...DEFAULT_SAVE.stats,...p.stats},powerUps:{...DEFAULT_SAVE.powerUps,...p.powerUps},preferences:{...DEFAULT_SAVE.preferences,...p.preferences},completedLevels:p.completedLevels||{},achievements:p.achievements||{},dailyHistory:p.dailyHistory||{},missions:p.missions||[],unlockedDestinations:p.unlockedDestinations||['india'],passportStamps:p.passportStamps||{},savedVocabulary:p.savedVocabulary||[]}; }
 catch(e){console.warn('Save recovery: using safe defaults',e);return DEFAULT_SAVE;}
}
export async function saveSave(data:GameSaveData):Promise<void>{await AsyncStorage.setItem(KEY,JSON.stringify(data));}
