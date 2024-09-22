import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';

// Define el tipo de datos que manejará el formulario
interface FormData {
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  comuna: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  correo: string;
  contraseña: string;
}

// Define las props que recibirá el componente
interface RegisterProps {
  onRegister: (formData: FormData) => void;
}

const RegistroForm: React.FC<RegisterProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState<FormData>({
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    comuna: '',
    ciudad: '',
    direccion: '',
    telefono: '',
    correo: '',
    contraseña: '',
  });

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onRegister(formData); // Llama a la función onRegister con los datos del formulario
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombres</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombres"
        value={formData.nombres}
        onChangeText={(value) => handleInputChange('nombres', value)}
      />

      <Text style={styles.label}>Apellidos</Text>
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={formData.apellidos}
        onChangeText={(value) => handleInputChange('apellidos', value)}
      />

      <Text style={styles.label}>Fecha de Nacimiento</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={formData.fechaNacimiento}
        onChangeText={(value) => handleInputChange('fechaNacimiento', value)}
      />

      <Text style={styles.label}>Comuna</Text>
      <TextInput
        style={styles.input}
        placeholder="Comuna"
        value={formData.comuna}
        onChangeText={(value) => handleInputChange('comuna', value)}
      />

      <Text style={styles.label}>Ciudad</Text>
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={formData.ciudad}
        onChangeText={(value) => handleInputChange('ciudad', value)}
      />

      <Text style={styles.label}>Dirección</Text>
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={formData.direccion}
        onChangeText={(value) => handleInputChange('direccion', value)}
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={formData.telefono}
        onChangeText={(value) => handleInputChange('telefono', value)}
      />

      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        keyboardType="email-address"
        value={formData.correo}
        onChangeText={(value) => handleInputChange('correo', value)}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={formData.contraseña}
        onChangeText={(value) => handleInputChange('contraseña', value)}
      />

      <Button title="Registrar" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default RegistroForm;
