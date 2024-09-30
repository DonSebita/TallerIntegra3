import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, ImageBackground, Alert } from 'react-native';

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
  sector_id: string;
  telefono: string;
  celular: string;
  correo: string;
  contraseña: string;
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
    sector_id: '',
    telefono: '',
    celular: '',
    correo: '',
    contraseña: '',
  });

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
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
        Alert.alert('Registro exitoso', 'El usuario ha sido registrado correctamente');
      } else {
        Alert.alert('Error', 'Hubo un problema al registrar el usuario');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema con la solicitud');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/logo-temuco-1024x791.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Registro</Text>
            <Text style={styles.title}>Municipalidad</Text>
          </View>
          
          <Text style={styles.label}>RUT</Text>
          <TextInput
            style={styles.input}
            placeholder="RUT"
            placeholderTextColor="#A9A9A9"
            value={formData.rut}
            onChangeText={(value) => handleInputChange('rut', value)}
          />

          <Text style={styles.label}>Primer Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Primer Nombre"
            placeholderTextColor="#A9A9A9"
            value={formData.primer_nombre}
            onChangeText={(value) => handleInputChange('primer_nombre', value)}
          />

          <Text style={styles.label}>Segundo Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Segundo Nombre"
            placeholderTextColor="#A9A9A9"
            value={formData.segundo_nombre}
            onChangeText={(value) => handleInputChange('segundo_nombre', value)}
          />

          <Text style={styles.label}>Tercer Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Tercer Nombre"
            placeholderTextColor="#A9A9A9"
            value={formData.tercer_nombre}
            onChangeText={(value) => handleInputChange('tercer_nombre', value)}
          />

          <Text style={styles.label}>Apellido Paterno</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellido Paterno"
            placeholderTextColor="#A9A9A9"
            value={formData.apellido_paterno}
            onChangeText={(value) => handleInputChange('apellido_paterno', value)}
          />

          <Text style={styles.label}>Apellido Materno</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellido Materno"
            placeholderTextColor="#A9A9A9"
            value={formData.apellido_materno}
            onChangeText={(value) => handleInputChange('apellido_materno', value)}
          />

          <Text style={styles.label}>Fecha de Nacimiento</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#A9A9A9"
            value={formData.fecha_nacimiento}
            onChangeText={(value) => handleInputChange('fecha_nacimiento', value)}
          />

          <Text style={styles.label}>Ciudad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            placeholderTextColor="#A9A9A9"
            value={formData.ciudad}
            onChangeText={(value) => handleInputChange('ciudad', value)}
          />

          <Text style={styles.label}>Comuna</Text>
          <TextInput
            style={styles.input}
            placeholder="Comuna"
            placeholderTextColor="#A9A9A9"
            value={formData.comuna}
            onChangeText={(value) => handleInputChange('comuna', value)}
          />

          <Text style={styles.label}>Dirección</Text>
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            placeholderTextColor="#A9A9A9"
            value={formData.direccion}
            onChangeText={(value) => handleInputChange('direccion', value)}
          />

          <Text style={styles.label}>Sector ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Sector ID"
            placeholderTextColor="#A9A9A9"
            value={formData.sector_id}
            onChangeText={(value) => handleInputChange('sector_id', value)}
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

          <Text style={styles.label}>Celular</Text>
          <TextInput
            style={styles.input}
            placeholder="Celular"
            keyboardType="phone-pad"
            placeholderTextColor="#A9A9A9"
            value={formData.celular}
            onChangeText={(value) => handleInputChange('celular', value)}
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
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxWidth: 400,
  },
  titleContainer: {
    backgroundColor: 'rgba(34, 139, 34, 0.9)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A9A9A9',
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    color: '#333',
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#228B22',
    fontSize: 18,
  },
});

export default RegistroForm
