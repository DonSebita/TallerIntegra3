import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  ImageBackground,
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

interface FormData {
  correo: string;
}

const ForgotPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    correo: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { width: windowWidth } = useWindowDimensions();

  const isMobile = windowWidth < 768;

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.correo) {
      setErrorMessage('Por favor, ingresa tu correo electrónico.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/password/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: formData.correo,
        }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Se ha enviado un correo con las instrucciones para restablecer tu contraseña.');
        router.push('/auth/ResetPassword');
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || 'Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.'
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
          <Text style={styles.loginHeader}>Recuperación de Contraseña</Text>
          <Text style={styles.loginSubtext}>
            Ingresa tu correo para restablecer tu contraseña.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Correo Electrónico</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                placeholderTextColor="#A0A0A0"
                value={formData.correo}
                onChangeText={(value) => handleInputChange('correo', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit}
          >
            <Text style={styles.loginButtonText}>Restablecer Contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/auth/Login')}>
            <Text style={styles.linkText}>Volver al inicio de sesión</Text>
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
  content: {
    padding: 40,
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
    alignItems: 'center'
  },
  rightImage: {
    width: '90%',
    height: '90%'
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
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
  },
  input: {
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#47b564',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
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

export default ForgotPasswordForm;

