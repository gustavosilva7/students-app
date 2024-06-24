import React from "react";
import { ThemedView } from "./ThemedView";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import BooksList from "./BooksList";

type Props = {
  books: Books[];
  hasMore: boolean;
  fetchBooks: () => void;
};

export default function Seachs({ books, hasMore, fetchBooks }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <BooksList books={books} hasMore={hasMore} fetchBooks={fetchBooks} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
