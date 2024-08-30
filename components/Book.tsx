import React from "react";
import { Pressable } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ImageComponent from "@/components/Image";
import CircleBadge from "./CircleBadge";

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
        height: 280,
        width: "80%",
        marginHorizontal: "auto",
      }}
      onPress={() => {
        navigation.navigate("book", { id: item.id });
      }}
    >
      <ThemedView style={{
        width: "70%",
        height: "80%",
        borderRadius: 15,
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <ImageComponent source={item.image} />
      </ThemedView>
      <ThemedText
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "black",
          marginTop: 8,
          padding: 2,
          alignItems: "center",
        }}
      >
        {item.title} <CircleBadge active={item.active} />
      </ThemedText>
    </Pressable>
  );
}