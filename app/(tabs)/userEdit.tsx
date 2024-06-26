import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useApi } from "@/hooks/useApi";
import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { useAuth } from "../AuthProvider";

export default function UserEdit({ route, navigation }: any) {
  const { user } = route.params;
  const { setCurrentUser } = useAuth();
  const { api } = useApi();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      serie: null,
      class: null,
    },
    onSubmit: async (values) => {
      try {
        const { data } = await api.put(`/user/update/${user.id}`, values);

        setCurrentUser(data || {});

        alert("Usuário atualizado com sucesso!");
        navigation.goBack();
      } catch (error: any) {
        console.error(error.response?.data || error.message);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      email: user.email,
      name: user.name,
      serie: user.student_profile.serie,
      class: user.student_profile.class,
    });
  }, [user]);

  return (
    <ThemedView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 12,
      }}
    >
      <ThemedView style={{ flexDirection: "column", gap: 8 }}>
        <ThemedView style={style.formData}>
          <ThemedText style={style.label}>Nome</ThemedText>
          <TextInput
            placeholder="Nome"
            style={style.input}
            value={formik.values.name}
            onChangeText={(text) => formik.setFieldValue("name", text)}
          />
        </ThemedView>
        <ThemedView style={style.formData}>
          <ThemedText style={style.label}>Email</ThemedText>
          <TextInput
            placeholder="Email"
            style={style.input}
            value={formik.values.email}
            onChangeText={(text) => formik.setFieldValue("email", text)}
          />
        </ThemedView>
        <ThemedView style={style.formData}>
          <ThemedText style={style.label}>Série</ThemedText>
          <ThemedView style={style.picker}>
            <Picker
              style={{ color: "#000" }}
              selectedValue={formik.values.serie}
              onValueChange={(itemValue) =>
                formik.setFieldValue("serie", itemValue)
              }
            >
              <Picker.Item label="Selecione a Série" value={null} />
              <Picker.Item label="1º ano" value={1} />
              <Picker.Item label="2º ano" value={2} />
              <Picker.Item label="3º ano" value={3} />
            </Picker>
          </ThemedView>
        </ThemedView>
        <ThemedView style={style.formData}>
          <ThemedText style={style.label}>Turma</ThemedText>
          <ThemedView style={style.picker}>
            <Picker
              style={{ color: "#000" }}
              selectedValue={formik.values.class}
              onValueChange={(itemValue) =>
                formik.setFieldValue("class", itemValue)
              }
            >
              <Picker.Item label="Selecione a Turma" value={null} />
              <Picker.Item label="Infórmatica" value={1} />
              <Picker.Item label="Segurança do trabalho" value={2} />
              <Picker.Item label="Agronegócio" value={3} />
              <Picker.Item label="Finanças" value={4} />
              <Picker.Item label="Enfermagem" value={5} />
            </Picker>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <Pressable
        onPress={() => formik.handleSubmit()}
        style={{
          width: "100%",
          backgroundColor: "rgb(5, 112, 79)",
          borderRadius: 10,
          padding: 8,
        }}
      >
        <ThemedText
          style={{
            fontSize: 26,
            color: "#FFF",
            textAlign: "center",
            paddingVertical: 12,
            width: "100%",
          }}
        >
          Salvar
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const style = StyleSheet.create({
  formData: {
    width: "100%",
    gap: 10,
    flexDirection: "column",
  },
  label: {
    fontSize: 22,
    fontWeight: "800",
  },
  input: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 10,
    color: "#000",
  },
});
