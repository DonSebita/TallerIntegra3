import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { Link, useRouter, Slot } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardLayout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/auth');
  };

  const NavLink = ({ href, icon, children }:any) => (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.navLink}>
        <MaterialCommunityIcons name={icon} size={24} color="#8DC63F" />
        <Text style={styles.navLinkText}>{children}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
      <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="leaf" size={32} color="#8DC63F" />
          <Text style={styles.logo}>Temuco</Text>
        </View>

        <View style={styles.mainNav}>
          <ScrollView>
            <NavLink href="/home" icon="home">Home</NavLink>
            <NavLink href="/home/citas" icon="calendar">Citas</NavLink>
            <NavLink href="/home/citasAgendadas" icon="calendar-check">Citas Agendadas</NavLink>
            <NavLink href="/home/usuarios" icon="account-group">Usuarios</NavLink>
          </ScrollView>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={24} color="#black" />
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
    backgroundColor: '#fff',
  },
  sidebar: {
    width: Platform.OS === 'web' ? 280 : '75%',
    backgroundColor: '#006838',
    padding: 20,
    paddingTop: Platform.OS === 'web' ? 20 : 50,
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    borderBottomColor: 'rgba(0, 57, 31, 0.5)',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  mainNav: {
    flex: 1,
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  navLinkText: {
    marginLeft: 12,
    fontSize: 18,
    color: '#fff',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 2,
    borderTopColor: 'rgba(0, 57, 31, 0.5)',
    marginTop: 20,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 18,
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f9',
  },
  contentContainer: {
    flexGrow: 1, // Permite que el contenido se ajuste y habilita scroll si es necesario
  },
});


export default DashboardLayout;