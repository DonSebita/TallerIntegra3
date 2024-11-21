import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

interface Cita {
    cita_id: number;
    servicio_id: number;
    usuario_id: number;
    fecha_cita: string;
    estado_cita: string;
}

const index = () => {
    const [profesionalId, setProfesionalId] = useState('');
    const [citas, setCitas] = useState<Cita[]>([]);

    const obtenerCitas = async () => {
        if (!profesionalId) {
            Alert.alert('Error', 'Por favor, ingrese el ID del profesional.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/citas/${profesionalId}`);
            if (response.ok) {
                const data: Cita[] = await response.json();
                setCitas(data);
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'No se pudieron obtener las citas.');
            }
        } catch (error) {
            console.error('Error al obtener citas:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
    };

    const renderCita = ({ item }: { item: Cita }) => (
        <View style={styles.citaItem}>
            <Text style={styles.citaText}>Fecha: {item.fecha_cita}</Text>
            <Text style={styles.citaText}>Servicio ID: {item.servicio_id}</Text>
            <Text style={styles.citaText}>Usuario ID: {item.usuario_id}</Text>
            <Text style={styles.citaText}>Estado: {item.estado_cita}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Citas Agendadas</Text>

            <TextInput
                placeholder="ID del Profesional"
                value={profesionalId}
                onChangeText={setProfesionalId}
                style={styles.input}
                keyboardType="numeric"
            />

            <TouchableOpacity onPress={obtenerCitas} style={styles.button}>
                <Text style={styles.buttonText}>Mostrar Citas</Text>
            </TouchableOpacity>

            <FlatList
                data={citas}
                keyExtractor={(item) => item.cita_id.toString()}
                renderItem={renderCita}
                contentContainerStyle={styles.list}
            />
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
    list: {
        marginTop: 20,
    },
    citaItem: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    citaText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
});

export default index;
