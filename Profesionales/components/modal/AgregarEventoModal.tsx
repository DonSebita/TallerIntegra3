import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AgregarEventoModal = ({ visible, onClose, onAddEvent }:any) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState(''); // Nuevo estado para la descripción
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = () => {
    const evento = {
      summary: titulo,
      description: descripcion, // Agregar la descripción al evento
      start: {
        dateTime: `${fecha}T${hora}:00`, // Formato ISO
      },
      end: {
        dateTime: `${fecha}T${hora}:00`, // Ajustar si es necesario
      },
    };

    onAddEvent(evento);
    onClose(); // Cerrar el modal después de agregar el evento
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Agregar Evento</Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <TextInput
            style={styles.input}
            placeholder="Fecha (YYYY-MM-DD)"
            value={fecha}
            onChangeText={setFecha}
          />
          <TextInput
            style={styles.input}
            placeholder="Hora (HH:MM)"
            value={hora}
            onChangeText={setHora}
          />
          <Button title="Agregar Evento" onPress={handleSubmit} />
          <Button title="Cancelar" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AgregarEventoModal;
