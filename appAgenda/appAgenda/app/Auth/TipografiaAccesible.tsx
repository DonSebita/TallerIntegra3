import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface TipografiaAccesibleProps {
  texto: string;
  tipo?: 'titulo' | 'subtitulo' | 'texto';
}

const TipografiaAccesible: React.FC<TipografiaAccesibleProps> = ({ texto, tipo = 'texto' }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.texto, tipo === 'titulo' && styles.titulo, tipo === 'subtitulo' && styles.subtitulo]}>
        {texto}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  texto: {
    fontSize: 20,
    lineHeight: 28,
    color: '#333',
    textAlign: 'justify',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitulo: {
    fontSize: 24,
    fontWeight: '600',
    color: '#444',
  },
});

export default TipografiaAccesible;
