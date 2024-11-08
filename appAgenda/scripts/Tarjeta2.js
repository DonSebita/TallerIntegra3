import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const Tarjeta = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Card.Cover source={{ uri: 'https://images.ligup2.com/eyJidWNrZXQiOiJsaWd1cC12MiIsImtleSI6ImRlcG9ydGVtdW5pY2lwYWwvcGhvdG9zLzUyNzI1X2dpbS5fbWlsbGFyYXlfMy5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEyMDAsImZpdCI6ImNvdmVyIn0sInJvdGF0ZSI6bnVsbH19' }} />
          
          <Text style={styles.text}>En temuco talleres de</Text>
          <Text style={styles.text}>Gimnasia, informate.</Text>
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
  text: {
    fontSize: 30, // Tamaño de texto más grande
    color: 'black', // Color de texto negro
    fontFamily: 'Arial', // O 'Helvetica', 'Verdana'
    
  },
 
});

export default Tarjeta;
