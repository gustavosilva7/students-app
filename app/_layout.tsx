import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthInit, AuthProvider, useAuth } from "./AuthProvider";
import LoginScreen from "./auth/login";
import RegisterScreen from "./auth/register";
import AuthenticatedLayout from "./(tabs)/authenticatedLayout";
import ViewScreen from "./modal";

// Prevent the splash screen from auto-hiding
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
          <Stack.Screen
            name="modal"
            component={ViewScreen}
            options={{
              headerShown: true,
              title: "Modal",
              presentation: "modal",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function SplashScreenComponent({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/images/splash.mp4")}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isLooping
      />
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashVisible, setSplashVisible] = useState(true);

  if (isSplashVisible) {
    return <SplashScreenComponent onFinish={() => setSplashVisible(false)} />;
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
