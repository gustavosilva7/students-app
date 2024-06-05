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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          {currentUser ? (
            <AuthProvider>
              <AuthInit>
                <Stack.Screen name="home" component={HomeScreen} />
                <Stack.Screen name="profile" component={Profile} />
                <Stack.Screen name="search" component={SearchView} />
              </AuthInit>
            </AuthProvider>
          ) : (
            <>
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>

  );
}
