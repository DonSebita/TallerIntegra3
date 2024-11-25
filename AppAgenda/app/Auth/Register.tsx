import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import LoginButton from "@/components/Buttons/LoginButton";
import { Checkbox } from "@/components/ui/checkbox";


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

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(Dimensions.get('window').width);
  const [windowHeight, setWindowHeight] = useState<number>(Dimensions.get('window').height);
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
      handleSubmit(); // Enviar el formulario cuando se alcance el último paso
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Validar que todos los campos requeridos estén completos
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
        Alert.alert('Error', `El campo ${field.replace('_', ' ')} es obligatorio.`);
        return;
      }
    }
  
    // Intentar enviar los datos al backend
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        Alert.alert('Registro exitoso', '¡El usuario ha sido registrado con éxito!');
        router.push('/Auth'); // Redirigir al login
      } else {
        const errorData = await response.json();
        // Manejar errores específicos devueltos por el servidor
        const message =
          errorData?.message || 'Hubo un problema al registrarse. Intenta nuevamente.';
        Alert.alert('Error', message);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
      Alert.alert('Error', 'Hubo un problema en la conexión. Intenta nuevamente.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };  

  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(Dimensions.get('window').width);
      setWindowHeight(Dimensions.get('window').height);
    };

    const subscription = Dimensions.addEventListener('change', updateDimensions);
    return () => subscription.remove();
  }, []);

  return (
    <View
      style={[
        styles.container,
        isMobile ? styles.mobileContainer : styles.desktopContainer,
        { justifyContent: isMobile ? 'flex-start' : 'space-between' },
      ]}
    >
      <Image
        source={require('@/assets/images/logo-muni.png')}
        style={[
          styles.logo,
          { width: isMobile ? '70%' : '35%', height: isMobile ? '20%' : 'auto' },
        ]}
      />

      <View style={[styles.form, isMobile ? { width: '100%' } : { width: '45%' }]}>
        <Text style={[styles.titulo, { fontSize: isMobile ? 30 : 50 }]}>Cree su Cuenta</Text>
        <Text style={[styles.subTitle, { fontSize: isMobile ? 20 : 30 }]}>Ingrese Sus Datos Para Crear Su Cuenta</Text>

        <View style={[{ width: '100%' }, { alignItems: 'flex-start' }]}>
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 0 ? 'flex' : 'none' }]}>RUT (sin puntos y con guíon)</Text>
          <TextInput
            placeholder="RUT"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 0 ? 'flex' : 'none' },
            ]}
            value={formData.rut as keyof FormData}
            onChangeText={(value) => handleInputChange('rut' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 0 ? 'flex' : 'none' }]}>Primer Nombre</Text>
          <TextInput
            placeholder="Primer Nombre"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 0 ? 'flex' : 'none' },
            ]}
            value={formData.primer_nombre as keyof FormData}
            onChangeText={(value) => handleInputChange('primer_nombre' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 1 ? 'flex' : 'none' }]}>Segundo Nombre</Text>
          <TextInput
            placeholder="Segundo Nombre"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 1 ? 'flex' : 'none' },
            ]}
            value={formData.segundo_nombre as keyof FormData}
            onChangeText={(value) => handleInputChange('segundo_nombre' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 1 ? 'flex' : 'none' }]}>Tercer Nombre (No Obligatorio)</Text>
          <TextInput
            placeholder="Tercer Nombre"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 1 ? 'flex' : 'none' },
            ]}
            value={formData.tercer_nombre as keyof FormData}
            onChangeText={(value) => handleInputChange('tercer_nombre' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 2 ? 'flex' : 'none' }]}>Apellido Paterno</Text>
          <TextInput
            placeholder="Apellido Paterno"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 2 ? 'flex' : 'none' },
            ]}
            value={formData.apellido_paterno as keyof FormData}
            onChangeText={(value) => handleInputChange('apellido_paterno' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 2 ? 'flex' : 'none' }]}>Apellido Materno</Text>
          <TextInput
            placeholder="Apellido Materno"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 2 ? 'flex' : 'none' },
            ]}
            value={formData.apellido_materno as keyof FormData}
            onChangeText={(value) => handleInputChange('apellido_materno' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 3 ? 'flex' : 'none' }]}>Fecha de Nacimiento</Text>
          <TextInput
            placeholder="Fecha de Nacimiento"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 3 ? 'flex' : 'none' },
            ]}
            value={formData.fecha_nacimiento as keyof FormData}
            onChangeText={(value) => handleInputChange('fecha_nacimiento' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 3 ? 'flex' : 'none' }]}>Ciudad</Text>
          <TextInput
            placeholder="Ciudad"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 3 ? 'flex' : 'none' },
            ]}
            value={formData.ciudad as keyof FormData}
            onChangeText={(value) => handleInputChange('ciudad' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 4 ? 'flex' : 'none' }]}>Comuna</Text>
          <TextInput
            placeholder="Comuna"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 4 ? 'flex' : 'none' },
            ]}
            value={formData.comuna as keyof FormData}
            onChangeText={(value) => handleInputChange('comuna' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 4 ? 'flex' : 'none' }]}>Dirección</Text>
          <TextInput
            placeholder="Dirección"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 4 ? 'flex' : 'none' },
            ]}
            value={formData.direccion as keyof FormData}
            onChangeText={(value) => handleInputChange('direccion' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 5 ? 'flex' : 'none' }]}>Teléfono Fijo</Text>
          <TextInput
            placeholder="Teléfono"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 5 ? 'flex' : 'none' },
            ]}
            value={formData.telefono as keyof FormData}
            onChangeText={(value) => handleInputChange('telefono' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 5 ? 'flex' : 'none' }]}>Celular</Text>
          <TextInput
            placeholder="Celular"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 5 ? 'flex' : 'none' },
            ]}
            value={formData.celular as keyof FormData}
            onChangeText={(value) => handleInputChange('celular' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 6 ? 'flex' : 'none' }]}>Correo Electronico</Text>
          <TextInput
            placeholder="Correo Electronico"
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 6 ? 'flex' : 'none' },
            ]}
            value={formData.correo as keyof FormData}
            onChangeText={(value) => handleInputChange('correo' as keyof FormData, value)}
          />
          <Text style={[{ fontWeight: 'bold' }, { fontSize: 18 }, { display: currentStep === 6 ? 'flex' : 'none' }]}>Contraseña</Text>
          <TextInput
            placeholder="Contraseña"
            secureTextEntry={true}
            style={[
              styles.textInput,
              { fontSize: isMobile ? 16 : 20 },
              { display: currentStep === 6 ? 'flex' : 'none' },
            ]}
            value={formData.contrasena as keyof FormData}
            onChangeText={(value) => handleInputChange('contrasena' as keyof FormData, value)}
          />
        </View>
        <View style={[styles.checkboxContainer, { display: currentStep === 6 ? 'flex' : 'none' },]}>
            <Checkbox
              id="show-password"
              checked={showPassword}
              onCheckedChange={togglePasswordVisibility}
            />
            <Text style={styles.checkboxLabel} onPress={togglePasswordVisibility}>
              Mostrar contraseña
            </Text>
        </View>

        <View style={[styles.buttons]}>
          {currentStep > 0 && (
            <View style={{ flex: 1, marginRight: 10 }}>
              <LoginButton 
                text="Volver" 
                onPress={handleBack} 
                style={{ height: 50, width: '100%' }} // Ajuste de tamaño
              />
            </View>
          )}
          <View style={{ flex: 1, marginLeft: currentStep > 0 ? 10 : 0 }}>
            <LoginButton 
              text={currentStep < 6 ? "Siguiente" : "Registrar"} 
              onPress={handleNext} 
              style={{ height: 50, width: '100%' }} // Ajuste de tamaño
            />
          </View>
        </View>


        
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity onPress={() => router.push('/Auth')}>
          <Text style={[styles.forgotPassword, { fontSize: isMobile ? 14 : 16 }]}>
            Ya tengo una cuenta.
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  desktopContainer: {
    flexDirection: 'row',
    padding: '10%',
  },
  mobileContainer: {
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
  form: {
    alignItems: 'center',
  },
  titulo: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#34434D',
  },
  subTitle: {
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
  forgotPassword: {
    color: '#007AFF',
    marginTop: 10,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#34434D',
  },
});

export default RegistroForm;
