import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

interface Day {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface Cita {
  cita_id: number;
  servicio_id: number;
  profesional_id: number;
  fecha_cita: string;
  estado_cita: string;
}

const { width, height } = Dimensions.get('window');

const CitasUsuario = () => {
  const [userId, setUserId] = useState('');
  const [citas, setCitas] = useState<Cita[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar'); // Alternar entre calendario y lista

  const obtenerCitas = async () => {
    if (!userId) {
      Alert.alert('Error', 'Por favor, ingrese el ID del usuario.');
      return;
    }

    try {
      const response = await fetch(`https://backti.duckdns.org/api/citas/usuario/${userId}`);
      if (response.ok) {
        const data: Cita[] = await response.json();
        setCitas(data);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'No se pudieron obtener las citas.');
      }
    } catch (error) {
      console.error('Error al obtener citas:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  // Generar las fechas marcadas para el calendario
  const markedDates = citas.reduce((acc, cita) => {
    const date = cita.fecha_cita.split('T')[0]; // Obtener solo la parte de la fecha
    acc[date] = {
      marked: true,
      selected: selectedDate === date,
      dotColor: selectedDate === date ? 'white' : 'blue',
      selectedColor: selectedDate === date ? 'blue' : undefined,
    };
    return acc;
  }, {} as Record<string, { marked: boolean; selected?: boolean; dotColor: string; selectedColor?: string }>);

  // Filtrar citas para la fecha seleccionada
  const citasPorFecha = selectedDate
    ? citas.filter((cita) => cita.fecha_cita.startsWith(selectedDate))
    : [];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Citas del Usuario</Text>

        <TextInput
          placeholder="ID del Usuario"
          value={userId}
          onChangeText={setUserId}
          style={styles.input}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={obtenerCitas} style={styles.button}>
          <Text style={styles.buttonText}>Mostrar Citas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')}
          style={styles.toggleButton}
        >
          <Text style={styles.buttonText}>
            {viewMode === 'calendar' ? 'Ver como Lista' : 'Ver como Calendario'}
          </Text>
        </TouchableOpacity>

        {viewMode === 'calendar' ? (
          <>
            <Calendar
              markedDates={markedDates}
              onDayPress={(day: Day) => setSelectedDate(day.dateString)} // Seleccionar fecha
              style={styles.calendar}
            />
            <Text style={styles.subTitle}>
              {selectedDate ? `Citas del ${selectedDate}` : 'Seleccione una fecha para ver sus citas'}
            </Text>
            {selectedDate && citasPorFecha.length > 0 ? (
              citasPorFecha.map((item) => (
                <View key={item.cita_id} style={styles.citaItem}>
                  <Text style={styles.citaText}>Fecha: {item.fecha_cita.split('T')[0]}</Text>
                  <Text style={styles.citaText}>Servicio ID: {item.servicio_id}</Text>
                  <Text style={styles.citaText}>Profesional ID: {item.profesional_id}</Text>
                  <Text style={styles.citaText}>Estado: {item.estado_cita}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noCitas}>
                {selectedDate ? 'No hay citas para esta fecha.' : ''}
              </Text>
            )}
          </>
        ) : (
          <>
            <Text style={styles.subTitle}>Todas las citas</Text>
            <FlatList
              data={citas}
              keyExtractor={(item) => item.cita_id.toString()}
              renderItem={({ item }) => (
                <View style={styles.citaItem}>
                  <Text style={styles.citaText}>Fecha: {item.fecha_cita.split('T')[0]}</Text>
                  <Text style={styles.citaText}>Servicio ID: {item.servicio_id}</Text>
                  <Text style={styles.citaText}>Profesional ID: {item.profesional_id}</Text>
                  <Text style={styles.citaText}>Estado: {item.estado_cita}</Text>
                </View>
              )}
              contentContainerStyle={styles.list}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Asegura que ScrollView se expanda
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
    minHeight: height, // Asegura que el contenido ocupe toda la pantalla
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: width * 0.03,
    marginBottom: 15,
    fontSize: width * 0.04,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: width * 0.04,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toggleButton: {
    backgroundColor: '#28a745',
    paddingVertical: width * 0.03,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  calendar: {
    marginTop: 20,
  },
  list: {
    marginTop: 10,
  },
  citaItem: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: width * 0.04,
    marginBottom: 10,
  },
  citaText: {
    fontSize: width * 0.04,
    color: '#333',
    marginBottom: 5,
  },
  noCitas: {
    fontSize: width * 0.045,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CitasUsuario;
