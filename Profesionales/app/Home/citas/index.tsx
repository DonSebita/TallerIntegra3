import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AgregarEventoModal from '@/components/modal/AgregarEventoModal';
const Citas = () => {
  const [eventos, setEventos] = useState([
    // Datos de ejemplo para los eventos
    { id: '1', summary: 'Evento 1', start: { dateTime: '2024-10-21T10:00:00' } },
    { id: '2', summary: 'Evento 2', start: { dateTime: '2024-10-21T14:00:00' } },
    { id: '3', summary: 'Evento 3', start: { dateTime: '2024-10-22T12:00:00' } },
  ]);
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventosDelDia, setEventosDelDia] = useState([]); // Estado para eventos del día seleccionado

  useEffect(() => {
    const obtenerEventos = async () => {
      // Lógica para obtener eventos (puedes agregarla aquí)
      setCargando(false); // Cambia esto según sea necesario
    };

    obtenerEventos();
  }, []);

  const agregarEvento = (nuevoEvento:any) => {
    console.log('Evento a agregar:', nuevoEvento);
    setModalVisible(false);
  };

  const handleDayPress = (day:any) => {
    if (selectedDate === day.dateString) {
      // Si se hace doble clic en el mismo día, deselecciona
      setSelectedDate('');
      setEventosDelDia([]); // Restablecer los eventos del día seleccionado
    } else {
      // Actualiza la fecha seleccionada
      setSelectedDate(day.dateString);
      
      // Filtra los eventos del día seleccionado
      const eventosFiltrados:any = eventos.filter(evento =>
        evento.start.dateTime.startsWith(day.dateString)
      );
      setEventosDelDia(eventosFiltrados); // Actualiza el estado con los eventos filtrados
    }
  };

  const mostrarEventos = selectedDate ? eventosDelDia : eventos; // Muestra eventos del día seleccionado o todos los eventos

  return (
    <View style={{ padding: 20 }}>
      <Button title="Agregar Evento" onPress={() => setModalVisible(true)} />
      <AgregarEventoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddEvent={agregarEvento}
      />
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
        style={{ marginVertical: 20 }}
      />
      <Text style={{ fontSize: 18, marginVertical: 10 }}>
        {selectedDate ? `Eventos para el ${selectedDate}:` : 'Todos los Eventos:'}
      </Text>
      {cargando ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={mostrarEventos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.summary}</Text>
              <Text>{item.start.dateTime}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>No hay eventos para esta fecha.</Text>}
        />
      )}
    </View>
  );
};

export default Citas;
