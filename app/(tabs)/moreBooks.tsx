import BooksList from "@/components/BooksList";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useApi } from "@/hooks/useApi";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function MoreBooks({ route, navigation }: any) {
  const { routeName } = route.params;
  const { api } = useApi();
  const [data, setData] = useState<Books[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const { data } = await api.get(routeName, {
        params: {
          per_page: 10,
          page: page,
        },
      });

      setData((prevbooks) => [...prevbooks, ...data.data]);

      setHasMore(data.current_page < data.last_page);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <BooksList
        books={data}
        fetchBooks={fetchData}
        hasMore={hasMore}
        navigation={navigation}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
});
