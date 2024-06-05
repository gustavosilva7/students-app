import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthInit, AuthProvider, useAuth } from './AuthProvider';
import AuthLayout from './auth/_layout';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './auth/login';
import RegisterScreen from './auth/register';
import HomeScreen from './(tabs)';
import Profile from './(tabs)/profile';
import SearchView from './(tabs)/search';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { currentUser } = useAuth();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const Stack = createNativeStackNavigator();

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
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
        {currentUser ? (
          <AuthProvider>
            <AuthInit>
              <Stack.Navigator>
                <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="search" component={SearchView} options={{ headerShown: false }} />
              </Stack.Navigator>
            </AuthInit>
          </AuthProvider>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
      </ThemeProvider>
    </NavigationContainer>

  );
}
