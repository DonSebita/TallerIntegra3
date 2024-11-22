import { Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

const BotonAdd = ({ onPress, text }: any) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => setIsPressed(true)} // Cambia el estado al presionar
            onPressOut={() => setIsPressed(false)} // Restaura el estado al soltar
            style={({ pressed }) => [
                styles.container,
                isPressed && styles.pressed, // Aplica el estilo si está presionado
                { alignSelf: 'flex-end' } // Alinea el botón hacia la derecha
            ]}
        >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#F0421D',
        paddingVertical: 12, // Espacio arriba y abajo
        paddingHorizontal: 20, // Espacio a los lados
        marginVertical: 10,
        borderRadius: 25, // Bordes redondeados
        minWidth: 150, // Asegura un ancho mínimo para el botón
        alignItems: "center",
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16, // Tamaño del texto
        color: 'black',
    },
    pressed: { // Estilo para cuando el botón está presionado
        backgroundColor: '#C0371A',
    },
});

export default BotonAdd;
