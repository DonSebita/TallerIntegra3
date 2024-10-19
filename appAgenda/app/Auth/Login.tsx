import * as React from 'react'; 
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Footer from '@/scripts/Footer';
import { BrowserRouter as Router, Route, Routes, BrowserRouter, useRoutes } from 'react-router-dom';

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

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try{
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.navigate('/Home/inicio');
      } else {
        Alert.alert('Error', 'Hubo un problema al iniciar sesión');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema con la solicitud');
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
      </View>
      
      <Footer/> 
      <StatusBar style="auto"/>
    </View>

  );
}



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
    paddingBottom: '10%'
  },

  desktopLogo: {
    width: '50%',
    height: 'auto',
    resizeMode: 'contain',
  },

  mobileLogo: {
    height: '20%',
    resizeMode: 'contain'
  },

  formContainer: {
    width: '45%',
  },

  mobileForm: {
    width: '100%',
  },

  titulo:{
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

  forgotPassword: {
    fontSize: 14,
    color: 'gray',
    marginTop: 20,
  },

  button: {

  },

});

export default LoginForm