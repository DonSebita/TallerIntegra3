import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import BotonAdd from '@/components/botones/BotonAñadirUsuarios';
import AddModal from '@/components/modal/AddModal';

interface User {
  id: string;
  name: string;
  email: string;
  access: string;
  status: string;
  cita: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const router = useRouter();
  const [mostrarModal, setMostrarModal] = useState <boolean> (false);


  useEffect(() => {
    // Simulación de obtención de datos de usuarios
    const fetchUsers = async () => {
      const fetchedUsers: User[] = [
        { id: '1', name: 'John Doe', email: 'johndoe@gmail.com', access: 'Owner', status: 'Verificado', cita: 'Kinesiologia' },
        { id: '2', name: 'Steve Smith', email: 'stevesmith@gmail.com', access: 'Guest', status: 'Sin Verificar', cita: 'Fonoaudiologia' },
        { id: '3', name: 'Wei Zhang', email: 'weizhang@gmail.com', access: 'Admin', status: 'Sin Verificar', cita: 'Peluqueria' },
        { id: '4', name: 'Wei Zhang', email: 'weizhang@gmail.com', access: 'Admin', status: 'Sin Verificar', cita: 'Peluqueria' },
        { id: '5', name: 'Wei Zhang', email: 'weizhang@gmail.com', access: 'Admin', status: 'Sin Verificar', cita: 'Peluqueria' },
        { id: '6', name: 'Wei Zhang', email: 'weizhang@gmail.com', access: 'Admin', status: 'Sin Verificar', cita: 'Peluqueria' },
        { id: '7', name: 'Wei Zhang', email: 'weizhang@gmail.com', access: 'Admin', status: 'Sin Verificar', cita: 'Barberia' },
        { id: '8', name: 'Wei Zhang', email: 'weizhang@gmail.com', access: 'Admin', status: 'Sin Verificar', cita: 'Peluqueria' },
        { id: '9', name: 'Wei Zhang', email: 'weizhang@gmail.com', access: 'Admin', status: 'Sin Verificar', cita: 'Peluqueria' },
        { id: '10', name: 'Wei Zhang', email: 'weizhang@gmail.com', access: 'Admin', status: 'Sin Verificar', cita: 'Peluqueria' },
      ];
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers); // Inicialmente muestra todos los usuarios
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filtrar usuarios según el texto de búsqueda
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.cita.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchText, users]);

  const handleUserPress = (id: string) => {
    // Navegar a la pantalla de detalles del usuario
    router.push(`/home/usuarios/${id}`);
  };

  const handleMostrarModal= () =>{
    setMostrarModal(true);
  }
  return (
    <View style={styles.box}>
      <Text>Usuarios</Text>
      <BotonAdd text='Añadir' onPress={handleMostrarModal}/>
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
            numColumns={4} // Esto coloca hasta 4 usuarios por fila
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item.id)}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <Text style={styles.userAccess}>Acceso: {item.access}</Text>
                <Text style={styles.userJoined}>Cita: {item.cita}</Text>
                <Text style={styles.userStatus}>Status: {item.status}</Text>
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
          onSave={() => setMostrarModal(false)}
          onCancel={() => setMostrarModal(false)}/>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center', // Centra el container verticalmente
    alignItems: 'center', // Centra el container horizontalmente
    padding: 10,
  },
  container: {
    flex: 1, // Ocupa todo el espacio vertical disponible
    marginTop: 20,
    width: '100%', // Ancho completo
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 15, // Esquinas redondeadas
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
    width: '100%', // Hace que el buscador ocupe todo el ancho
  },
  lista: {
    flex: 1,
    paddingHorizontal: 10, // Ajuste de espacio horizontal
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  userItem: {
    width: '24%', // Ajusta el ancho para que haya 4 elementos por fila
    aspectRatio: 1, // Esto mantiene la relación de aspecto cuadrada
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    margin: 5, // Espacio entre los items
    padding: 8, // Reduce el padding dentro del cuadrado
    alignItems: 'center', // Centra el contenido dentro de cada item
    justifyContent: 'center', // Centra verticalmente
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  userAccess: {
    fontSize: 12,
    color: '#666',
  },
  userStatus: {
    fontSize: 12,
    color: '#666',
  },
  userJoined: {
    fontSize: 12,
    color: '#666',
  },
});

export default UserList;
