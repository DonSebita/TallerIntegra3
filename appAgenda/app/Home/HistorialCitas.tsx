import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definición de la interfaz para las citas
interface Cita {
  cita_id: number;
  profesional_id: number;
  agenda_id: number;
  fecha_cita: string;
  movilizacion_id: number;
}

const HistorialCitas = () => {
  const [token, setToken] = useState<string | null>(null);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para obtener el token almacenado
  const obtenerToken = async () => {
    try {
      const tokenAlmacenado = await AsyncStorage.getItem('token');
      if (tokenAlmacenado) {
        setToken(tokenAlmacenado);
        obtenerCitas(tokenAlmacenado); // Llama a obtenerCitas con el token
      }
    } catch (error) {
      console.error('Error al obtener el token:', error);
    }
  };

  // Función para obtener citas desde el backend
  const obtenerCitas = async (token: string) => {
    try {
      setLoading(true);
      const response = await fetch('https://tu-backend.com/api/citas', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setCitas(data);
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar obtenerToken cuando el componente se monte
  useEffect(() => {
    obtenerToken();
  }, []);

  // Renderizar los títulos de las columnas de la tabla
  const renderHeader = () => {
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>ID Cita</Text>
        <Text style={styles.tableHeader}>ID Profesional</Text>
        <Text style={styles.tableHeader}>Fecha Cita</Text>
        <Text style={styles.tableHeader}>ID Movilización</Text>
      </View>
    );
  };

  // Renderizar cada fila de la cita
  const renderItem = ({ item }: { item: Cita }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.cita_id}</Text>
      <Text style={styles.tableCell}>{item.profesional_id}</Text>
      <Text style={styles.tableCell}>{item.fecha_cita}</Text>
      <Text style={styles.tableCell}>{item.movilizacion_id}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Citas</Text>

      {/* Contenedor de la tabla */}
      <View style={styles.tableContainer}>
        {/* Mostrar el encabezado de la tabla */}
        {renderHeader()}

        {/* Mostrar indicador de carga o lista de citas */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando citas...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={citas}
            renderItem={renderItem}
            keyExtractor={(item) => item.cita_id.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HistorialCitas;
