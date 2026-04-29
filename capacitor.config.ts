import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.haiderai.app",
  appName: "haider-AI",
  webDir: "public", // Required by Next.js setup, though we override it with server url
  server: {
    // IMPORTANT: Change this to your live Vercel URL
    url: "https://puterchatai.vercel.app",
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#050510",
      showSpinner: false,
    },
  },
};

export default config;
