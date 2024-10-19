import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
          <Text style={styles.link}>Inicio</Text>
        </TouchableOpacity>
        
        <Image
          source={require('./logo-muni.png')} // Asegúrate de que esta ruta sea correcta
          style={styles.logoImage} // Estilo específico para esta imagen
        />
        
        <TouchableOpacity onPress={() => navigation.navigate('Contacts')}>
          <Text style={styles.link}>Contactos</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.socialContainer}>
        <Text style={styles.link}>SIGUENOS...</Text>
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

      <Image
        source={require('./sss-300x147-1.webp')} // Asegúrate de que esta ruta sea correcta
        style={styles.footerImage} // Estilo específico para esta imagen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    paddingVertical: 5,
    alignItems: 'flex-end',
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
    fontSize: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
    width: '100%',
  },
  icon: {
    marginHorizontal: 8,
  },
  logoImage: {
    width: 200, // Ajusta el tamaño según lo necesites
    height: 130, // Ajusta el tamaño según lo necesites
    marginVertical: 5,
  },
  footerImage: {
    width: 200, // Ajusta el tamaño según lo necesites
    height: 100, // Ajusta el tamaño según lo necesites
    marginVertical: 5,
  },
  copy: {
    color: '#ffffff',
    marginTop: 0,
    fontSize: 14,
  },
});

export default Footer;
