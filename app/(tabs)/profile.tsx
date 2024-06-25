import { StyleSheet, Pressable } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useApi } from "@/hooks/useApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../AuthProvider";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { SerieStudents, SerieStudentsMessages } from "../enum/serieEnum";
import { ClassStudents, ClassStudentsMessages } from "../enum/classEnum";

type KeyOfClass = keyof typeof ClassStudentsMessages;
type KeyOfSerie = keyof typeof SerieStudentsMessages;

export default function Profile({ navigation }: any) {
  const { api } = useApi();
  const { currentUser, setCurrentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");

      setCurrentUser(null);
    } catch (error) {
      console.error(error);
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
          </ThemedView>

          <Image
            source={currentUser.image ? { uri: currentUser.image } : null}
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
