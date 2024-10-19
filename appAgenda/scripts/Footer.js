import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de tener esta biblioteca instalada

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
          <Text style={styles.link}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Support')}>
          <Text style={styles.link}>Soporte</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Contacts')}>
          <Text style={styles.link}>Contactos</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.icon}>
          <Icon name="facebook" size={18} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="twitter" size={18} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="instagram" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.copy}>© 2024 Tu Municipalidad</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    paddingVertical: 5, // Aumentado para dar más espacio al footer
    alignItems: 'flex-end', // Centra el contenido
    justifyContent: 'center',
    width: '100%',
  },
  
  links: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  link: {
    color: '#ffffff',
    margin: 0,
    fontSize: 16, // Reducido para un footer más pequeño
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5, // Reducido para un footer más pequeño
    width: '100%',
  },
  icon: {
    marginHorizontal: 8, // Reducido para un footer más pequeño
  },
  copy: {
    color: '#ffffff',
    marginTop: 0,
    fontSize: 14, // Reducido para un footer más pequeño
  },
});

export default Footer;