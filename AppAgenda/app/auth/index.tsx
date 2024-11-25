import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const authIndex: React.FC = () => {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <Image
            source={require('@/assets/images/logo-muni.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity style={styles.submitButton} onPress={() => router.push('/auth/Login')}>
            <Text style={styles.submitButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={() => router.push('/auth/Register')}>
            <Text style={styles.submitButtonText}>Registarse</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/auth/ForgotPassword')}>
            <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 40,
    alignItems: 'center', // Centra el contenido
  },
  logo: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#47b564',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: 300, // Ancho predeterminado en píxeles
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#7C3AED',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 16,
  },
});


export default authIndex;
