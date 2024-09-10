import React from "react";
import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonGradient () {

    return (
     <TouchableOpacity style={styles.container}>
 <LinearGradient
        
        
        // Button Linear Gradient
        colors={['#f69100', '#f69100', '#f69100']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.button}
      >
        <Text style={styles.text}>ENTRAR</Text>
      </LinearGradient>
    </TouchableOpacity>
    );

}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
    width: 200,
    marginTop: 20,
    


  },
     
    text:{
      fontSize: 14,
      color: '#fff',
      fontWeight: 'bold',
     


    },
    
    
    
    
    button: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
  
     },
  
  
  
    });
