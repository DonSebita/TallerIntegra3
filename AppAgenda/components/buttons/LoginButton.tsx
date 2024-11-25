import { Text, StyleSheet, Pressable } from "react-native";
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
        backgroundColor: '#47b564',
        width: '71%',
        padding: 15,
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 10,
        justifyContent: 'center',
        paddingVertical: 10,
    },
    Text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 14,
        marginRight: 14
    },
    pressed: { // Estilo para cuando el botón está presionado
        backgroundColor: '#2F7B43', // Color más oscuro
    }
});

export default Boton;
