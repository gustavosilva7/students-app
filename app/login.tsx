import React from 'react'
import { Link, Stack } from 'expo-router'

import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAvoidingView, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

export default function login() {
    return (
        <>
            <Stack.Screen />
            <ThemedView style={styles.container}>
                <ThemedView style={styles.form}>
                    <ThemedView style={styles.formHeader}>
                        <ThemedText style={styles.title}>Login</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.formData}>
                        <ThemedView style={{ gap: 10, backgroundColor: "transparent" }}>
                            <ThemedText style={{ fontSize: 22, fontWeight: "800", color: "#000" }}>Email</ThemedText>
                            <TextInput placeholder='Email' style={styles.input} placeholderTextColor="#fff" />
                        </ThemedView>
                        <ThemedView style={{ gap: 10, backgroundColor: "transparent" }}>
                            <ThemedText style={{ fontSize: 22, fontWeight: "800", color: "#000" }}>Senha</ThemedText>
                            <TextInput placeholder='Senha' style={styles.input} placeholderTextColor="#fff" />
                        </ThemedView>
                    </ThemedView>
                    <ThemedView style={{ height: "25%", backgroundColor: "transparent", justifyContent: "center", alignSelf: "center" }}>
                        <TouchableOpacity style={{ backgroundColor: "#2c2c2c", paddingVertical: 15, paddingHorizontal: 30, borderRadius: 10, alignItems: "center" }}>
                            <ThemedText style={{ color: "white", fontSize: 20, fontWeight: "800" }}>Login</ThemedText>
                        </TouchableOpacity>
                        <ThemedText style={{ color: "#000", fontSize: 18, fontWeight: "800", textAlign: "center", marginTop: 10 }}>
                            Não tem uma conta?
                            <Link href="/register">
                                <ThemedText style={{ color: "#2c2c2c" }}>Cadastre-se</ThemedText>
                            </Link>
                        </ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height: '100%',
        width: '100%',
    },
    form: {
        width: '100%',
        height: "55%",
        backgroundColor: 'white',
        borderRadius: 30,
    },
    formHeader: {
        height: '18%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent",
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        padding: 10,
        width: '100%',
        textAlign: 'center',
        color: 'black',
    },
    formData: {
        height: '82%',
        padding: 15,
        backgroundColor: "transparent",
        flex: 1,
        gap: 20,
    },
    input: {
        padding: 10,
        backgroundColor: "#2c2c2c",
        borderRadius: 10,
        color: "#fff",

    }
});
