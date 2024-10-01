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
          <Icon name="facebook" size={20} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="twitter" size={20} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="instagram" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.contact}>Dirección: Calle Ejemplo 123, Ciudad</Text>
      <Text style={styles.contact}>Teléfono: (123) 456-7890</Text>

      <Text style={styles.copy}>© 2024 Tu Municipalidad</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    paddingVertical: 10,
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
    margin: 0,
    fontSize: 18,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  contact: {
    color: '#ffffff',
    marginTop: 5,
    fontSize: 15,
    textAlign: 'center',
  },
  copy: {
    color: '#ffffff',
    marginTop: 0,
    fontSize: 15,
  },
});

export default Footer;
