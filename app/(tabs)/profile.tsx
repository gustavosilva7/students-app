import { StyleSheet, Image, Platform, Button } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useApi } from "@/hooks/useApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../AuthProvider";

export default function Profile({ navigation }: any) {
  const { api } = useApi();
  const { setCurrentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");

      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/gig.gif")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView>
        <Button title="Sair" onPress={handleLogout} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  reactLogo: {
    height: 120,
    width: 370,
    bottom: 0,
    left: 20,
    position: "absolute",
  },
});
