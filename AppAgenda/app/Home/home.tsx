import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require('@/assets/images/logo-muni.png')} // Cambia esto a tu logo si es necesario
        style={styles.logo}
      />

      {/* Título */}
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>¿Qué deseas hacer hoy?</Text>

      {/* Botones de navegación */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.agendarButton]}>
          <Link href="/Home/guardarCitas" style={styles.buttonText}>
            Agendar Cita
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.historialButton]}>
          <Link href="/Home/citasUsuario" style={styles.buttonText}>
            Historial de Citas
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.editarButton]}>
          <Link href="/Home/EditarCitas" style={styles.buttonText}>
            Editar/Cancelar Citas
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.noticiasButton]}>
          <Link href="/Home/noticias" style={styles.buttonText}>
            Noticias
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '90%',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  agendarButton: {
    backgroundColor: '#007BFF',
  },
  historialButton: {
    backgroundColor: '#28A745',
  },
  editarButton: {
    backgroundColor: '#FFC107',
  },
  noticiasButton: {
    backgroundColor: '#FF4500', // Color de fondo para el botón de Noticias
  },
});

export default Home;
