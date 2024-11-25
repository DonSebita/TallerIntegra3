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
import { Feather } from '@expo/vector-icons';

interface FormData {
  token: string;
  contraseña: string;
}

const ResetPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    token: '',
    contraseña: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {width: windowWidth } = useWindowDimensions();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isMobile = windowWidth < 768;

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.token || !formData.contraseña) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:3000/api/password/reset-password/${formData.token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contraseña: formData.contraseña }),
        }
      );
  
      if (response.ok) {
        Alert.alert('Éxito', 'Contraseña actualizada correctamente');
        router.push('/auth/Login');
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || 'Hubo un problema al actualizar la contraseña.'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Hubo un problema con la solicitud. Intenta nuevamente.');
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
          <Text style={styles.title}>Creación de Nueva Contraseña</Text>
          <Text style={styles.subTitle}>Ingrese su código de validación y su nueva contraseña</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Código de Validación</Text>
            <TextInput
              placeholder="Código de Validación"
              style={styles.textInput}
              value={formData.token}
              onChangeText={(value) => handleInputChange('token', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nueva Contraseña</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                placeholder="Contraseña"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
                value={formData.contraseña}
                onChangeText={(value) => handleInputChange('contraseña', value)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#A0A0A0" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Crear Contraseña</Text>
          </TouchableOpacity>

          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

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
    backgroundColor: '#FFFFFF',
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#34434D',
  },
  subTitle: {
    fontSize: 25,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#34434D',
  },
  textInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  submitButton: {
    backgroundColor: '#47b564',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  linkText: {
    color: '#7C3AED',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default ResetPasswordForm;

