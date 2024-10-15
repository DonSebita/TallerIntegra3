import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Button, Modal, Portal, Text, Provider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const AgendarHora: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

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
    console.log('Agendado:', { name, email, selectedDate, selectedTime });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Button mode="contained" onPress={showModal}>Agendar Hora</Button>

        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
            <Text style={styles.title}>Agendar una nueva hora</Text>

            <TextInput
              label="Nombre"
              value={name}
              onChangeText={text => setName(text)}
              style={styles.input}
            />

            <TextInput
              label="Correo Electrónico"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
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

            <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
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
  },
  input: {
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default AgendarHora;
