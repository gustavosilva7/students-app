import React from "react";
import { FlatList } from "react-native";
import { BookItem } from "./Book";
import { Loading } from "./Loading";

type Props = {
  books: Books[];
  hasMore: boolean;
  fetchBooks: () => void;
  navigation: any;
};

export default function BooksList({
  books,
  hasMore,
  fetchBooks,
  navigation,
}: Props) {
  return (
    <FlatList
      data={books}
      style={{ marginTop: 10 }}
      contentContainerStyle={{ gap: 10 }}
      keyExtractor={(book) => book.id.toString()}
      renderItem={({ item }) => (
        <BookItem item={item} navigation={navigation} />
      )}
      onEndReached={fetchBooks}
      onEndReachedThreshold={0.1}
      ListFooterComponent={hasMore ? <Loading /> : null}
    />
  );
}
