import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import BotonAdd from '@/components/botones/BotonAñadirUsuarios';
import AddModal from '@/components/modal/AddModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Obtener usuarios desde el backend
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/usuarios'); // Cambia la URL según tu backend
        const data: User[] = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Inicialmente mostrar todos los usuarios
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filtrar usuarios según el texto de búsqueda
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.role.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchText, users]);

  const handleUserPress = (id: string) => {
    router.push(`/home/usuarios/${id}`);
  };

  const handleMostrarModal = () => {
    setMostrarModal(true);
  };

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  return (
    <View style={styles.box}>
      <Text style={styles.header}>Usuarios</Text>
      <View style={styles.botonContainer}>
        <BotonAdd text="Añadir" onPress={handleMostrarModal} />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscador"
          value={searchText}
          onChangeText={setSearchText}
        />
        <ScrollView style={styles.lista} contentContainerStyle={styles.scrollContainer}>
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            numColumns={4} // Hasta 4 usuarios por fila
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item.id)}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <Text style={styles.userRole}>Rol: {item.role}</Text>
                <Text style={styles.userStatus}>Estado: {item.status}</Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
      <Modal
        visible={mostrarModal}
        animationType="slide"
        transparent
        onRequestClose={() => setMostrarModal(false)}
      >
        <AddModal
          onSave={() => setMostrarModal(false)} // Lógica original
          onCancel={() => setMostrarModal(false)} // Lógica original
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  botonContainer: {
    alignSelf:'flex-end',
  },
  container: {
    flex: 1,
    marginTop: 20,
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  lista: {
    flex: 1,
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  userItem: {
    width: '24%', // Ajusta el ancho para que haya 4 por fila
    aspectRatio: 1, // Relación de aspecto cuadrada
    backgroundColor: '#fff',
    borderRadius: 15, // Esquinas más redondeadas
    padding: 10,
    marginBottom: 10, // Mayor separación entre los cuadrados
    marginHorizontal:5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, // Reduce la opacidad de la sombra
    shadowRadius: 8, // Difumina más la sombra
    elevation: 5, // Efecto de sombra para Android
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)', // Borde difuminado
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  userRole: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  userStatus: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserList;
