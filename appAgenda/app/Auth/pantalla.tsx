import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Button, Modal, Portal, Text, Provider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const AgendarHora: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const professionals = [
    { label: 'Profesional 1', value: 'profesional1' },
    { label: 'Profesional 2', value: 'profesional2' },
    { label: 'Profesional 3', value: 'profesional3' },
  ];

  const services = [
    { label: 'Servicio A', value: 'servicioA' },
    { label: 'Servicio B', value: 'servicioB' },
    { label: 'Servicio C', value: 'servicioC' },
  ];

  const locations = [
    { label: 'Lugar 1', value: 'lugar1' },
    { label: 'Lugar 2', value: 'lugar2' },
    { label: 'Lugar 3', value: 'lugar3' },
  ];

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleDateChange = (event: any, date?: Date | undefined) => {
    setDatePickerVisible(false);
    if (date) setSelectedDate(date);
  };

  const handleTimeChange = (event: any, time?: Date | undefined) => {
    setTimePickerVisible(false);
    if (time) setSelectedTime(time);
  };

  const handleSubmit = () => {
    hideModal();
    console.log('Agendado:', { name, email, selectedDate, selectedTime, selectedProfessional, selectedService, selectedLocation });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Button mode="contained" onPress={showModal} style={styles.primaryButton}>Agendar Hora</Button>

        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
            <Text style={styles.title}>Agendar una nueva hora</Text>

            <TextInput
              label="Nombre"
              value={name}
              onChangeText={text => setName(text)}
              style={styles.input}
              theme={{ colors: { primary: '#008C45' }}}
            />

            <TextInput
              label="Correo Electrónico"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
              theme={{ colors: { primary: '#008C45' }}}
            />

            <RNPickerSelect
              onValueChange={value => setSelectedProfessional(value)}
              items={professionals}
              placeholder={{ label: "Seleccionar Profesional", value: null }}
              style={pickerSelectStyles}
            />

            <RNPickerSelect
              onValueChange={value => setSelectedService(value)}
              items={services}
              placeholder={{ label: "Seleccionar Servicio", value: null }}
              style={pickerSelectStyles}
            />

            <RNPickerSelect
              onValueChange={value => setSelectedLocation(value)}
              items={locations}
              placeholder={{ label: "Seleccionar Lugar", value: null }}
              style={pickerSelectStyles}
            />

            <Button mode="outlined" onPress={() => setDatePickerVisible(true)} style={styles.input}>
              Seleccionar Fecha: {selectedDate.toLocaleDateString()}
            </Button>

            <Button mode="outlined" onPress={() => setTimePickerVisible(true)} style={styles.input}>
              Seleccionar Hora: {selectedTime.toLocaleTimeString()}
            </Button>

            {datePickerVisible && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
            )}

            {timePickerVisible && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeChange}
              />
            )}

            <Button mode="contained" onPress={handleSubmit} style={styles.primaryButton}>
              Confirmar Agendamiento
            </Button>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F2F2F2', // Fondo en gris claro
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#008C45', // Verde Temuco
  },
  input: {
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#008C45', // Verde Temuco
    marginVertical: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
});

export default AgendarHora;
