// components/Home.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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
        <Text style={styles.titulo}>Destacado <FontAwesome  name="star" size={50} color="orange"/></Text>
        
      </View>
      <Text style={styles.titulo}>Noticias <FontAwesome name="heart" size={50} color="green"/></Text> {/* Título agregado aquí */}
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
    overflow: 'auto', // Permite el desplazamiento
  },
  busquedaContainer: {
    marginTop: 20,
    width: '60%',
    
  },
  titulo: {
    fontSize: 50, // Tamaño grande para el título
    fontWeight: 'bold', // Negrita
    marginVertical: 30, // Espaciado vertical
    textAlign: 'center', // Centra el texto horizontalmente
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',  // Alinea las tarjetas en el centro
    width: '100%',
    paddingHorizontal: 0,  // Elimina el padding horizontal
    marginTop: 10, // Ajusta el margen superior
  },
  card: {
    width: 120,  // Ancho de cada tarjeta
    height: 180, // Altura de cada tarjeta
    marginRight: 10,  // Espacio entre las tarjetas
  },
});

export default Home;
