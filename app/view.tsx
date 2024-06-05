import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function ViewScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={{ width: "100%", textAlign: "center" }}>
        This is a modal view fsfd
      </ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(198, 145, 165, 0.5)',
  },
})