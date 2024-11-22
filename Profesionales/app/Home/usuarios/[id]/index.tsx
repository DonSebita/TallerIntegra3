import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';

interface Appointment {
  date: string;
  service: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  access: string;
  joined: string;
  appointments: Appointment[];
}

const UserDetail = () => {
  const { id } = useGlobalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamada al backend para obtener los datos del usuario usando el ID
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${id}`);
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  if (!user) {
    return <Text style={styles.error}>No se encontraron detalles del usuario.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Usuario</Text>
      <Text style={styles.info}>Nombre: {user.name}</Text>
      <Text style={styles.info}>Correo: {user.email}</Text>
      <Text style={styles.info}>Acceso: {user.access}</Text>
      <Text style={styles.info}>Fecha de Ingreso: {user.joined}</Text>

      <Text style={styles.title}>Citas</Text>
      {user.appointments.length > 0 ? (
        user.appointments.map((appointment, index) => (
          <View key={index} style={styles.appointment}>
            <Text style={styles.info}>Fecha: {appointment.date}</Text>
            <Text style={styles.info}>Servicio: {appointment.service}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.info}>No hay citas registradas.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  info: {
    fontSize: 16,
    marginVertical: 4,
  },
  appointment: {
    marginVertical: 8,
    padding: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UserDetail;
