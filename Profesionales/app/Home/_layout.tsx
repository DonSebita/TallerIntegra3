import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Slot, Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Layout() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.logo}>Dashboard</Text>
        <Link href="/home" style={styles.navLink}>Home</Link>
        <Link href="/home/citas" style={styles.navLink}>Citas</Link>
        <Link href="/home/citasAgendadas" style={styles.navLink}>Citas Agendadas</Link>
        <Link href="/home/usuarios" style={styles.navLink}>Usuarios</Link>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={24} color="black" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-start',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  navLink: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
