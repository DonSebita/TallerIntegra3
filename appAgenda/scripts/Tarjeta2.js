import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const Tarjeta = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          
          <Card.Cover source={{ uri: 'https://cdn.www.gob.pe/uploads/document/file/6843516/1010099-adulto-mayor.jpg' }} />
          <Card.Actions>
            <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel}>Información</Button>
            <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel}>Documentos</Button>
          </Card.Actions>
          <Text variant="bodyMedium">En Chile, el Día del Adulto Mayor</Text>
          <Text variant="bodyMedium">se celebra el 1 de octubre.</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    margin: 10,
  },
  title: {
    fontSize: 20, // Ajusta el tamaño según sea necesario
    fontFamily: 'Arial', // O 'Helvetica', 'Verdana'
    marginBottom: 10, // Espacio debajo del título
  },
  button: {
    backgroundColor: '#87CEEB', // Color verde claro
    marginHorizontal: 5,
  },
  buttonLabel: {
    color: 'black', // Color de texto negro
    fontFamily: 'Arial',
  },
});

export default Tarjeta;
