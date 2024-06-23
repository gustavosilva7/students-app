import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { StyleSheet, ViewStyle } from "react-native";

type Props = {
  active?: boolean;
};

export default function CircleBadge({ active }: Props) {
  const badge: ViewStyle = active
    ? {
        backgroundColor: "green",
      }
    : {
        backgroundColor: "red",
      };

  return <ThemedView style={[styles.circle, badge]} />;
}

const styles = StyleSheet.create({
  circle: {
    width: 14,
    height: 14,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
