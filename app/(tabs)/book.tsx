import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

export default function Book({ route, navigation }: any) {
  const { id } = route.params;
  return (
    <ThemedView>
      <ThemedText>{id}</ThemedText>
    </ThemedView>
  );
}
