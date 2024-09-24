import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

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
    <ImageBackground
      source={require('../../assets/images/logo-temuco-1024x791.png')} // Imagen como fondo
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Registro</Text>
            <Text style={styles.title}>Municipalidad</Text>
          </View>
          
          <Text style={styles.label}>Nombres</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombres"
            placeholderTextColor="#A9A9A9"
            value={formData.nombres}
            onChangeText={(value) => handleInputChange('nombres', value)}
          />

          <Text style={styles.label}>Apellidos</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            placeholderTextColor="#A9A9A9"
            value={formData.apellidos}
            onChangeText={(value) => handleInputChange('apellidos', value)}
          />

          <Text style={styles.label}>Fecha de Nacimiento</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#A9A9A9"
            value={formData.fechaNacimiento}
            onChangeText={(value) => handleInputChange('fechaNacimiento', value)}
          />

          <Text style={styles.label}>Comuna</Text>
          <TextInput
            style={styles.input}
            placeholder="Comuna"
            placeholderTextColor="#A9A9A9"
            value={formData.comuna}
            onChangeText={(value) => handleInputChange('comuna', value)}
          />

          <Text style={styles.label}>Ciudad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            placeholderTextColor="#A9A9A9"
            value={formData.ciudad}
            onChangeText={(value) => handleInputChange('ciudad', value)}
          />

          <Text style={styles.label}>Dirección</Text>
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            placeholderTextColor="#A9A9A9"
            value={formData.direccion}
            onChangeText={(value) => handleInputChange('direccion', value)}
          />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            keyboardType="phone-pad"
            placeholderTextColor="#A9A9A9"
            value={formData.telefono}
            onChangeText={(value) => handleInputChange('telefono', value)}
          />

          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            keyboardType="email-address"
            placeholderTextColor="#A9A9A9"
            value={formData.correo}
            onChangeText={(value) => handleInputChange('correo', value)}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            placeholderTextColor="#A9A9A9"
            value={formData.contraseña}
            onChangeText={(value) => handleInputChange('contraseña', value)}
          />

          <Button title="Registrar" color="#228B22" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center', // Centrar contenido horizontalmente
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxWidth: 400, // Limitar el ancho del formulario para pantallas grandes
  },
  titleContainer: {
    backgroundColor: 'rgba(34, 139, 34, 0.9)', // Verde fuerte y más opaco
    paddingVertical: 20, // Aumentar padding vertical
    paddingHorizontal: 40, // Aumentar padding horizontal para cubrir bien el texto
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center', // Centrar el texto en el recuadro
  },
  title: {
    fontSize: 32, // Título más grande
    fontWeight: 'bold',
    color: '#FFF', // Texto blanco para buen contraste
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A9A9A9', // Borde gris suave
    backgroundColor: '#FFF', // Mantiene fondo blanco solo en los campos de texto
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    color: '#333', // Texto en gris oscuro
    fontSize: 16, // Hacer el texto más grande
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#228B22', // Verde natural para las etiquetas
    fontSize: 18, // Etiquetas más grandes
  },
});

export default RegistroForm;
