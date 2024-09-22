import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.links}>
        <TouchableOpacity onPress={() => alert('Navegar a Home')}>
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Navegar a About')}>
          <Text style={styles.link}>Soporte</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Navegar a Contact')}>
          <Text style={styles.link}>Contactos</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.copy}>© 2024 Tu Municipalidad</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 165, 0, 0.8)',
    paddingVertical: 10, // Reducido el padding
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  link: {
    color: '#ffffff',
    margin: 0, // Reducido el margen
    fontSize: 18, // Tamaño de texto más pequeño
  },
  copy: {
    color: '#ffffff',
    marginTop: 0, // Reducido el margen
    fontSize: 15, // Tamaño de texto más pequeño
  },
});

export default Footer;
