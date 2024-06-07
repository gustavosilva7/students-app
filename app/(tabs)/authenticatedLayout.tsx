import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchView from "./search";
import Profile from "./profile";
import HomeScreen from ".";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

const Tab = createBottomTabNavigator();

export default function AuthenticatedLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = () => {
            switch (route.name) {
              case "home":
                return focused ? "home" : "home-outline";
              case "search":
                return focused ? "search" : "search-outline";
              case "profile":
                return focused ? "person" : "person-outline";
              default:
                return "home";
            }
          };

          return <TabBarIcon name={iconName()} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchView}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            display: "none",
          },
        }}
      />
    </Tab.Navigator>
  );
}
