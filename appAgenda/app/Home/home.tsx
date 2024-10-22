import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router'; // Para redirigir si no está validado

const HomePage: React.FC = () => {
  const [isValidated, setIsValidated] = useState<boolean | null>(null);  // Estado para verificar si el usuario está validado
  const router = useRouter();  // Hook para redirigir

  useEffect(() => {
    const checkValidation = async () => {
      try {
        const usuarioData = await AsyncStorage.getItem('usuario');  // Recupera el usuario desde AsyncStorage
        if (usuarioData) {
          const usuario = JSON.parse(usuarioData);
          if (usuario.validado) {
            setIsValidated(true);  // Si el usuario está validado
          } else {
            setIsValidated(false);  // Si no está validado, redirige a la página de login
            router.push('/Auth/Login');
          }
        } else {
          setIsValidated(false);  // Si no hay usuario en AsyncStorage, redirige a la página de login
          router.push('/Auth/Login');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario', error);
        setIsValidated(false);
        router.push('/Auth/Login');
      }
    };

    checkValidation();  // Llama a la función para validar al usuario cuando el componente cargue
  }, [router]);

  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth < 768;

  // Si aún no se ha determinado si el usuario está validado, muestra un indicador de carga
  if (isValidated === null) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
      {/* Logo */}
      <Image source={require('@/assets/images/logo-muni.png')} style={styles.logo} />
      
      {/* Contenedor de botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonAgendar, { width: isMobile ? '90%' : '40%', padding: isMobile ? 20 : 25 }]}>
          <Link href="/Auth/agenda" style={styles.buttonText}>Agendar Hora</Link>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonHistorial, { width: isMobile ? '90%' : '40%', padding: isMobile ? 20 : 25 }]}>
          <Link href="/Home/HistorialCitas" style={styles.buttonText}>Historial de Citas</Link>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonEditar, { width: isMobile ? '90%' : '40%', padding: isMobile ? 20 : 25 }]}>
          Editar/Cancelar Citas
          <Link href="/Home/EditarCitas" style={styles.buttonText}>Editar/Cancelar Citas</Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  desktopContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 50,
  },
  mobileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 50,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 20,
    borderRadius: 15,
    backgroundColor: '#008CBA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonAgendar: {
    backgroundColor: '#008CBA',
  },
  buttonHistorial: {
    backgroundColor: '#4CAF50',
  },
  buttonEditar: {
    backgroundColor: '#f44336',
  },
});

export default HomePage;
