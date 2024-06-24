import { ActivityIndicator } from "react-native";
import { ThemedView } from "./ThemedView";

export function Loading() {
  return (
    <ThemedView>
      <ActivityIndicator size={32} />
    </ThemedView>
  );
}
