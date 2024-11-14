// app/user/[id]/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

  useEffect(() => {
    // Simulación de obtención de datos del usuario usando el ID
    const fetchUserData = async () => {
      // Aquí puedes hacer una llamada a la API para obtener los datos reales del usuario
      const fetchedUser: User = {
        id: id as string,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        access: 'Owner',
        joined: '-',
        appointments: [
          { date: 'Jan 15, 2024', service: 'Kinesiología' },
          { date: 'Feb 5, 2024', service: 'Oftalmología' },
        ],
      };
      setUser(fetchedUser);
    };

    fetchUserData();
  }, [id]);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <Text style={styles.info}>Name: {user.name}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>Access: {user.access}</Text>
      <Text style={styles.info}>Joined: {user.joined}</Text>
      
      <Text style={styles.title}>Appointments</Text>
      {user.appointments.map((appointment, index) => (
        <View key={index} style={styles.appointment}>
          <Text style={styles.info}>Date: {appointment.date}</Text>
          <Text style={styles.info}>Service: {appointment.service}</Text>
        </View>
      ))}
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
});

export default UserDetail;
