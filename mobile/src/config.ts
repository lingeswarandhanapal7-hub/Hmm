import { Platform } from 'react-native';

export const CONFIG = {
  // 10.0.2.2 points to host machine from Android emulator
  // On real device, replace with your LAN IP e.g. 'http://192.168.1.100:5000'
  BACKEND_BASE_URL: Platform.select({
    android: 'http://10.0.2.2:5000',
    ios: 'http://localhost:5000',
    default: 'http://localhost:5000',
  }),

  // Django alternative if running Django backend
  DJANGO_BACKEND_URL: Platform.select({
    android: 'http://10.0.2.2:8000',
    ios: 'http://localhost:8000',
    default: 'http://localhost:8000',
  }),

  PROCESS_ENDPOINT: '/api/process-document',
  REQUEST_TIMEOUT_MS: 30000,

  // App branding info
  APP_NAME: 'Hmm',
  TAGLINE: 'Civilian-grade clarity for bureaucratic paper.',
  AUTHOR: 'Linges.D.Waran',
  GITHUB_URL: 'https://github.com/lingeswarandhanapal7-hub/Hmm',
};
