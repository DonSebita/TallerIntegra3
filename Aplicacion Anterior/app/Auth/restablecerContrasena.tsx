import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const RestablecerContraseña: React.FC = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>(''); // Campo para el token
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Estado para el mensaje de éxito

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/password/reset-password/${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contraseña: newPassword }),
      });

      if (response.ok) {
        setSuccessMessage('Contraseña restablecida correctamente.'); // Establece el mensaje de éxito
        setTimeout(() => {
          router.push('/Auth/Login'); // Redirige al login después de 2 segundos
        }, 2000);
      } else {
        Alert.alert('Error', 'El enlace ha expirado o es inválido.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al restablecer la contraseña. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      {successMessage ? (
        <Text style={styles.successMessage}>{successMessage}</Text> // Muestra el mensaje de éxito si existe
      ) : (
        <>
          <Text style={styles.title}>Restablecer Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Código de restablecimiento"
            value={token}
            onChangeText={setToken}
          />
          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar nueva contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Button title="Restablecer Contraseña" onPress={handlePasswordReset} />
        </>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
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
  successMessage: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default RestablecerContraseña;
