import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '@/scripts/Footer';

// Define el tipo de datos que manejará el formulario
interface FormData {
  rut: string;
  contraseña: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    rut: '',
    contraseña: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();  // Recibe los datos del usuario (incluyendo token JWT)

        // Almacenar el token JWT en AsyncStorage
        if (userData.token) {
          await AsyncStorage.setItem('token', userData.token);
        }

        // Redirigir a la página Home
        router.push('/Home/home');
      } else if (response.status === 403) {
        // Mostrar mensaje si el usuario no está validado
        setErrorMessage('Tu cuenta aún no ha sido validada. Contacta al administrador.');
      } else {
        setErrorMessage('Hubo un problema al iniciar sesión. Verifica tus credenciales.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Hubo un problema con la solicitud. Intenta nuevamente.');
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth < 768;

  return (
    <View style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
      <Image
        source={require('@/assets/images/logo-muni.png')}
        style={isMobile ? styles.mobileLogo : styles.desktopLogo}
      />

      <View style={isMobile ? styles.mobileForm : styles.formContainer}>
        <Text style={styles.titulo}>Inicio de Sesion</Text>
        <Text style={styles.subTitle}>Accede a tu cuenta</Text>

        <TextInput
          placeholder="RUT"
          style={styles.textInput}
          value={formData.rut}
          onChangeText={(value) => handleInputChange('rut', value)}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry={true}
          style={styles.textInput}
          value={formData.contraseña}
          onChangeText={(value) => handleInputChange('contraseña', value)}
        />

        <Button title='Iniciar Sesión' color="#00ae41" onPress={handleSubmit} />

        {/* Mostrar mensaje de error si existe */}
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        {/* Opción para recuperar la contraseña */}
        <TouchableOpacity onPress={() => router.push('../Auth/OlvidarContrasena')}>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  desktopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10%',
    paddingBottom: '17.3%',
    backgroundColor: '#FFFFFF',
  },

  mobileContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: '10%',
  },

  desktopLogo: {
    width: '50%',
    height: 'auto',
    resizeMode: 'contain',
  },

  mobileLogo: {
    height: '20%',
    resizeMode: 'contain',
  },

  formContainer: {
    width: '45%',
  },

  mobileForm: {
    width: '100%',
  },

  titulo: {
    marginTop: 20,
    fontSize: 50,
    color: '#34434D',
    fontWeight: 'bold',
  },

  subTitle: {
    fontSize: 30,
    color: 'gray',
    marginBottom: '2%',
  },

  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '100%',
    height: 50,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: '5%',
    fontSize: 20,
  },

  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },

  forgotPassword: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginForm;
