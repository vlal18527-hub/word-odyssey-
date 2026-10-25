import { useCallback, useEffect, useRef, useState } from 'react';
import { AdEventType, RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
const rewardedUnitId = __DEV__ ? TestIds.REWARDED : (process.env.EXPO_PUBLIC_ADMOB_ANDROID_REWARDED_ID || '');
export function useRewardedHint(onReward:()=>void){
 const [loaded,setLoaded]=useState(false); const [loading,setLoading]=useState(false); const adRef=useRef<RewardedAd|null>(null); const rewardedRef=useRef(false); const cbRef=useRef(onReward); const cleanupRef=useRef<(()=>void)|null>(null); cbRef.current=onReward;
 const createAndLoad=useCallback(()=>{cleanupRef.current?.(); if(!rewardedUnitId){setLoaded(false);setLoading(false);return ()=>{};} const ad=RewardedAd.createForAdRequest(rewardedUnitId,{requestNonPersonalizedAdsOnly:true});adRef.current=ad;rewardedRef.current=false;setLoaded(false);setLoading(true);
 const a=ad.addAdEventListener(RewardedAdEventType.LOADED,()=>{setLoaded(true);setLoading(false)});
 const b=ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD,()=>{if(!rewardedRef.current){rewardedRef.current=true;cbRef.current()}});
 const c=ad.addAdEventListener(AdEventType.CLOSED,()=>{setLoaded(false);setLoading(false);cleanupRef.current?.();cleanupRef.current=null;createAndLoad()});
 const d=ad.addAdEventListener(AdEventType.ERROR,()=>{setLoaded(false);setLoading(false)});ad.load();const cleanup=()=>{a();b();c();d()};cleanupRef.current=cleanup;return cleanup;},[]);
 useEffect(()=>createAndLoad(),[createAndLoad]);
 const show=useCallback(()=>{if(!loaded||!adRef.current)return false;setLoaded(false);adRef.current.show().catch(()=>{setLoaded(false);setLoading(false)});return true},[loaded]);
 return {loaded,loading,show};
}
