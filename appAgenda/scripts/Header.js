// components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Municipalidad</Text>
      <View style={styles.iconContainer}>
        <Icon name="twitter" size={20} color="#FFFFFF" style={styles.icon} />
        <Icon name="facebook" size={20} color="#FFFFFF" style={styles.icon} />
        <Icon name="instagram" size={20} color="#FFFFFF" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#202020',
    flexDirection: 'row', // Asegura que los elementos estén alineados horizontalmente
    justifyContent: 'flex-start', // Espacio entre el texto y los iconos
    alignItems: 'center', // Alinea verticalmente al centro
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  iconContainer: {
    flexDirection: 'row', // Alinea los iconos en fila
    alignItems: 'center', // Alinea los iconos verticalmente al centro
  },
  icon: {
    marginLeft: 10, // Añade espacio entre los iconos
  },
});

export default Header;
