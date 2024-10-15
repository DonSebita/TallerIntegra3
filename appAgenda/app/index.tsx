import * as React from 'react'; 
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { G, Path, Defs, Pattern, Use, Image } from "react-native-svg"
import Footer from '@/scripts/Footer';
import { BrowserRouter as Router, Route, Routes, BrowserRouter, useRoutes } from 'react-router-dom';



export default function App() {

 


  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = (formData: FormData) => {
    console.log('Registrando:', formData);
  };

  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth < 768;

  return (
    <View style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
      <Image
        source={require('@/assets/images/logo-muni.png')}
        style={isMobile ? styles.mobileLogo : styles.desktopLogo}
      />
    </Defs>
      </Svg>
    );
  }

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
   titulo:{
      fontSize: 50,
      color: '#34434D',
      fontWeight: 'bold',

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

   },
   
   subTitle: {
     fontSize: 30,
     color: 'gray',
   },

   textInput: {
     
     padding: 10,
     paddingStart: 30,
     width: '20%',
     height: 50,
     marginTop: 20,
     borderRadius: 30,
     backgroundColor: '#fff',
   },

  },


   },

   button: {



   },

   footer: {
     marginTop: 20,



   },







});
