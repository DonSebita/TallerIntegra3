import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import React from 'react';


// Definimos la interfaz para los datos de las noticias
interface Noticia {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
}

const Index = () => {
  const noticias: Noticia[] = [
    {
      id: '1',
      titulo: 'Nueva tecnología para el cuidado de la salud',
      descripcion: 'Descubre cómo los avances tecnológicos están mejorando la vida de los adultos mayores.',
      imagen: 'https://www.digitales.es/img/blog/977ab912536318d1ada6e79d9269f2c3.png', // Reemplaza con una URL de imagen válida
    },
    {
      id: '2',
      titulo: 'Ejercicios para mantenerte activo',
      descripcion: 'Conoce rutinas simples y efectivas para mantenerte en forma desde casa.',
      imagen: 'https://images.ligup2.com/eyJidWNrZXQiOiJsaWd1cC12MiIsImtleSI6ImRlcG9ydGVtdW5pY2lwYWwvcGhvdG9zLzIxMjU4X3NlZGVfbG9zX2xhdXJlbGVzLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsfX0=', // Reemplaza con una URL de imagen válida
    },
    {
      id: '3',
      titulo: 'Consejos para una alimentación saludable',
      descripcion: 'Aprende cómo una dieta equilibrada puede mejorar tu calidad de vida.',
      imagen: 'https://cdn.nutritionstudies.org/wp-content/uploads/2023/05/link-between-diet-and-pain-1024x536.jpg', // Reemplaza con una URL de imagen válida
    },
  ];

  const renderNoticia = ({ item }: { item: Noticia }) => (
    <View style={styles.tarjeta}>
      <Image source={{ uri: item.imagen }} style={styles.imagenTarjeta} />
      <View style={styles.textoTarjeta}>
        <Text style={styles.tituloNoticia}>{item.titulo}</Text>
        <Text style={styles.descripcionNoticia}>{item.descripcion}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://www.shutterstock.com/image-vector/doctor-older-patient-sitting-on-600nw-1879445755.jpg" }} // Reemplaza con tu logo si es necesario
        style={styles.logo}
      />
      <Text style={styles.title}>¡Ingresaste Bienvenido!</Text>
      <Text style={styles.subtitle}>
        Tu experiencia comienza aquí.  
      </Text>
      <Text style={styles.title}>Noticias</Text>
      <FlatList
        data={noticias}
        renderItem={renderNoticia}
        keyExtractor={(item) => item.id}
        style={styles.listaNoticias}
        contentContainerStyle={styles.contenedorNoticias}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F7FF",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  listaNoticias: {
    width: '100%',
  },
  contenedorNoticias: {
    alignItems: 'center',
  },
  tarjeta: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imagenTarjeta: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  textoTarjeta: {
    flex: 1,
    justifyContent: 'center',
  },
  tituloNoticia: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  descripcionNoticia: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Index;
