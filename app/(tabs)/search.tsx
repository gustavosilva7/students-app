import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image, StyleSheet } from "react-native";

export default function SearchView() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/search.webp")}
          style={styles.reactLogo}
        />
      }
    ></ParallaxScrollView>
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
    height: 152,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
