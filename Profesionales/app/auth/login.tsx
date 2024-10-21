/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, View, StyleSheet, Alert, Platform, Pressable } from "react-native";
import { useRouter } from 'expo-router';
import EntradaDatos from "@/components/inputs/EntradaDatos";
import Boton from "@/components/botones/BotonLogin";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [rut, setRut] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [recordar, setRecordar] = useState(false);  // Estado para recordar sesión
  const router = useRouter();

  useEffect(() => {
    // Cargar credenciales guardadas si existen
    const cargarCredencialesGuardadas = async () => {
      const savedRut = await AsyncStorage.getItem('savedRut');
      const savedContraseña = await AsyncStorage.getItem('savedContraseña');
      if (savedRut && savedContraseña) {
        setRut(savedRut);
        setContraseña(savedContraseña);
        setRecordar(true);  // Marcar el botón de recordar si se guardaron credenciales
      }
    };

    cargarCredencialesGuardadas();
  }, []);

  const fetchWithTimeout = (url: string, options: any, timeout = 7000) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Request timed out'));
      }, timeout);

      fetch(url, options)
        .then(response => {
          clearTimeout(timer);
          resolve(response);
        })
        .catch(err => {
          clearTimeout(timer);
          reject(err);
        });
    });
  };

  const validarRut = (rut: string) => {
    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    return rutRegex.test(rut);
  };

  const sePresiono = async () => {
    if (!validarRut(rut)) {
      Alert.alert('Error', 'RUT inválido');
      return;
    }
    try {
      const response: any = await fetchWithTimeout("http://localhost:3000/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, contraseña }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Respuesta no exitosa:', errorText);
        throw new Error('Error en la solicitud. El servidor devolvió un error.');
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      if (result.success) {
        if (recordar) {
          await AsyncStorage.setItem('savedRut', rut);
          await AsyncStorage.setItem('savedContraseña', contraseña);
        } else {
          await AsyncStorage.removeItem('savedRut');
          await AsyncStorage.removeItem('savedContraseña');
        }

        // Redirigir a la página 'home' después de iniciar sesión
        router.replace('/home');
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Request timed out') {
          Alert.alert('Error', 'La solicitud ha tardado demasiado. Verifica tu conexión a Internet.');
        } else {
          Alert.alert('Error', 'Algo salió mal, por favor intenta de nuevo.');
        }
      } else {
        Alert.alert('Error', 'Algo salió mal, por favor intenta de nuevo.');
      }
      console.log('Error:', error);
    }
  };

  return (
    <View style={[styles.container, Platform.OS === 'web' && styles.webContainer]}>
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
      
      <Pressable onPress={() => router.push('./forgotPassword')}>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </Pressable>

      <View style={styles.checkboxContainer}>
        <Pressable
          style={[styles.checkboxBase, recordar && styles.checkboxChecked]}
          onPress={() => setRecordar(!recordar)}
        >
          {recordar && <Ionicons name="checkmark" size={24} color="white" />}
        </Pressable>
        <Text style={styles.checkboxLabel}>Recuérdame</Text>
      </View>
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
  webContainer: {
    width: '50%',
    maxWidth: 600,
    borderRadius: 20,
    padding: 20,
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  forgotText: {
    marginTop: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 30,
    marginBottom: 20,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});
