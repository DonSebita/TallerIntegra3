import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Importa axios para hacer la solicitud de logout al backend
import { Link, useRouter } from 'expo-router';

const HomePage: React.FC = () => {
  const [isValidated, setIsValidated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkValidation = async () => {
      try {
        const usuarioData = await AsyncStorage.getItem('usuario');
        if (usuarioData) {
          const usuario = JSON.parse(usuarioData);
          if (usuario.validado) {
            setIsValidated(true);
          } else {
            setIsValidated(false);
            router.push('/Auth/Login');
          }
        } else {
          setIsValidated(false);
          router.push('/Auth/Login');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario', error);
        setIsValidated(false);
        router.push('/Auth/Login');
      }
    };

    checkValidation();
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Obtiene el token almacenado

      if (token) {
        // Realiza una solicitud al backend para invalidar el token
        await axios.post(
          'http://localhost:3000/auth/logout', // Reemplaza con la URL correcta de tu backend
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      // Elimina el token y otros datos del usuario en AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('usuario');
      
      setIsValidated(false); // Cambia el estado de validación
      router.push('/Auth/Login'); // Redirige al inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth < 768;

  if (isValidated === null) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
      <Image source={require('@/assets/images/logo-muni.png')} style={styles.logo} />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonAgendar, { width: isMobile ? '90%' : '40%', padding: isMobile ? 20 : 25 }]}>
          <Link href="/Auth/agenda" style={styles.buttonText}>Agendar Hora</Link>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonHistorial, { width: isMobile ? '90%' : '40%', padding: isMobile ? 20 : 25 }]}>
          <Link href="/Home/HistorialCitas" style={styles.buttonText}>Historial de Citas</Link>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonEditar, { width: isMobile ? '90%' : '40%', padding: isMobile ? 20 : 25 }]}>
          <Link href="/Home/EditarCitas" style={styles.buttonText}>Editar/Cancelar Citas</Link>
        </TouchableOpacity>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity
          style={[styles.button, styles.buttonLogout, { width: isMobile ? '90%' : '40%', padding: isMobile ? 20 : 25 }]}
          onPress={handleLogout} // Asegúrate de que esté correctamente ligado al evento
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
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
  buttonLogout: {
    backgroundColor: '#FF6347', // Color de fondo para el botón de Cerrar Sesión
  },
});

export default HomePage;
