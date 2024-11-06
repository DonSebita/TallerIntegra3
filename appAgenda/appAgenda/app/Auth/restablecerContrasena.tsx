import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Vibration } from 'react-native';
import { useRouter } from 'expo-router';

const RestablecerContraseña: React.FC = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      Vibration.vibrate(500); // Vibración para indicar error
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
        setSuccessMessage('Contraseña restablecida correctamente.');
        Vibration.vibrate([100, 200, 100]); // Vibración para éxito
        setTimeout(() => {
          router.push('/Auth/Login');
        }, 2000);
      } else {
        Vibration.vibrate(500);
        Alert.alert('Error', 'El enlace ha expirado o es inválido.');
      }
    } catch (error) {
      Vibration.vibrate(500);
      Alert.alert('Error', 'Hubo un problema al restablecer la contraseña.');
    }
  };

  return (
    <View style={styles.container}>
      {successMessage ? (
        <Text style={styles.successMessage} accessibilityRole="alert" accessible={true}>
          {successMessage}
        </Text>
      ) : (
        <>
          <Text style={styles.title} accessibilityRole="header">Restablecer Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Código de restablecimiento"
            value={token}
            onChangeText={setToken}
            accessible={true}
            accessibilityLabel="Campo para ingresar el código de restablecimiento"
          />
          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            accessible={true}
            accessibilityLabel="Campo para ingresar la nueva contraseña"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar nueva contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            accessible={true}
            accessibilityLabel="Campo para confirmar la nueva contraseña"
          />
          <Button title="Restablecer Contraseña" onPress={handlePasswordReset} accessibilityLabel="Botón para restablecer la contraseña" />
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
