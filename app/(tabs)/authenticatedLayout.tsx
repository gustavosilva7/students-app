import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchView from './search';
import Profile from './profile';
import HomeScreen from '.';

const Tab = createBottomTabNavigator();

export default function AuthenticatedLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="search" component={SearchView} options={{ headerShown: false }} />
      <Tab.Screen name="profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
