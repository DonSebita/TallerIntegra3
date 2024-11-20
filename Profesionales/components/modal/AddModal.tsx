import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DatePickerInput } from 'react-native-paper-dates';
import { Provider as PaperProvider } from 'react-native-paper';
interface ModalRegistroUsuarioProps {
  onCancel: () => void;
  onSave: (userData: any) => void;
}

const ModalRegistroUsuario: React.FC<ModalRegistroUsuarioProps> = ({
  onCancel,
  onSave,
}) => {
  const [formData, setFormData] = useState({
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
    correo: '',
    telefono: '',
    celular: '',
    contrasena: '',
    rol: '',
  });
  
  const [fecha_nacimiento, setInputDate] = React.useState(undefined)

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }

      const data = await response.json();
      console.log('Usuario registrado:', data);

      onSave(data); // Notifica al componente padre si es necesario
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Nuevo Usuario</Text>
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="RUT"
              value={formData.rut}
              onChangeText={(value) => handleInputChange('rut', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Primer Nombre"
              value={formData.primer_nombre}
              onChangeText={(value) => handleInputChange('primer_nombre', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Segundo Nombre"
              value={formData.segundo_nombre}
              onChangeText={(value) => handleInputChange('segundo_nombre', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tercer Nombre"
              value={formData.tercer_nombre}
              onChangeText={(value) => handleInputChange('tercer_nombre', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido Paterno"
              value={formData.apellido_paterno}
              onChangeText={(value) =>
                handleInputChange('apellido_paterno', value)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido Materno"
              value={formData.apellido_materno}
              onChangeText={(value) =>
                handleInputChange('apellido_materno', value)
              }
            />

            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', }}>
              <DatePickerInput
                locale="es"
                label="Fecha Nacimiento"
                value={fecha_nacimiento}
                onChange={(d : any) => setInputDate(d)}
                inputMode="start"
                style={styles.fechaN}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Ciudad"
              value={formData.ciudad}
              onChangeText={(value) => handleInputChange('ciudad', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Comuna"
              value={formData.comuna}
              onChangeText={(value) => handleInputChange('comuna', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Dirección"
              value={formData.direccion}
              onChangeText={(value) => handleInputChange('direccion', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={formData.telefono}
              onChangeText={(value) => handleInputChange('telefono', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Celular"
              value={formData.celular}
              onChangeText={(value) => handleInputChange('celular', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={formData.correo}
              onChangeText={(value) => handleInputChange('correo', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={formData.contrasena}
              onChangeText={(value) => handleInputChange('contrasena', value)}
            />
            <Picker
              selectedValue={formData.rol}
              style={styles.picker}
              onValueChange={(value) => handleInputChange('rol', value)}
            >
              <Picker.Item label="Usuario" value="usuario" />
              <Picker.Item label="Administrador" value="admin" />
            </Picker>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dateText: {
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  fechaN:{
    backgroundColor: 'white',  // Cambia este valor al color de fondo que prefieras
    borderColor: 'gray',      // Si deseas un borde, agrega color de borde
    borderWidth: 1,           // Grosor del borde
    borderRadius: 5,          // Esquinas redondeadas, si es necesario
  }
});

export default ModalRegistroUsuario;
