import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';

interface Appointment {
  date: string;
  service: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  fecha_nacimiento: string | null;
  ciudad: string;
  comuna: string;
  direccion: string;
  telefono: string;
  celular: string;
  appointments: Appointment[];
}

const UserDetail = () => {
  const { id } = useGlobalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
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

  const filteredAppointments = user?.appointments.filter(appointment =>
    appointment.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.date.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleVerification = async () => {
    console.log('Cambiando estado de verificación...');
  };

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  if (!user) {
    return <Text style={styles.error}>No se encontraron detalles del usuario.</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.userCard}>
          <View style={styles.userHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Rol:</Text> {user.role}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Estado:</Text> {user.status}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Fecha de Nacimiento:</Text> {user.fecha_nacimiento || 'N/A'}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Ciudad:</Text> {user.ciudad || 'N/A'}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Comuna:</Text> {user.comuna || 'N/A'}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Dirección:</Text> {user.direccion || 'N/A'}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Teléfono:</Text> {user.telefono || 'N/A'}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Celular:</Text> {user.celular || 'N/A'}</Text>
          </View>
          <View style={styles.verificationSection}>
            <View style={[styles.badge, user.status === 'Verificado' ? styles.verifiedBadge : styles.unverifiedBadge]}>
              <Text style={styles.badgeText}>{user.status}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.button, user.status === 'Verificado' ? styles.disabledButton : {}]} 
              onPress={handleVerification}
              disabled={user.status === 'Verificado'}
            >
              <Text style={styles.buttonText}>
                {user.status === 'Verificado' ? "Usuario Verificado" : "Verificar Usuario"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => console.log('Borrar usuario', user.id)}
            >
              <Text style={styles.buttonText}>Borrar Usuario</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.appointmentsCard}>
          <Text style={styles.appointmentsTitle}>Citas</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar citas..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityLabel="Buscar citas"
          />
          <ScrollView style={styles.appointmentsScroll}>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <View key={index} style={styles.appointment}>
                  <Text style={styles.appointmentDate}>Fecha: {appointment.date}</Text>
                  <Text style={styles.appointmentService}>Servicio: {appointment.service}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noAppointments}>No se encontraron citas.</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  userDetails: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  verificationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  verifiedBadge: {
    backgroundColor: '#4CAF50',
  },
  unverifiedBadge: {
    backgroundColor: '#FFC107',
  },
  badgeText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },  
  appointmentsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderColor: 'rgba(0,0,0,0.1)',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  appointmentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  searchInput: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  appointmentsScroll: {
    maxHeight: 300,
  },
  appointment: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  appointmentService: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  noAppointments: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ff0000',
  },
});

export default UserDetail;
