import * as React from 'react'; 
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect } from 'expo-router';
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
        return <Redirect href="/Home/inicio" />;
      } else {
        Alert.alert('Error', 'Hubo un problema al iniciar sesión');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema con la solicitud');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        id="c"
        source={require('@/assets/images/logo-muni.png')}
        width={650}
        height={590}
      />

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

      <Button title='Iniciar Sesión' color="#228B22" onPress={handleSubmit} />
      <Footer/> 
      <StatusBar style="auto"/>
    </View>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '5%'
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
  },
  
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: 300,
    height: 50,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
  },

  forgotPassword: {
    fontSize: 14,
    color: 'gray',
    marginTop: 20,
  },
  
  footer: {
    marginTop: 20,
  },

});

export default LoginForm
