// components/Home.js
import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import Tarjeta from './Tarjeta';
import Tarjeta2 from './Tarjeta2';
import Tarjeta3 from './Tarjeta3';
import Tarjeta4 from './Tarjeta4';
import Busqueda from './Busqueda';
import Footer from './Footer';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.busquedaContainer}>
        <Busqueda />
      </View>
      <Text style={styles.titulo}>Noticias</Text> {/* Título agregado aquí */}
      <View style={styles.cardContainer}>
        <Tarjeta2 style={styles.card} />
        <Tarjeta style={styles.card} />
        <Tarjeta3 style={styles.card} />
        <Tarjeta4 style={styles.card} />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'auto', // Agrega esto para permitir el desplazamiento
  },
  busquedaContainer: {
    marginTop: 20,
    width: '60%',
    height: '60%',
  },
  titulo: {
    fontSize: 50, // Tamaño del texto del título
    fontWeight: 'bold', // Negrita
    marginVertical: 30, // Aumenta el margen vertical para moverlo hacia abajo
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',  // Cambiado para alinear las tarjetas sin espacio entre ellas
    width: '100%',
    paddingHorizontal: 0,  // Eliminado el padding horizontal para evitar espacios
    marginTop: 10, // Ajusta el margen superior de las tarjetas para controlarlas mejor
  },
  card: {
    width: 120,  // Tamaño fijo para cada tarjeta, ajusta según el diseño
    height: 180, // Ajusta la altura si es necesario
    marginRight: 10,  // Espacio entre las tarjetas (modificado)
  },
});

export default Home;
