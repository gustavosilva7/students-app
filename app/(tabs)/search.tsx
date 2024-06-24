import BooksList from "@/components/BooksList";
import List from "@/components/List";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useApi } from "@/hooks/useApi";
import { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, TextInput } from "react-native";

export default function SearchView({ navigation }: any) {
  const { api } = useApi();

  const [books, setBooks] = useState<Books[]>([]);
  const [bookReads, setBooksReads] = useState<Books[]>([]);
  const [bookAvaliable, setBooksAvaliable] = useState<Books[]>([]);

  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (reset = false) => {
    if (loading) return;

    setLoading(true);
    try {
      const { data } = await api.get("/books", {
        params: {
          per_page: 10,
          page: reset ? 1 : page,
          search,
        },
      });

      if (reset) {
        setBooks(data.data);
      } else {
        setBooks((prevbooks) => [...prevbooks, ...data.data]);
      }

      setHasMore(data.current_page < data.last_page);
      setPage((prevPage) => (reset ? 2 : prevPage + 1));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooksMoreLendings = async () => {
    try {
      const { data } = await api.get("/books/ranking-lending-book");

      setBooksReads(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBooksMoreRating = async () => {
    try {
      const { data } = await api.get("/books/ranking-rating-book");

      setBooksAvaliable(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks(true);
  }, [search]);

  useEffect(() => {
    fetchBooksMoreLendings();
    fetchBooksMoreRating();
  }, []);

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 150,
        }}
      >
        <Image
          source={require("@/assets/images/gig.gif")}
          style={styles.reactLogo}
        />
      </ThemedView>
      <ThemedView
        style={{
          flex: 1,
          padding: 16,
          gap: 16,
          overflow: "hidden",
        }}
      >
        <ThemedView>
          <TextInput
            placeholder="Search"
            style={{
              padding: 8,
              backgroundColor: "white",
              borderRadius: 8,
              margin: 8,
            }}
            onChangeText={(event) => setSearch(event)}
          />
        </ThemedView>

        {search ? (
          <BooksList
            books={books}
            hasMore={hasMore}
            fetchBooks={() => fetchBooks(false)}
            navigation={navigation}
          />
        ) : (
          <ScrollView
            style={{
              height: 500,
              flexDirection: "column",
              gap: 14,
            }}
          >
            <ThemedView>
              <ThemedText>Recomendados - Mais lidos</ThemedText>
              <List
                books={bookReads}
                navigation={navigation}
                route="/books/ranking-lending-book"
              />
            </ThemedView>
            <ThemedView>
              <ThemedText>Mais avaliados</ThemedText>
              <List
                books={bookAvaliable}
                navigation={navigation}
                route="/books/ranking-rating-book"
              />
            </ThemedView>
            <ThemedView>
              <ThemedText>Recomendados</ThemedText>
              <List books={books} navigation={navigation} route="/books" />
            </ThemedView>
          </ScrollView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 152,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
  },
});
