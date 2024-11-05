import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const OlvidarContraseña: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handlePasswordReset = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/password/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email }),
      });

      if (response.ok) {
        Alert.alert('Recuperación de contraseña', 'Te llegará un correo para restablecer tu contraseña.');
        router.push('/Auth/Login'); // Redirigir al login después de enviar el correo
      } else {
        Alert.alert('Error', 'El correo no está registrado.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al enviar la solicitud. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>
      <Text style={styles.instructions}>Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />

      <Button title="Enviar enlace" onPress={handlePasswordReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 18,
  },
});

export default OlvidarContraseña;
