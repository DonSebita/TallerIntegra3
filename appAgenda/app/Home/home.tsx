import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';

const HomePage: React.FC = () => {
  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth < 768; // Define isMobile aquí para determinar si es móvil o no

  return (
    <SafeAreaView style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
      {/* Logo */}
      <Image
        source={require('@/assets/images/logo-muni.png')}
        style={styles.logo}
      />

      {/* Contenedor de botones */}
      <View style={styles.buttonContainer}>
        {/* Botón para Agendar Hora */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonAgendar,
            { width: isMobile ? '90%' : '40%', padding: isMobile ? 20 : 25 }
          ]}
        >
          <Link href="/Auth/agenda" style={styles.buttonText}>
            Agendar Hora
          </Link>
        </TouchableOpacity>

        {/* Botón para Historial de Citas */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonHistorial,
            { width: isMobile ? '90%' : '40%', padding: isMobile ? 20 : 25 }
          ]}
        >
          <Link href="/Home/HistorialCitas" style={styles.buttonText}>
            Historial de Citas
          </Link>
        </TouchableOpacity>

        {/* Botón para Editar/Cancelar Citas */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonEditar,{ width: isMobile ? '90%' : '40%', padding: isMobile ? 20 : 25 }]}>
            Editar/Cancelar Citas
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  desktopContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 50,
  },
  mobileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 50,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 40, // Espacio entre el logo y los botones
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 20,               // Separación entre botones
    borderRadius: 15,                 // Botones con bordes redondeados más modernos
    backgroundColor: '#008CBA',       // Color de fondo por defecto
    shadowColor: '#000',              // Sombra para darle un efecto más moderno
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Estilos específicos para cada botón según el color
  buttonAgendar: {
    backgroundColor: '#008CBA', // Azul
  },
  buttonHistorial: {
    backgroundColor: '#4CAF50', // Verde
  },
  buttonEditar: {
    backgroundColor: '#f44336', // Rojo
  },
});

export default HomePage;
