import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import SearchView from "./search";
import Profile from "./profile";
import HomeScreen from ".";
import Book from "./book";
import MoreBooks from "./moreBooks";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AuthenticatedLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="book"
        component={Book}
        options={{ presentation: "modal", title: "Detalhes do livro" }}
      />
      <Stack.Screen
        name="more-books"
        component={MoreBooks}
        options={{ presentation: "modal", title: "Mais informações" }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
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
