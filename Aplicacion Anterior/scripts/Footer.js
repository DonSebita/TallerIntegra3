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
          <View style={styles.socialContainer}>
            {/* El texto 'SIGUENOS...' ahora está encima de los íconos */}
            <Text style={styles.link}>SIGUENOS...</Text>
            {/* Coloca los iconos con su texto correspondiente */}
            <View style={styles.iconWithText}>
                <Icon name="twitter" size={30} color="#ffffff" />
                <Text style={styles.iconText}>Twitter</Text>
              </View>
            <View style={styles.iconColumn}>
              <View style={styles.iconWithText}>
                <Icon name="facebook" size={30} color="#ffffff" />
                <Text style={styles.iconText}>Facebook</Text>
              </View>
            <View style={styles.iconWithText}>
                <Icon name="instagram" size={30} color="#ffffff" />
                <Text style={styles.iconText}>Instagram</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <Image
          source={require('./logo-muni.png')} // Asegúrate de que esta ruta sea correcta
          style={styles.logoImage} // Estilo específico para esta imagen
        />
      </View>

      {/* Imagen que se sube a la altura de la primera */}
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
    height: '30%',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center', // Asegura que los elementos estén centrados
  },
  link: {
    color: '#ffffff',
    margin: 0,
    fontSize: 16,
    fontWeight: 'bold', // Para hacer el texto en negrita
    marginBottom: 10, // Para dar espacio entre el texto y los iconos
  },
  socialContainer: {
    flexDirection: 'column', // Coloca los elementos (texto + iconos) en una columna
    justifyContent: 'center',
    alignItems: 'center', // Centrado en el eje transversal
    width: '100%',
  },
  iconColumn: {
    flexDirection: 'column', // Cambié a 'column' para que los iconos se coloquen uno debajo del otro
    alignItems: 'center', // Asegura que los iconos estén centrados
    marginTop: 10, // Espacio entre el texto y los iconos
  },
  iconWithText: {
    flexDirection: 'row', // Los íconos y los textos estarán en fila
    alignItems: 'center', // Alineación vertical de los íconos con el texto
    marginVertical: 8, // Espacio entre los iconos con texto
    
  },
  iconText: {
    color: '#ffffff', // Color del texto en blanco
    marginLeft: 8, // Espacio entre el ícono y el texto
    fontSize: 14, // Tamaño del texto
    fontWeight: 'bold',
  },
  logoImage: {
    width: 200, // Ajusta el tamaño según lo necesites
    height: 130, // Ajusta el tamaño según lo necesites
    marginVertical: 5,
  },
  footerImage: {
    width: 200, // Ajusta el tamaño según lo necesites
    height: 100, // Ajusta el tamaño según lo necesites
    marginTop: -135, // Se reduce el margen superior para subir la imagen
  },
  copy: {
    color: '#ffffff',
    marginTop: 0,
    fontSize: 14,
  },
});

export default Footer;
