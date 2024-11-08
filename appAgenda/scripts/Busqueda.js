import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { FlatList, Text } from 'react-native';

const Busqueda = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Datos de ejemplo
  const datos = [
    { id: '1', nombre: 'Manzana' },
    { id: '2', nombre: 'Plátano' },
    { id: '3', nombre: 'Pera' },
    { id: '4', nombre: 'Uva' },
  ];

  // Filtrar los datos según la búsqueda
  const resultados = datos.filter(item =>
    item.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Searchbar
        placeholder="Buscar"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={resultados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.nombre}</Text>}
      />
    </>
  );
};

export default Busqueda;
