import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Cita {
  cita_id: number;
  servicio_id: number;
  profesional_id: number;
  agenda_id: number;
  fecha_cita: string;
  citas_canceladas: boolean;
  estado_cita: string;
  movilizacion_id: number;
}

const HistorialCitas = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para decodificar el token JWT y obtener el userId
  const obtenerUserIdDesdeToken = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(base64));
        return decodedPayload.userId;
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
    return null;
  };

  // Función para obtener citas desde el backend
  const obtenerCitas = async () => {
    try {
      setLoading(true);
      const userId = await obtenerUserIdDesdeToken();
      const token = await AsyncStorage.getItem('token');

      if (!userId || !token) {
        console.error('No se pudo obtener el ID del usuario o el token.');
        return;
      }

      const response = await axios.get(`http://localhost:3000/api/citas/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCitas(response.data);
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCitas();
  }, []);

  const renderHeader = () => (
    <View style={styles.tableRow}>
      <Text style={styles.tableHeader}>ID Cita</Text>
      <Text style={styles.tableHeader}>ID Servicio</Text>
      <Text style={styles.tableHeader}>ID Profesional</Text>
      <Text style={styles.tableHeader}>ID Agenda</Text>
      <Text style={styles.tableHeader}>Fecha Cita</Text>
      <Text style={styles.tableHeader}>Cancelada</Text>
      <Text style={styles.tableHeader}>Estado</Text>
      <Text style={styles.tableHeader}>ID Movilización</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Cita }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.cita_id}</Text>
      <Text style={styles.tableCell}>{item.servicio_id}</Text>
      <Text style={styles.tableCell}>{item.profesional_id}</Text>
      <Text style={styles.tableCell}>{item.agenda_id}</Text>
      <Text style={styles.tableCell}>{item.fecha_cita}</Text>
      <Text style={styles.tableCell}>{item.citas_canceladas ? 'Sí' : 'No'}</Text>
      <Text style={styles.tableCell}>{item.estado_cita}</Text>
      <Text style={styles.tableCell}>{item.movilizacion_id}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Citas</Text>
      <View style={styles.tableContainer}>
        {renderHeader()}
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
