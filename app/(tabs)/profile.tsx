import { StyleSheet, Image, Platform } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function Profile() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/gig.gif")}
          style={styles.reactLogo}
        />
      }
    ></ParallaxScrollView>
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
