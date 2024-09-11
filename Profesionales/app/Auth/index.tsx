import { Text, View, StyleSheet, Alert } from "react-native";
import { useRouter } from 'expo-router';
import EntradaDatos from "@/components/inputs/EntradaDatos";
import Boton from "@/components/Botones/BotonLogin";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [rut, setRut] = useState('');
  const [contraseña, setContraseña] = useState('');
  const router = useRouter();

  const sePresiono = async () => {
      try {
          const response = await fetch('http://10.0.2.2:3000/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ rut, contraseña }),
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const result = await response.json();

          if (result.success) {
              try {
                  await AsyncStorage.setItem('token', result.token);
                  router.replace('/Home');
              } catch (error) {
                  Alert.alert('Error', 'Failed to save the token');
              }
          } else {
              Alert.alert('Error', result.message);
          }
      } catch (error) {
          Alert.alert('Error', 'Algo salió mal, por favor intenta de nuevo');
      }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Pantalla de Inicio de Sesión</Text>
        <EntradaDatos
            placeholder="RUT"
            value={rut}
            setValue={setRut}
            secureTextEntry={false}
            style={styles.input}
        />
        <EntradaDatos
            placeholder="Contraseña"
            value={contraseña}
            setValue={setContraseña}
            secureTextEntry={true}
            style={styles.input}
        />
        <Boton text="Ingresar" onPress={sePresiono} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
});

