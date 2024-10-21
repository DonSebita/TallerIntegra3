import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, Alert } from 'react-native';

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
        Alert.alert('Registro exitoso', '¡Bienvenido!');
      } else {
        Alert.alert('Error', 'Hubo un problema al registrarse');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema en la conexión');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-muni.png')} // Ajusta la ruta según tu estructura
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  logo: {
    width: 650,
    height: 590,
    marginBottom: 20,
  },
  inputContainer: {
    width: '40%',
    marginBottom: 20,
    height: 200,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default RegistroForm;
