import { Image, StyleSheet, Button, Pressable } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { useAuth } from "@/app/AuthProvider";

export default function HomeScreen({ navigation }: any) {
  const { currentUser } = useAuth();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/teste.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome, {currentUser.name}!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView>
        <Pressable
          onPress={() => navigation.navigate("modal")}
          style={{ padding: 16 }}
        >
          <ThemedText>Go to modal</ThemedText>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 120,
    width: 370,
    bottom: 0,
    left: 20,
    position: "absolute",
  },
});
