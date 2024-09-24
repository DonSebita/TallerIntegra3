import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";

const EntradaDatos = ({ value, setValue, placeholder, secureTextEntry }: any) => {
  return (
    <View style={[styles.container, Platform.OS === 'web' && styles.webContainer]}>
      <TextInput
        style={[styles.input, Platform.OS === 'web' ? styles.webInput : {}]}
        value={value}
        placeholder={placeholder}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#aaa" // Color del placeholder
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: "100%",
    borderRadius: 20,
    marginVertical: 10,
    // Eliminar paddingHorizontal para que el input ocupe todo el ancho
  },
  input: {
    textAlign: 'center',
    padding: 10, // Espacio interno común
    width: '100%', // Asegura que el input ocupe todo el ancho
  },
  // Estilos específicos para web
  webContainer: {
    width: '80%',  // Ajusta el ancho en web
    maxWidth: 400,  // Limita el ancho máximo en web
    borderRadius: 20,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',  // Sombra difuminada solo en web
      },
    }),
  },
  webInput: {
    fontSize: 18,  // Tamaño de fuente más grande en web
    borderWidth: 1, // Borde definido solo en web
    borderColor: '#ccc', // Color del borde
    borderRadius: 20, // Asegura que el borde sea redondeado
    padding: 12, // Espacio interno más amplio en web
    width: '100%', // Asegura que el input ocupe todo el ancho del contenedor
  },
});

export default EntradaDatos;
