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
  ScrollView,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

interface FormData {
  rut: string;
  primer_nombre: string;
  segundo_nombre: string;
  tercer_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  ciudad: string;
  comuna: string;
  direccion: string;
  telefono: string;
  celular: string;
  correo: string;
  contrasena: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    rut: '',
    primer_nombre: '',
    segundo_nombre: '',
    tercer_nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_nacimiento: '',
    ciudad: '',
    comuna: '',
    direccion: '',
    telefono: '',
    celular: '',
    correo: '',
    contrasena: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { width: windowWidth } = useWindowDimensions();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isMobile = windowWidth < 768;

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const requiredFields = [
      'rut',
      'primer_nombre',
      'apellido_paterno',
      'apellido_materno',
      'fecha_nacimiento',
      'ciudad',
      'comuna',
      'direccion',
      'celular',
      'correo',
      'contrasena',
    ];
  
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        setErrorMessage(`El campo ${field.replace('_', ' ')} es obligatorio.`);
        return;
      }
    }
  
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        Alert.alert('Registro exitoso', '¡El usuario ha sido registrado con éxito!');
        router.push('/auth/Login');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData?.message || 'Hubo un problema al registrarse. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
      setErrorMessage('Hubo un problema en la conexión. Intenta nuevamente.');
    }
  };

  const renderInput = (field: keyof FormData, label: string, placeholder: string, isPassword: boolean = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          secureTextEntry={isPassword && !showPassword}
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#A0A0A0" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

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
          <Text style={styles.loginHeader}>Cree su Cuenta</Text>
          <Text style={styles.loginSubtext}>
            Ingrese Sus Datos Para Crear Su Cuenta
          </Text>

          {currentStep === 0 && (
            <>
              {renderInput('rut', 'RUT (sin puntos y con guíon)', 'RUT')}
              {renderInput('primer_nombre', 'Primer Nombre', 'Primer Nombre')}
            </>
          )}
          {currentStep === 1 && (
            <>
              {renderInput('segundo_nombre', 'Segundo Nombre', 'Segundo Nombre')}
              {renderInput('tercer_nombre', 'Tercer Nombre (No Obligatorio)', 'Tercer Nombre')}
            </>
          )}
          {currentStep === 2 && (
            <>
              {renderInput('apellido_paterno', 'Apellido Paterno', 'Apellido Paterno')}
              {renderInput('apellido_materno', 'Apellido Materno', 'Apellido Materno')}
            </>
          )}
          {currentStep === 3 && (
            <>
              {renderInput('fecha_nacimiento', 'Fecha de Nacimiento', 'Fecha de Nacimiento')}
              {renderInput('ciudad', 'Ciudad', 'Ciudad')}
            </>
          )}
          {currentStep === 4 && (
            <>
              {renderInput('comuna', 'Comuna', 'Comuna')}
              {renderInput('direccion', 'Dirección', 'Dirección')}
            </>
          )}
          {currentStep === 5 && (
            <>
              {renderInput('telefono', 'Teléfono Fijo', 'Teléfono')}
              {renderInput('celular', 'Celular', 'Celular')}
            </>
          )}
          {currentStep === 6 && (
            <>
              {renderInput('correo', 'Correo Electrónico', 'Correo Electrónico')}
              {renderInput('contrasena', 'Contraseña', 'Contraseña', true)}
            </>
          )}

          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          <View style={styles.buttonContainer}>
            {currentStep > 0 && (
              <TouchableOpacity 
                style={[styles.button, styles.backButton]}
                onPress={handleBack}
              >
                <Text style={styles.buttonText}>Volver</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={[styles.button, styles.nextButton]}
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>{currentStep < 6 ? "Siguiente" : "Registrar"}</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity onPress={() => router.push('/auth/Login')}>
            <Text style={styles.linkText}>Ya tengo una cuenta</Text>
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
    alignItems: 'center'
  },
  rightImage: {
    width: '90%',
    height: '90%'
  },
  content: {
    padding: 40,
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
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
    padding: 4
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#47b564',
    marginRight: 8,
  },
  nextButton: {
    backgroundColor: '#47b564',
    marginLeft: 8,
  },
  buttonText: {
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

export default RegisterForm;

