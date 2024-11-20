import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const index = () => {
    const [profesionalId, setProfesionalId] = useState('');
    const [servicioId, setServicioId] = useState('');
    const [dia, setDia] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');

    const crearHorario = async () => {
        if (!profesionalId || !servicioId || !dia || !horaInicio || !horaFin) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/citas/crear-horario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    profesional_id: Number(profesionalId),
                    servicio_id: Number(servicioId),
                    dia,
                    hora_inicio: horaInicio,
                    hora_fin: horaFin,
                }),
            });

            if (response.ok) {
                Alert.alert('Éxito', 'Horario creado exitosamente.');
                setDia('');
                setHoraInicio('');
                setHoraFin('');
                setServicioId('');
                setProfesionalId('');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'No se pudo crear el horario.');
            }
        } catch (error) {
            console.error('Error al crear el horario:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Horario Disponible</Text>

            <TextInput
                placeholder="ID del Profesional"
                value={profesionalId}
                onChangeText={setProfesionalId}
                style={styles.input}
                keyboardType="numeric"
            />

            <TextInput
                placeholder="ID del Servicio"
                value={servicioId}
                onChangeText={setServicioId}
                style={styles.input}
                keyboardType="numeric"
            />

            <TextInput
                placeholder="Día (YYYY-MM-DD)"
                value={dia}
                onChangeText={setDia}
                style={styles.input}
            />

            <TextInput
                placeholder="Hora Inicio (HH:mm)"
                value={horaInicio}
                onChangeText={setHoraInicio}
                style={styles.input}
            />

            <TextInput
                placeholder="Hora Fin (HH:mm)"
                value={horaFin}
                onChangeText={setHoraFin}
                style={styles.input}
            />

            <TouchableOpacity onPress={crearHorario} style={styles.button}>
                <Text style={styles.buttonText}>Crear Horario</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2, 
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4, 
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default index;
