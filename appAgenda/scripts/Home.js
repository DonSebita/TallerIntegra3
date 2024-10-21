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
        <Tarjeta style={styles.centerCard} />
        <Tarjeta3 style={styles.card} />
        <Tarjeta4 style={styles.card} />
      </View>
      <Footer/>
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
  },
  titulo: {
    fontSize: 35, // Tamaño del texto del título
    fontWeight: 'bold', // Negrita
    marginVertical: 20, // Espacio vertical alrededor del título
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 40,
  },
  card: {
    width: '100%',
    height: '100%',
  },
  centerCard: {
    width: '60%',
    marginHorizontal: 10,
  },
});

export default Home;
