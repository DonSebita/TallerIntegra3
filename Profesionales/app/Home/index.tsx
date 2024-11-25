import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';

const noticiasFalsas = [
  {
    id: '1',
    titulo: 'Nuevo Programa de Actividad Física para Adultos Mayores',
    descripcion: 'Se lanza un programa para promover la actividad física en adultos mayores con actividades gratuitas.',
    imagen: '../../assets/images/deporte.jpg',
  },
  {
    id: '2',
    titulo: 'Campaña de Vacunación Contra la Influenza',
    descripcion: 'Se abre el registro para la vacunación gratuita para adultos mayores en todos los centros de salud.',
    imagen: '../../assets/images/vacunacion.jpg',
  },
  {
    id: '3',
    titulo: 'Talleres de Tecnología para la Tercera Edad',
    descripcion: 'Aprende a usar smartphones, computadoras y redes sociales en talleres especiales para adultos mayores.',
    imagen: '../../assets/images/tecnologia.jpg',
  },
  {
    id: '4',
    titulo: 'Concierto Especial para Adultos Mayores',
    descripcion: 'Un evento musical dedicado a nuestros adultos mayores, organizado en el auditorio central.',
    imagen: '../../assets/images/concierto.jpg',
  },
];

export default function Home() {
  return (
    <ScrollView style={styles.container}>
   
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo-muni.png')}
          style={styles.logo}
        />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bienvenido a la Plataforma Profesional</Text>
        <Text style={styles.headerSubtitle}>Administra tus usuarios y citas con facilidad</Text>
      </View>

      </View>

    
      <View style={styles.noticiasSection}>
        <Text style={styles.sectionTitle}>Noticias sobre Adultos Mayores</Text>
        <FlatList
          data={noticiasFalsas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.noticiaCard}>
              <Image source={{ uri: item.imagen }} style={styles.noticiaImagen} />
              <Text style={styles.noticiaTitulo}>{item.titulo}</Text>
              <Text style={styles.noticiaDescripcion}>{item.descripcion}</Text>
            </View>
          )}
          numColumns={2} 
          columnWrapperStyle={styles.noticiasRow}
        />
      </View>

      {/* Pie de página */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Plataforma Profesional. Todos los derechos reservados.</Text>
        <Text style={styles.footerText}>Contacto: soporte@plataforma.com</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  noticiasSection: {
    marginVertical: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  noticiasRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  noticiaCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10, 
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    height: 250, 
  },
  noticiaImagen: {
    width: '100%',
    height: 150, 
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover', 
  },
  noticiaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center', 
  },
  noticiaDescripcion: {
    fontSize: 14,
    color: '#666',
    textAlign: 'justify',
  },
  footer: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 5,
    textAlign: 'center',
  },
  
});
