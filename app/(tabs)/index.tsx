import { Image, StyleSheet, Button, Pressable } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import List from "@/components/List";

export default function HomeScreen({ navigation }: any) {
  const [myBooks, setMyBooks] = useState<Books[]>([]);
  const [myWishList, setMyWishList] = useState<Books[]>([]);
  const { api } = useApi();

  const fetchMyBooks = async () => {
    try {
      const { data } = await api.get("/students/books-reads");

      setMyBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get("/wish-list");

      setMyWishList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyBooks();

    fetchWishlist();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/teste.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.listsContainer}>
        <ThemedText
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Livros que já li
        </ThemedText>
        <List books={myBooks} lending navigation={navigation} />
      </ThemedView>
      <ThemedView style={styles.listsContainer}>
        <ThemedText
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Lista de próximos a serem lidos
        </ThemedText>
        <List books={myWishList} navigation={navigation} />

      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {

    flexDirection: "column",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 120,
    width: 370,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  listsContainer: {
    flexDirection: "column",
    gap: 8,
    height: 290,
  },
});
