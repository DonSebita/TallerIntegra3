// components/Home.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Tarjeta from './Tarjeta';
import Tarjeta2 from './Tarjeta2';
import Tarjeta3 from './Tarjeta3';
import Busqueda from './Busqueda';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.busquedaContainer}>
        <Busqueda />
      </View>
      <View style={styles.cardContainer}>
        <Tarjeta2 style={styles.card} />
        <Tarjeta style={styles.centerCard} />
        <Tarjeta3 style={styles.card} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Cambiado para alinear hacia arriba
    alignItems: 'center',
  },
  busquedaContainer: {
    marginTop: 20, // Espacio adicional en la parte superior
    width: '60%', // Asegúrate de que ocupe el ancho completo
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  card: {
    width: '60%', // Ancho de las tarjetas laterales
    
  },
  centerCard: {
    width: '60%', // Ancho de la tarjeta central
    marginHorizontal: 10, // Espacio entre la tarjeta central y las laterales
    
  },
});

export default Home;
