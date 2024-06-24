import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  children?: React.ReactNode;
  route?: string;
  navigation: any;
} & React.ComponentProps<typeof Pressable>;

export default function ButtonList({
  children,
  route,
  navigation,
  ...props
}: Props) {
  return (
    <Pressable
      {...props}
      style={styles.container}
      onPress={() => {
        navigation.navigate("more-books", {
          routeName: route,
        });
      }}
    >
      {!children && (
        <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
});
