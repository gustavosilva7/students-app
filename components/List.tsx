import React, { useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Button, Pressable, StyleSheet, ViewStyle } from "react-native";
import ImageComponent from "./Image";
import ButtonList from "./ButtonList";
import CircleBadge from "./CircleBadge";
import { useApi } from "@/hooks/useApi";

type Props = {
  books: Books[];
  lending?: boolean;
  navigation: any;
};

export default function List({
  lending,
  books: initialBooks,
  navigation,
}: Props) {
  const { api } = useApi();

  const [books, setBooks] = useState<Books[]>(initialBooks);
  const [bookInLending, setBookInLending] = useState<Books | null>(null);
  const listWidth: ViewStyle =
    books.length > 2
      ? {
          width: "90%",
        }
      : {
          width: "100%",
        };

  const fetchBookLending = async () => {
    try {
      const { data } = await api.get("books/student/book-in-lending");

      if (data.id) {
        setBookInLending(data);
      } else {
        setBookInLending(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (lending) {
      fetchBookLending();
    }
  }, []);

  useEffect(() => {
    if (lending && bookInLending) {
      setBooks([bookInLending, ...initialBooks]);
    } else {
      setBooks(initialBooks);
    }
  }, [initialBooks]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.listContainer, listWidth]}>
        {books.slice(0, 2).map((book) => (
          <Pressable
            key={book.id}
            style={styles.stepContainer}
            onPress={() => {
              navigation.navigate("book", { id: book.id });
            }}
          >
            <ThemedView style={styles.viewImage}>
              <ImageComponent source={book.image} />
            </ThemedView>
            <ThemedView style={styles.viewInfors}>
              <ThemedView
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                <ThemedText style={styles.text}>{book.title}</ThemedText>
                <CircleBadge active={book.active} />
              </ThemedView>
              {lending && book.id === bookInLending?.id && (
                <ThemedView
                  style={{
                    width: "100%",
                    borderRadius: 15,
                    backgroundColor: "#ffc107",
                  }}
                >
                  <ThemedText
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    Você está lendo
                  </ThemedText>
                </ThemedView>
              )}
            </ThemedView>
          </Pressable>
        ))}
      </ThemedView>
      {books.length > 2 && <ButtonList />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36383e",
    flexDirection: "row",
    gap: 8,
    padding: 8,
    borderRadius: 15,
    height: 260,
    alignItems: "center",
  },
  listContainer: {
    backgroundColor: "transparent",
    width: "90%",
    height: "100%",
    flexDirection: "row",
    gap: 4,
  },
  stepContainer: {
    width: "50%",
    height: "100%",
    gap: 5,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 8,
  },
  viewImage: {
    width: "100%",
    height: "80%",
    borderRadius: 15,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  viewInfors: {
    width: "100%",
    height: "20%",
    flexDirection: "column",
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  text: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
});
