import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable, Alert } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useApi } from "@/hooks/useApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../AuthProvider";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { SerieStudents, SerieStudentsMessages } from "../enum/serieEnum";
import { ClassStudents, ClassStudentsMessages } from "../enum/classEnum";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type KeyOfClass = keyof typeof ClassStudentsMessages;
type KeyOfSerie = keyof typeof SerieStudentsMessages;

export default function Profile({ navigation }: any) {
  const { api } = useApi();
  const { currentUser, setCurrentUser } = useAuth();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Desculpe, precisamos da permissão para acessar a biblioteca de imagens!"
        );
      }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Mantém a proporção 1:1 para um círculo perfeito
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Atualização necessária para usar o primeiro asset retornado
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const response = await api.post("/user-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        Alert.alert("Sucesso", "Imagem enviada com sucesso!");
      } else {
        Alert.alert("Erro", "Falha ao enviar a imagem.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao enviar a imagem.");
    }
  };

  if (!currentUser) return null;

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
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 12,
        }}
      >
        <ThemedView
          style={{
            width: "100%",
            gap: 14,
            flexDirection: "column",
          }}
        >
          <ThemedView
            style={{
              width: "100%",
              alignItems: "center",
              padding: 12,
            }}
          >
            <ThemedText
              style={{
                fontSize: 32,
                textAlign: "center",
                paddingVertical: 12,
                width: "100%",
              }}
            >
              Perfil
            </ThemedText>
            <Pressable
              onPress={() =>
                navigation.navigate("user-edit", {
                  user: currentUser,
                })
              }
              style={{
                position: "absolute",
                top: 0,
                right: 2,
                padding: 12,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 20,
                  color: "#0000FF",
                  textAlign: "center",
                  paddingVertical: 12,
                  width: "100%",
                }}
              >
                <MaterialCommunityIcons
                  name="account-edit"
                  size={36}
                  color="white"
                />
              </ThemedText>
            </Pressable>
          </ThemedView>

          <ThemedView
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  borderWidth: 2,
                  borderColor: "#000000",
                  marginBottom: 12,
                  alignSelf: "center",
                }}
                transition={1000}
              />
            ) : currentUser.image ? (
              <Image
                source={{ uri: currentUser.image }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  borderWidth: 2,
                  borderColor: "#000000",
                  marginBottom: 12,
                  alignSelf: "center",
                }}
                transition={1000}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-circle"
                size={150}
                color="black"
                style={{
                  marginBottom: 12,
                }}
              />
            )}
            <Pressable
              onPress={pickImage}
              style={{
                position: "absolute",
                top: -5,
                right: "30%",
                padding: 12,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 20,
                  color: "#0000FF",
                  textAlign: "center",
                  paddingVertical: 12,
                  width: "100%",
                }}
              >
                <MaterialCommunityIcons
                  name="image-edit-outline"
                  size={36}
                  color="white"
                />
              </ThemedText>
            </Pressable>
          </ThemedView>

          <ThemedView
            style={{
              flexDirection: "column",
              gap: 12,
            }}
          >
            <ThemedText style={{ fontSize: 20 }}>
              Nome:{" "}
              <ThemedText style={{ fontSize: 20 }}>
                {currentUser.name}
              </ThemedText>{" "}
            </ThemedText>
            <ThemedText style={{ fontSize: 20 }}>
              Email:{" "}
              <ThemedText style={{ fontSize: 20 }}>
                {currentUser.email}
              </ThemedText>{" "}
            </ThemedText>
            <ThemedText style={{ fontSize: 20 }}>
              Série:{" "}
              <ThemedText style={{ fontSize: 20 }}>
                {
                  ClassStudentsMessages[
                    currentUser.student_profile?.class as KeyOfClass
                  ]
                }
              </ThemedText>{" "}
            </ThemedText>
            <ThemedText style={{ fontSize: 20 }}>
              Turma:{" "}
              <ThemedText style={{ fontSize: 20 }}>
                {
                  SerieStudentsMessages[
                    currentUser.student_profile?.serie as KeyOfSerie
                  ]
                }
              </ThemedText>{" "}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView>
          <Pressable onPress={handleLogout}>
            <ThemedText
              style={{
                textAlign: "center",
                width: "100%",
                paddingVertical: 12,
                backgroundColor: "#FF0000",
                color: "#FFFFFF",
                fontSize: 26,
                fontWeight: "bold",
                padding: 12,
                borderRadius: 12,
              }}
            >
              Sair
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  reactLogo: {
    height: 120,
    width: 370,
    bottom: 0,
    left: 20,
    position: "absolute",
  },
});
