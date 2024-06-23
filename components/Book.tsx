import React, { PureComponent } from "react";
import { Pressable, Image, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ImageComponent from "@/components/Image";
import { ThemedView } from "./ThemedView";

export function BookItem({ item, navigation }: any) {
  return (
    <Pressable
      style={{
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
        backgroundColor: "white",
        padding: 8,
        borderRadius: 8,
        height: 240,
      }}
      onPress={() => {
        navigation.navigate("book", { id: item.id });
      }}
    >
      <ThemedView>
        <ImageComponent source={item.image} />
      </ThemedView>
      <ThemedView>
        <ThemedView
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <ThemedText>{item.title}</ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}
