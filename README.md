# Word Odyssey Pro — React Native + Expo migration

This project contains an Android-first Expo native app shell, the original source tree under `original/`, and a native puzzle screen that reuses the original word-search engine and destination level data. It is a working migration foundation, **not yet a verified feature-for-feature replacement** for every web modal/mode.

## Requirements
- Node.js LTS
- npm
- Expo/EAS account for cloud builds
- Android Studio for local Android builds (optional when using EAS cloud builds)

## Install on Windows
```powershell
npm install
npx expo-doctor
npm run typecheck
```

## Run with a development build
Native AdMob does not run in standard Expo Go. Configure your identifiers first, then:
```powershell
npx eas-cli@latest login
npx eas-cli@latest build:configure
npx eas-cli@latest build --platform android --profile development
npx expo start --dev-client
```

For a local Android device/emulator with Android Studio configured:
```powershell
npx expo run:android
```

## AdMob setup
1. Create the app in Google AdMob and register the Android package ID.
2. Replace `com.YOURCOMPANY.wordodysseypro` in `app.json` with your unique permanent package ID.
3. Replace the test App IDs in the `react-native-google-mobile-ads` plugin with your own AdMob App IDs.
4. Set `EXPO_PUBLIC_ADMOB_REWARDED_ID` to the production rewarded ad unit ID in your EAS environment, and use a separate development environment for testing. Never click your own live ads.
5. Rebuild the native app after any config-plugin or native dependency change.
6. Before release, implement and verify Google's User Messaging Platform (UMP) consent flow as applicable, publish a privacy policy, complete AdMob app readiness checks, and fill out Google Play Data safety / ads declarations accurately.

The source defaults to Google's official test rewarded unit in development. Production fallback intentionally says `REPLACE_WITH_PRODUCTION_REWARDED_UNIT_ID`, so production ads will not serve until configured.

## Build APK / Play Store AAB
```powershell
npx eas-cli@latest build --platform android --profile preview
npx eas-cli@latest build --platform android --profile production
```

Submit to Play Store only after you test the release build and complete Play Console declarations:
```powershell
npx eas-cli@latest submit --platform android --profile production
```

## Current migration scope
- Preserved original code, data, word-search engine, tests, assets/data, types, and utilities in `original/` for parity work.
- Native screen: home, basic progress, level puzzle grid, endpoint tap selection, hint prompt, rewarded ad event, coin fallback, level-complete flow, AsyncStorage save.
- The current native shell does not yet wire every original website feature (all modals, all game modes, full audio/theme controls, native share card, invite/deep links, analytics/crash reporting, and complete UMP consent UI). Do not market those as completed until implemented and tested.

## QA status
No install, TypeScript check, Android build, or device test is claimed as passed by this delivery. Run the commands above in a network-enabled environment, fix any dependency/type issues, and test on physical Android devices before production. Original engine tests are retained at `original/src/engine/wordSearch.test.ts`; their original runner/dependencies may need to be restored to run them in this migration workspace.
