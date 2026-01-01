export default {
  expo: {
    name: "AnimeSync",
    slug: "hellworls",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#0B1020"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.animesync.app",
      infoPlist: {
        UIBackgroundModes: ["fetch", "remote-notification"]
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0B1020"
      },
      package: "com.animesync.app"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-font",
      "expo-secure-store"
    ],
    scheme: "animesync",
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "3d42dd82-1ea8-43ca-a283-a39ee037e963"
      }
    }
  }
};
