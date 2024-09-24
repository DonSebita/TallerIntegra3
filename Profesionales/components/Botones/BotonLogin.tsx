import { Text, StyleSheet, Pressable, View } from "react-native";
import { useState } from "react";

const Boton = ({ onPress, text }: any) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => setIsPressed(true)} // Cambia el estado al presionar
            onPressOut={() => setIsPressed(false)} // Restaura el estado al soltar
            style={({ pressed }) => [
                styles.container,
                isPressed && styles.pressed // Aplica el estilo si está presionado
            ]}
        >
            <Text style={styles.Text}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#F0421D',
        width: '71%',
        padding: 15,
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 20,
    },
    Text: {
        fontWeight: 'bold',
        color: 'black',
    },
    pressed: { // Estilo para cuando el botón está presionado
        backgroundColor: '#C0371A', // Color más oscuro
    }
});

export default Boton;
