# Word Odyssey Pro — React Native + Expo migration

This project contains an Android-first Expo-native implementation scaffold and the complete original website source in `original-web-source/` for parity/reference. The word-search engine, level/destination data, themes, dictionary, achievement data, level image metadata, and game types are carried into `src/` unchanged where possible.

## Important status / honest limitations

- This is a first native migration pass, not a verified production release. The native UI currently implements Home, Worlds, playable word-search levels, Stats, Settings/theme selection, local save persistence, share actions, and an optional rewarded hint-ad flow.
- The original website has more feature-rich modes/modals (Boss Trials, full Passport, Missions, Vocabulary Coach, complete power-up economy, and other web screens). Their source is preserved under `original-web-source/`, but they have **not all been ported to native UI yet**. Do not claim full feature parity until those are migrated and tested.
- The original web save uses browser `localStorage`; native storage starts a separate AsyncStorage save key. A cross-device or web-to-native save migration needs an explicit import/export pathway.
- Ads use Google's test rewarded unit while `__DEV__` is true. The production fallback also remains the test unit until you configure your own production unit ID; replace it before release and verify the release artifact.
- No Android/iOS build has been executed in this environment. Install dependencies and run the QA checklist below on a real development machine.

## Requirements

- Node.js LTS compatible with Expo SDK 54
- npm
- Expo account and EAS CLI for cloud builds
- Android Studio for local Android builds (optional if using EAS)
- AdMob account for production advertising

## Windows setup

```powershell
cd path\to\word-odyssey-expo-native
npm install
npx expo-doctor
npx expo start
```

Native AdMob is not supported in standard Expo Go. Build a development client:

```powershell
npx eas-cli@latest login
npx eas-cli@latest build:configure
npx eas-cli@latest build --platform android --profile development
```

Install the generated development APK on your Android phone, then start Metro with `npx expo start --dev-client`.

## AdMob setup

1. Create the Android app in AdMob and create a Rewarded ad unit.
2. Copy your **App ID** and **Rewarded unit ID** into environment values. App ID has `~`; ad-unit ID has `/`.
3. Set `ADMOB_ANDROID_APP_ID` in the EAS environment used for the build. The plugin needs the App ID at build time.
4. Set `EXPO_PUBLIC_ADMOB_ANDROID_REWARDED_ID` to your real rewarded ad unit ID for production builds. Keep Google test IDs for development.
5. Rebuild the native app after changing plugin configuration; JS reload alone is insufficient.
6. Add an appropriate consent flow and privacy policy before production. Configure Google UMP/consent requirements for the regions where you distribute the app. Review Families policy if children may use the game.
7. Never click your own live ads. Test using Google's test ads only.

`.env.example` is illustrative; EAS environment configuration should be set in the EAS dashboard/CLI and not committed with real values.

## Build commands

```powershell
# Development client
npx eas-cli@latest build --platform android --profile development

# Internal preview APK (set android.buildType to apk in eas.json if your EAS profile requires an APK)
npx eas-cli@latest build --platform android --profile preview

# Google Play production AAB
npx eas-cli@latest build --platform android --profile production
```

Before release, replace `com.replacecompany.wordodyssey` with a unique package ID you control in `app.config.ts`. Set real app icons/splash art and the real AdMob App ID/unit ID. Keep package IDs stable after first Play Store release.

## QA checklist

- [ ] `npm install` completes without dependency conflicts
- [ ] `npx expo-doctor` passes or all warnings are understood
- [ ] `npx tsc --noEmit` passes
- [ ] Run original engine tests in the original web project environment
- [ ] Build and install Android development client
- [ ] Verify first/last cell selection in horizontal, vertical, diagonal, and reverse directions
- [ ] Verify invalid selection leaves the board unchanged
- [ ] Verify level completion awards once only
- [ ] Verify save survives app restart and corrupted save recovery
- [ ] Verify rewarded ad loading, close-without-reward, earned reward, unavailable ad, and airplane mode
- [ ] Verify test ad IDs are not used in production configuration
- [ ] Test 320px-wide device, larger phone, tablet, Android back, background/foreground
- [ ] Implement and test consent/privacy disclosures, analytics consent, and store policies
- [ ] Port remaining original web screens before claiming feature parity

## User acquisition suggestions

Start with organic Play Store optimization: clear title/subtitle, high-quality screenshots, short gameplay video, daily challenge, shareable completion card, and real user feedback. Do not buy fake installs/reviews or spam invitations. Analytics should be privacy-aware and configured only after disclosure/consent where required.
