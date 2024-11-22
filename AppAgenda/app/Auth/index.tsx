import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  // const handleSubmit = async () => {
  //   // Validación inicial del formulario
  //   if (!formData.rut || !formData.contraseña) {
  //     setErrorMessage('Por favor, completa todos los campos.');
  //     return;
  //   }
  
  //   try {
  //     // Realizar la solicitud al servidor
  //     const response = await fetch('http://localhost:3000/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         rut: formData.rut,
  //         contraseña: formData.contraseña,
  //       }),
  //     });
  
  //     // Si la solicitud es exitosa
  //       if (response.ok) {
  //         const userData = await response.json();
    
  //         // Almacenar el token en AsyncStorage si está presente
  //         if (userData.token) {
  //           await AsyncStorage.setItem('token', userData.token);
  //           Alert.alert('Éxito', 'Inicio de sesión exitoso.');
  //           router.push('/home'); 
  //         } else {
  //           setErrorMessage('No se recibió un token válido del servidor.');
  //         }
  //       } else if (response.status === 403) {
  //         // Caso específico: cuenta no validada
  //         setErrorMessage('Tu cuenta aún no ha sido validada. Contacta al administrador.');
  //       } else {
  //         // Otros errores: mostrar mensaje específico del servidor si está disponible
  //         const errorData = await response.json();
  //         setErrorMessage(
  //           errorData.message || 'Hubo un problema al iniciar sesión. Verifica tus credenciales.'
  //         );
  //       }
  //     } catch (error) {
  //       // Manejo de errores de red o problemas en la solicitud
  //       console.error('Error:', error);
  //       setErrorMessage('Hubo un problema con la solicitud. Por favor, intenta nuevamente.');
  //     }
  // };
  const handleSubmit = async()=>{ router.push('/home')}  //<--------------esto es para ver que todo esta funcionando correctamente y editar otras pestañas sin iniciar sesion

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
        <Text style={[styles.titulo, { fontSize: isMobile ? 30 : 50 }]}>Inicio de Sesion</Text>
        <Text style={[styles.subTitle, { fontSize: isMobile ? 20 : 30 }]}>Accede a tu cuenta</Text>

        <TextInput
          placeholder="RUT"
          style={[styles.textInput, { fontSize: isMobile ? 16 : 20 }]}
          value={formData.rut}
          onChangeText={(value) => handleInputChange('rut', value)}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry={true}
          style={[styles.textInput, { fontSize: isMobile ? 16 : 20 }]}
          value={formData.contraseña}
          onChangeText={(value) => handleInputChange('contraseña', value)}
        />

        <Button title="Iniciar Sesión" color="#00ae41" onPress={handleSubmit} />

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity onPress={() => router.push('/Auth/ForgotPassword')}>
          <Text style={[styles.forgotPassword, { fontSize: isMobile ? 14 : 16 }]}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>
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

export default LoginForm;
