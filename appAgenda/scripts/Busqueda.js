import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { FlatList, Text, View } from 'react-native';

const Busqueda = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Datos de ejemplo
  const datos = [
    { id: '1', nombre: 'Maria' },
    { id: '2', nombre: 'Pedro' },
    { id: '3', nombre: 'Pablo' },
    { id: '4', nombre: 'Jose' },
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
      {/* Solo renderiza la lista si hay algo en el campo de búsqueda */}
      {searchQuery.length > 0 && (
        <FlatList
          data={resultados}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Text>{item.nombre}</Text>
          )}
        />
      )}
    </>
  );
};

export default Busqueda;
