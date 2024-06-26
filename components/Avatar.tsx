import { useAuth } from "@/app/AuthProvider";
import React from "react";
import { Image } from "react-native";

export default function Avatar() {
  const { currentUser } = useAuth();

  return (
    <Image
      style={{
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#000000",
        alignSelf: "center",
      }}
      source={{
        uri:
          currentUser?.image ||
          "https://bibliotech-storage.s3.us-east-2.amazonaws.com/users/q777ReQwR36wCSsJVoJfwGc0Z3CgubQStXn5fOM7.png",
      }}
    />
  );
}
