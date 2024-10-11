import * as React from 'react'; 
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { G, Path, Defs, Pattern, Use } from "react-native-svg"
import Footer from '@/scripts/Footer';
import { BrowserRouter as Router, Route, Routes, BrowserRouter, useRoutes } from 'react-router-dom';

export default function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = (formData: FormData) => {
    console.log('Registrando:', formData);
  };
  
  function SvgTop() {
    return (
      <Svg
        width={500}
        height={250}
        fill="none"
      >
        <G filter="url(#a)" shapeRendering="crispEdges">
          <Path fill="url(#b)" d="M4 0h835v411H4z" />
          <Path stroke="#000" d="M4.5.5h834v410H4.5z" />
        </G>
      
        <Defs>
          <Pattern id="b" width={1} height={1} patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.00098 0 0 .00198 0 -.285)" />
          </Pattern>
          <Image
            id="c"
            source={require('@/assets/images/logo-muni.png')}
            width={650}
            height={590}
          />
        </Defs>
      </Svg>
    );
  }

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
        placeholder="Rut"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry={true}
        style={styles.textInput}
      /> 
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
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1
  },

  forgotPassword: {
    fontSize: 14,
    color: 'gray',
    marginTop: 20,
  },
  
  button: {

  },
  
  footer: {
    marginTop: 20,
  },

});
