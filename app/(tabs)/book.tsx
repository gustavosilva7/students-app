import Badge from "@/components/Badge";
import ImageComponent from "@/components/Image";
import Rating from "@/components/Rating";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useApi } from "@/hooks/useApi";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

export default function Book({ route, navigation }: any) {
  const { id } = route.params;
  const [book, setBook] = useState({} as Books);
  const [wish, setWish] = useState(false);
  const [readBook, setReadBook] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    confirmButtonText: "",
    cancelButtonText: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const { api } = useApi();

  const fetchBook = async () => {
    try {
      const { data } = await api.get(`/books/show/${id}`);
      setBook(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWishlist = async (bookId: number) => {
    try {
      const { data } = await api.get(`/wish-list/check-list/${bookId}`);
      setWish(data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkReadBook = async (bookId: number) => {
    try {
      const { data } = await api.get(`books/student/check-read-book/${bookId}`);
      setReadBook(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    await fetchBook();
    await fetchWishlist(id);
    await checkReadBook(id);
  };

  const postWishlist = async () => {
    try {
      await api.post(`/wish-list`, { book_id: book.id });
      showAlertSuccess("Livro adicionado a lista de desejos");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWishlist = async () => {
    try {
      await api.delete(`/wish-list/${book.id}`);
      showAlertSuccess("Livro removido da lista de desejos");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const avaliableBook = async (avaliation: number) => {
    try {
      const method = book.stars.length > 0 ? "put" : "post";
      const endpoint =
        book.stars.length > 0 ? `/stars/${book.stars[0].id}` : "/stars";

      await api[method](endpoint, {
        book_id: book.id,
        avaliation,
      });
      showAlertSuccess("Avaliação realizada com sucesso");
      fetchBook();
    } catch (error) {
      console.log(error);
    }
  };

  const showAlertConfirmation = (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel: () => void
  ) => {
    setAlertConfig({
      title,
      message,
      confirmButtonText: "Sim!",
      cancelButtonText: "Não",
      onConfirm,
      onCancel,
    });
    setShowAlert(true);
  };

  const showAlertSuccess = (message: string) => {
    setAlertConfig({
      title: "Sucesso",
      message,
      confirmButtonText: "OK",
      cancelButtonText: "",
      onConfirm: () => setShowAlert(false),
      onCancel: () => {},
    });
    setShowAlert(true);
  };

  const handleAddBookInWishlist = () => {
    showAlertConfirmation(
      "Deseja adicionar o livro na lista de desejos?",
      "",
      () => {
        postWishlist();
        setShowAlert(false);
      },
      () => setShowAlert(false)
    );
  };

  const handleRemoveBookInWishlist = () => {
    showAlertConfirmation(
      "Deseja remover o livro da lista de desejos?",
      "",
      () => {
        deleteWishlist();
        setShowAlert(false);
      },
      () => setShowAlert(false)
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.imageContainer}>
        <ImageComponent source={book?.image} style={styles.image} />
      </ThemedView>

      <ThemedView style={styles.mainInfoContainer}>
        <ThemedText style={styles.bookTitle}>{book?.title}</ThemedText>

        <ThemedView style={styles.info}>
          <ThemedText style={styles.text}>Status:</ThemedText>
          <Badge active={book?.active} />
        </ThemedView>

        {readBook && (
          <ThemedView style={styles.info}>
            <ThemedText style={styles.text}>Sua avaliação: </ThemedText>
            <Rating
              initialRating={book?.stars[0]?.avaliation}
              size={28}
              onRatingChange={(event) => {
                avaliableBook(event);
              }}
            />
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.infoContainer}>
        <ThemedText style={styles.titleDetails}>Informações</ThemedText>
        <ThemedView style={styles.infos}>
          <ThemedText style={styles.infosText}>
            Autor: {book?.author}
          </ThemedText>
          <ThemedText style={styles.infosText}>
            Editora: {book?.publisher}
          </ThemedText>
          <ThemedText style={styles.infosText}>Ano: {book?.year}</ThemedText>
          <ThemedText style={styles.infosText}>
            Edição: {book?.edition}
            {"º"}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.button}>
        {wish ? (
          <Pressable onPress={handleRemoveBookInWishlist}>
            <ThemedText style={styles.buttonText}>
              Remover da lista de desejos
            </ThemedText>
          </Pressable>
        ) : (
          <Pressable onPress={handleAddBookInWishlist}>
            <ThemedText style={styles.buttonText}>
              Adicionar a lista de desejos
            </ThemedText>
          </Pressable>
        )}
      </ThemedView>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertConfig.title}
        message={alertConfig.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={!!alertConfig.cancelButtonText}
        showConfirmButton={true}
        cancelText={alertConfig.cancelButtonText}
        confirmText={alertConfig.confirmButtonText}
        confirmButtonColor="#DD6B55"
        onCancelPressed={alertConfig.onCancel}
        onConfirmPressed={alertConfig.onConfirm}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imageContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 220,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  mainInfoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 20,
    height: "auto",
  },
  bookTitle: {
    textAlign: "center",
    width: "100%",
    fontSize: 32,
    padding: 8,
  },
  info: {
    flexDirection: "row",
    gap: 2,
    marginTop: 2,
    padding: 8,
  },
  text: {
    fontSize: 26,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  infoContainer: {
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: "column",
  },
  titleDetails: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    fontSize: 30,
    padding: 8,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infos: {
    flexDirection: "column",
    width: "100%",
    backgroundColor: "transparent",
  },
  infosText: {
    fontSize: 20,
    padding: 3,
    color: "#000",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "rgb(5, 112, 79)",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    width: "100%",
    height: "100%",
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 28,
  },
});
