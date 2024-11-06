import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter, Slot } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardLayout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/auth');
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '20%',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  navLink: {
    marginBottom: 15,
    fontSize: 18,
    color: 'blue',
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

export default DashboardLayout;
