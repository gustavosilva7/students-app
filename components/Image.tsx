import React, { useState } from "react";
import { Image, ActivityIndicator, View, StyleSheet } from "react-native";

type Props = {
  source: string;
} & React.ComponentProps<typeof Image>;

export default function ImageComponent({ source, ...props }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color="#0000ff"
        />
      )}
      <Image
        {...props}
        source={{ uri: source }}
        onLoad={() => setLoading(false)}
        style={loading ? styles.hiddenImage : styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  hiddenImage: {
    width: 0,
    height: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});