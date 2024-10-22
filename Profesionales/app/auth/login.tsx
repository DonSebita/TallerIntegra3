import { Text, View, StyleSheet, Alert, Platform, Pressable } from "react-native";
import { useRouter } from 'expo-router';
import EntradaDatos from "@/components/inputs/EntradaDatos";
import Boton from "@/components/botones/BotonLogin";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [rut, setRut] = useState('');
  const [contraseña, setContraseña] = useState('');
  const router = useRouter();

  const sePresiono = async () => {
    router.replace("/home")
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
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Solo para web
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5, // Para Android
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
});
