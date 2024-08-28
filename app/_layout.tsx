import {
  DataContextProvider,
  AlertContextProvider,
  I18nProvider,
} from "@hooks";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "@/locales/localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(screens)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    HorrorCorpsDemo: require("../assets/fonts/Horror-Corps-Demo.ttf"),
    FrightMaidenDemo: require("../assets/fonts/Fright-Maiden-Demo.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const i18n = new I18n(translations);
  i18n.enableFallback = true;
  i18n.defaultLocale = "en";

  const recoveryLanguageSaved = async () => {
    const languageSaved = await AsyncStorage.getItem("language");
    return languageSaved || null;
  };

  async function setLocale() {
    const language = await recoveryLanguageSaved();
    if (language) {
      i18n.locale = language;
    } else {
      i18n.locale = Localization.locale;
    }
  }
  useEffect(() => {
    setLocale();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <I18nProvider i18n={i18n}>
        <AlertContextProvider>
          <DataContextProvider>
            <Stack>
              <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            </Stack>
          </DataContextProvider>
        </AlertContextProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
