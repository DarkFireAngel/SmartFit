import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.angelo.smartfit',
  appName: 'SmartFit',
  webDir: 'dist/smart-fit',
  server: {
    androidScheme: 'https'
  }
};

export default config;
