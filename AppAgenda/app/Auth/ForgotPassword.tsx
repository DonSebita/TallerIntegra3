import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define el tipo de datos que manejará el formulario
interface FormData {
  correo: string
}

const forgotPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    correo: ''
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(Dimensions.get('window').width);
  const [windowHeight, setWindowHeight] = useState<number>(Dimensions.get('window').height);

  const isMobile = windowWidth < 768;

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/Auth/ResetPassword');
      } else {
        setErrorMessage('Tu cuenta aún no ha sido validada. Contacta al administrador.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Hubo un problema con la solicitud. Intenta nuevamente.');
    }
  };

  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(Dimensions.get('window').width);
      setWindowHeight(Dimensions.get('window').height);
    };

    const subscription = Dimensions.addEventListener('change', updateDimensions);
    return () => subscription.remove();
  }, []);

  return (
    <View
      style={[
        styles.container,
        isMobile ? styles.mobileContainer : styles.desktopContainer,
        { justifyContent: isMobile ? 'flex-start' : 'space-between' },
      ]}
    >
      <Image
        source={require('@/assets/images/logo-muni.png')}
        style={[
          styles.logo,
          { width: isMobile ? '70%' : '35%', height: isMobile ? '20%' : 'auto' },
        ]}
      />

      <View style={[styles.form, isMobile ? { width: '100%' } : { width: '45%' }]}>
        <Text style={[styles.titulo, { fontSize: isMobile ? 30 : 50 }]}>Recuperación de Contraseña</Text>
        <Text style={[styles.subTitle, { fontSize: isMobile ? 20 : 30 }]}>Ingrese su Correo para Restablecer su Contraseña</Text>

        <TextInput
          placeholder="Correo"
          style={[styles.textInput, { fontSize: isMobile ? 16 : 20 }]}
          value={formData.correo}
          onChangeText={(value) => handleInputChange('correo', value)}
        />

        <Button title="Restablecer" color="#00ae41" onPress={handleSubmit} />

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  desktopContainer: {
    flexDirection: 'row',
    padding: '10%',
  },
  mobileContainer: {
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
  form: {
    alignItems: 'center',
  },
  titulo: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#34434D',
  },
  subTitle: {
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
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#007AFF',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default forgotPasswordForm;
