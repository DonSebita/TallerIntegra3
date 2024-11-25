import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  Alert, 
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

interface FormData {
  rut: string;
  contraseña: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    rut: '',
    contraseña: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { width: windowWidth } = useWindowDimensions();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription.remove();
  }, []);

  const updateLayout = () => {
    // The width will be automatically updated by useWindowDimensions
  };

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.rut || !formData.contraseña) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rut: formData.rut,
          contraseña: formData.contraseña,
        }),
      });
  
      if (response.ok) {
        const userData = await response.json();
        if (userData.token) {
          await AsyncStorage.setItem('token', userData.token);
          Alert.alert('Éxito', 'Inicio de sesión exitoso.');
          router.push('/home');
        } else {
          setErrorMessage('No se recibió un token válido del servidor.');
        }
      } else if (response.status === 403) {
        setErrorMessage('Tu cuenta aún no ha sido validada. Contacta al administrador.');
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || 'Hubo un problema al iniciar sesión. Verifica tus credenciales.'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Hubo un problema con la solicitud. Por favor, intenta nuevamente.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.leftSection}>
          {isMobile && (
            <Image
              source={require('@/assets/images/logo-muni-bw.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          )}
          <Text style={styles.loginHeader}>Inicio de Sesión</Text>
          <Text style={styles.loginSubtext}>
            Accede a tu cuenta.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>RUT (sin puntos y con guión)</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="RUT"
                placeholderTextColor="#A0A0A0"
                value={formData.rut}
                onChangeText={(value) => handleInputChange('rut', value)}
              />
            </View>

            <Text style={styles.inputLabel}>Contraseña</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={!showPassword}
                value={formData.contraseña}
                onChangeText={(value) => handleInputChange('contraseña', value)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#A0A0A0" />
              </TouchableOpacity>
            </View>
          </View>

          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleSubmit}
          >
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/auth/ForgotPassword')}>
            <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/auth/Register')}>
            <Text style={styles.linkText}>¿No tienes una cuenta? Regístrate</Text>
          </TouchableOpacity>

        </View>

        {!isMobile && (
          <View style={styles.rightSection}>
            <ImageBackground
              source={require('@/assets/images/logo-muni-bw.png')}
              style={styles.rightImage}
              resizeMode='contain'
            />
          </View>
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  leftSection: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    backgroundColor: '#47b564',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightImage: {    
    width: '90%',
    height: '90%',
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  loginHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loginSubtext: {
    fontSize: 25,
    color: '#666',
    marginBottom: 32,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  loginButton: {
    backgroundColor: '#47b564',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#7C3AED',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginForm;

