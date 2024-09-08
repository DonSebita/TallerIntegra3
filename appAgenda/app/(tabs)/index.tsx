import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Image, StyleSheet, Button, View, Text, TextInput, } from 'react-native';
import { StatusBar } from 'expo-status-bar';




export default function App() {

  return (
    <View style={styles.container}>
       <Text style={styles.titulo}>Inicio de Sesion</Text>
       <Text style={styles.subTitle}>Accede a tu cuenta</Text>
       <TextInput
         placeholder="Rut"
         style={styles.textInput}
       />
       <TextInput
         placeholder="Contraseña"
         style={styles.textInput}
       />
       <StatusBar style="auto"/>
    </View>


  );

}




 



  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
   titulo:{
      fontSize: 70,
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
     width: '20%',
     height: 50,
     marginTop: 20,
     borderRadius: 30,
     backgroundColor: '#fff',





   }






});
