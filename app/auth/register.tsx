import React from "react";
import { Stack } from "expo-router";

import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "../AuthProvider";
import { useFormik } from "formik";

export default function RegisterScreen({ navigation }: any) {
  const { api } = useApi();
  const { setAuthToken } = useAuth();
  const { height } = useWindowDimensions();
  const containerHeight = { minHeight: height };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      serie: "",
      class: "",
      applicationType: 2,
    },
    onSubmit: async (values) => {
      try {
        const { data } = await api.post("/register", values);

        setAuthToken(data.token);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
      <ThemedView style={[styles.container, containerHeight]}>
        <ThemedView style={styles.form}>
          <ThemedView style={styles.formHeader}>
            <ThemedText style={styles.title}>Cadastrar</ThemedText>
          </ThemedView>
          <ThemedView style={styles.formData}>
            <ThemedView style={{ gap: 8, backgroundColor: "transparent" }}>
              <ThemedText
                style={{ fontSize: 18, fontWeight: "800", color: "#000" }}
              >
                Email
              </ThemedText>
              <TextInput
                placeholder="Email"
                style={styles.input}
                placeholderTextColor="#fff"
                onChange={(e) =>
                  formik.setFieldValue("email", e.nativeEvent.text)
                }
              />
            </ThemedView>
            <ThemedView style={{ gap: 8, backgroundColor: "transparent" }}>
              <ThemedText
                style={{ fontSize: 18, fontWeight: "800", color: "#000" }}
              >
                Senha
              </ThemedText>
              <TextInput
                placeholder="Senha"
                style={styles.input}
                placeholderTextColor="#fff"
                onChange={(e) =>
                  formik.setFieldValue("password", e.nativeEvent.text)
                }
              />
            </ThemedView>
            <ThemedView style={{ gap: 8, backgroundColor: "transparent" }}>
              <ThemedText
                style={{ fontSize: 18, fontWeight: "800", color: "#000" }}
              >
                Nome
              </ThemedText>
              <TextInput
                placeholder="Nome"
                style={styles.input}
                placeholderTextColor="#fff"
                onChange={(e) =>
                  formik.setFieldValue("name", e.nativeEvent.text)
                }
              />
            </ThemedView>
            <ThemedView
              style={{
                backgroundColor: "transparent",
                flexDirection: "row",
                width: "100%",
                gap: 8,
              }}
            >
              <ThemedView
                style={{ width: "48.5%", backgroundColor: "transparent" }}
              >
                <ThemedText
                  style={{ fontSize: 18, fontWeight: "800", color: "#000" }}
                >
                  Série
                </ThemedText>
                <TextInput
                  placeholder="Série"
                  style={styles.input}
                  placeholderTextColor="#fff"
                  onChange={(e) =>
                    formik.setFieldValue("serie", e.nativeEvent.text)
                  }
                />
              </ThemedView>
              <ThemedView
                style={{ width: "48.5%", backgroundColor: "transparent" }}
              >
                <ThemedText
                  style={{ fontSize: 18, fontWeight: "800", color: "#000" }}
                >
                  Turma
                </ThemedText>
                <TextInput
                  placeholder="Turma"
                  style={styles.input}
                  placeholderTextColor="#fff"
                  onChange={(e) =>
                    formik.setFieldValue("class", e.nativeEvent.text)
                  }
                />
              </ThemedView>
            </ThemedView>
          </ThemedView>
          <ThemedView
            style={{
              height: "20%",
              backgroundColor: "transparent",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#2c2c2c",
                paddingVertical: 15,
                paddingHorizontal: 30,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <ThemedText
                style={{ color: "white", fontSize: 20, fontWeight: "800" }}
              >
                Cadastrar
              </ThemedText>
            </TouchableOpacity>
            <ThemedText
              style={{
                color: "#000",
                fontSize: 18,
                fontWeight: "800",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Já uma conta?
              <ThemedText
                style={{
                  color: "#2c2c2c",
                  fontSize: 18,
                  fontWeight: "800",
                  textDecorationLine: "underline",
                }}
                onPress={() => navigation.navigate("login")}
              >
                Entrar
              </ThemedText>
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    height: "100%",
    width: "100%",
  },
  form: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 30,
  },
  formHeader: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    padding: 10,
    width: "100%",
    textAlign: "center",
    color: "black",
  },
  formData: {
    height: "70%",
    padding: 15,
    backgroundColor: "transparent",
    flex: 1,
    gap: 10,
  },
  input: {
    padding: 10,
    backgroundColor: "#2c2c2c",
    borderRadius: 10,
    color: "#fff",
  },
});
