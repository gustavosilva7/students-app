import React from "react";
import { ThemedText } from "./ThemedText";

type Props = {
  active?: boolean;
};

export default function Badge({ active }: Props) {
  return (
    <ThemedText
      style={{
        backgroundColor: active ? "green" : "red",
        color: "white",
        padding: 5,
        borderRadius: 5,
        width: 120,
        textAlign: "center",
        fontSize: 18,
      }}
    >
      {active ? "Disponível" : "Indisponível"}
    </ThemedText>
  );
}
