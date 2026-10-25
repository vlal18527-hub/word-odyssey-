import type { ExpoConfig } from 'expo/config';

const isProduction = process.env.APP_ENV === 'production';
const androidAdMobAppId = process.env.ADMOB_ANDROID_APP_ID || (isProduction ? '' : 'ca-app-pub-3940256099942544~3347511713'); // Google test App ID in development only
const iosAdMobAppId = process.env.ADMOB_IOS_APP_ID || (isProduction ? '' : 'ca-app-pub-3940256099942544~1458002511'); // Google test App ID in development only
if (isProduction && !androidAdMobAppId) throw new Error('Set ADMOB_ANDROID_APP_ID before creating a production build.');

const config: ExpoConfig = {
  name: 'Word Odyssey Pro',
  slug: 'word-odyssey-pro',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'dark',
  scheme: 'wordodyssey',
  ios: { supportsTablet: true, bundleIdentifier: 'com.replacecompany.wordodyssey' },
  android: {
    package: 'com.replacecompany.wordodyssey',
    versionCode: 1,
    adaptiveIcon: { foregroundImage: './assets/adaptive-icon.png', backgroundColor: '#101827' }
  },
  splash: { image: './assets/splash.png', resizeMode: 'contain', backgroundColor: '#101827' },
  plugins: [
    'expo-dev-client',
    'expo-haptics',
    ['react-native-google-mobile-ads', {
      androidAppId: androidAdMobAppId,
      iosAppId: iosAdMobAppId,
      userTrackingUsageDescription: 'This helps us show relevant ads and measure advertising performance.'
    }]
  ],
  extra: { appEnv: isProduction ? 'production' : 'development' }
};
export default config;
