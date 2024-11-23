import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  AccessibilityInfo,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import LoginButton from "@/components/Buttons/LoginButton";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [windowWidth, setWindowWidth] = useState<number>(Dimensions.get('window').width);
  const [isScreenReaderEnabled, setScreenReaderEnabled] = useState<boolean>(false);

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
        router.push('/Auth');
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

  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(Dimensions.get('window').width);
    };

    const subscription = Dimensions.addEventListener('change', updateDimensions);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
      setScreenReaderEnabled(enabled);
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      accessible
      accessibilityLabel="Formulario para restablecer contraseña"
    >
      <Image
        source={require('@/assets/images/logo-muni.png')}
        style={[
          styles.logo,
          { width: isMobile ? '70%' : '35%', height: isMobile ? '20%' : 'auto' },
        ]}
        accessibilityLabel="Logo de la aplicación"
      />

      <View
        style={[styles.form, isMobile ? { width: '100%' } : { width: '45%' }]}
        accessible
        accessibilityRole="form"
      >
        <Text
          style={[styles.titulo, { fontSize: isMobile ? 30 : 50 }]}
          accessibilityRole="header"
        >
          Creación de Nueva Contraseña
        </Text>
        <Text
          style={[styles.subTitle, { fontSize: isMobile ? 20 : 30 }]}
          accessibilityLabel="Ingrese su código de validación y su nueva contraseña"
        >
          Ingrese su código de validación y su nueva contraseña
        </Text>

        <View style={[{ width: '100%' }, { alignItems: 'flex-start' }]}>
          <Text
            style={[{ fontWeight: 'bold' }, { fontSize: 18 }]}
            accessibilityLabel="Etiqueta del campo código de validación"
          >
            Código de Validación
          </Text>
          <TextInput
            placeholder="Código de Validación"
            style={[styles.textInput, { fontSize: isMobile ? 16 : 20 }]}
            value={formData.token}
            onChangeText={(value) => handleInputChange('token', value)}
            accessibilityLabel="Campo de entrada para el código de validación"
            accessible
          />
          <Text
            style={[{ fontWeight: 'bold' }, { fontSize: 18 }]}
            accessibilityLabel="Etiqueta del campo nueva contraseña"
          >
            Nueva Contraseña
          </Text>
          <TextInput
            placeholder="Contraseña"
            secureTextEntry={true}
            style={[styles.textInput, { fontSize: isMobile ? 16 : 20 }]}
            value={formData.contraseña}
            onChangeText={(value) => handleInputChange('contraseña', value)}
            accessibilityLabel="Campo de entrada para la nueva contraseña"
            accessible
          />
        </View>

        <LoginButton
          text="Crear Contraseña"
          onPress={handleSubmit}
          accessibilityLabel="Botón para enviar el formulario y crear una nueva contraseña"
        />

        {errorMessage && (
          <Text
            style={styles.errorText}
            accessibilityLabel={`Mensaje de error: ${errorMessage}`}
            accessible
          >
            {errorMessage}
          </Text>
        )}
      </View>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    resizeMode: 'contain',
  },
  form: {
    alignItems: 'center',
  },
  titulo: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    color: '#34434D',
  },
  subTitle: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: '2%',
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '100%',
    height: 50,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: '5%',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ResetPasswordForm;
