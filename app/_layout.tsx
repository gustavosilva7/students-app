import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthInit, AuthProvider, useAuth } from "./AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./auth/login";
import RegisterScreen from "./auth/register";
import TabLayout from "@/app/(tabs)/_layout"; // Importa o TabLayout

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const { currentUser } = useAuth();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <AuthInit>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {currentUser ? (
                <Stack.Screen name="TabLayout" component={TabLayout} /> // Atualizado para TabLayout
              ) : (
                <>
                  <Stack.Screen name="login" component={LoginScreen} />
                  <Stack.Screen name="register" component={RegisterScreen} />
                </>
              )}
            </Stack.Navigator>
          </AuthInit>
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
