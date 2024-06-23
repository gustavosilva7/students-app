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
import AuthenticatedLayout from "./(tabs)/authenticatedLayout";
import ViewScreen from "./modal";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function Layout() {
  const { currentUser } = useAuth();
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {currentUser ? (
        <>
          <Stack.Screen name="tabs" component={AuthenticatedLayout} />
          <Stack.Screen name="modal" component={ViewScreen} options={{ headerShown: true, title: "Modal", presentation: "modal" }} />
        </>
      ) : (
        <>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer independent={true}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <AuthInit>
            <Layout />
          </AuthInit>
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}