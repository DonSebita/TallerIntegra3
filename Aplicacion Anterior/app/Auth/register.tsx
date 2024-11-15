import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import { router } from 'expo-router';

// Define el tipo de datos que manejará el formulario
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
  contrasena: string;  // Debe coincidir con el backend
}

const RegistroForm: React.FC = () => {
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
    contrasena: '',  // Asegúrate de que el nombre coincida con el backend
  });

  const [currentStep, setCurrentStep] = useState(0); // Controla qué campo se muestra actualmente

  // Detecta el ancho de la pantalla para ajustar el diseño
  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth < 768;  // Considera una pantalla móvil si es menor a 768px

  const fields = [
    { label: 'RUT', name: 'rut' },
    { label: 'Primer Nombre', name: 'primer_nombre' },
    { label: 'Segundo Nombre', name: 'segundo_nombre' },
    { label: 'Tercer Nombre', name: 'tercer_nombre' },
    { label: 'Apellido Paterno', name: 'apellido_paterno' },
    { label: 'Apellido Materno', name: 'apellido_materno' },
    { label: 'Fecha de Nacimiento', name: 'fecha_nacimiento' },
    { label: 'Ciudad', name: 'ciudad' },
    { label: 'Comuna', name: 'comuna' },
    { label: 'Dirección', name: 'direccion' },
    { label: 'Teléfono', name: 'telefono' },
    { label: 'Celular', name: 'celular' },
    { label: 'Correo', name: 'correo' },
    { label: 'Contraseña', name: 'contrasena' },  // Debe coincidir con 'contrasena' en el backend
  ];

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (currentStep < fields.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit(); // Enviar el formulario cuando se alcance el último paso
    }
  };

  const handleSubmit = async () => {










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
        router.push('/');  
      } else {
        Alert.alert('Error', 'Hubo un problema al registrarse');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema en la conexión');
    }
  };

  return (
    <View style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
      <Image
        source={require('../../assets/images/logo-muni.png')} // Ajusta la ruta según tu estructura
        style={isMobile ? styles.mobileLogo : styles.desktopLogo}
      />
      <View style={isMobile ? styles.mobileInputContainer : styles.desktopInputContainer}>
        <Text style={styles.label}>{fields[currentStep].label}</Text>
        <TextInput
          style={styles.input}
          value={formData[fields[currentStep].name as keyof FormData]}
          onChangeText={(value) => handleInputChange(fields[currentStep].name as keyof FormData, value)}
          placeholder={`Ingrese ${fields[currentStep].label}`}
        />
        <Button
          title={currentStep < fields.length - 1 ? 'Siguiente' : 'Registrar'}
          onPress={handleNext}
        />




































      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  desktopContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  mobileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  desktopLogo: {
    width: 400,
    height: 260,
    marginBottom: 20,
  },
  mobileLogo: {
    width: 200,
    height: 110,
    marginBottom: 20,
  },
  desktopInputContainer: {
    width: '40%',
    marginBottom: 20,
    justifyContent: 'center',
  },
  mobileInputContainer: {
    width: '90%',
    marginBottom: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20, // Aumenta el padding para hacerlo más cómodo
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 24, // Letra más grande
    textAlign: 'center',
    fontFamily: 'Helvetica', // Usa la fuente Helvetica
  },
  label: {
    fontSize: 30,  // Letra más grande para los títulos
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Helvetica',  // Usa la fuente Helvetica

  },
});

export default RegistroForm;