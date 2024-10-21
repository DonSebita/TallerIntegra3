import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
      </View>

      {/* Resumen de estadísticas */}
      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Citas</Text>
          <Text style={styles.cardValue}>150</Text>
          <Text style={styles.cardSubtitle}>+5 desde ayer</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Citas Pendientes</Text>
          <Text style={styles.cardValue}>25</Text>
          <Text style={styles.cardSubtitle}>-2 desde ayer</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Usuarios Verificados</Text>
          <Text style={styles.cardValue}>500</Text>
          <Text style={styles.cardSubtitle}>+10 desde ayer</Text>
        </View>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === 'web' ? 50 : 20, // Más padding en web para espaciar
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 32 : 24, // Título más grande en web
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: 'blue',
  },
  cards: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column', // Filas en web, columnas en móvil
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: Platform.OS === 'web' ? 0 : 10, // Espacio adicional en móvil
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'gray',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navLink: {
    fontSize: 16,
    color: 'blue',
    paddingVertical: 10,
  },
});
