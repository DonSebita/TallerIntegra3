import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Horario {
    agenda_id: number;
    dia: string;
    hora_inicio: string;
    hora_fin: string;
}

const SeleccionarHorarioManual: React.FC = () => {
    const [usuarioId, setUsuarioId] = useState('');
    const [profesionalId, setProfesionalId] = useState('');
    const [servicioId, setServicioId] = useState('');
    const [movilizacionId, setMovilizacionId] = useState('');
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState<Horario | null>(null);

    // Obtener horarios disponibles del profesional
    const obtenerHorariosDisponibles = async () => {
        if (!profesionalId) {
            Alert.alert('Error', 'Por favor, ingrese el ID del profesional');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/agenda/horas-disponibles/${profesionalId}`);
            setHorarios(response.data);
        } catch (error) {
            console.error('Error al obtener horarios:', error);
            Alert.alert('Error', 'No se pudo obtener los horarios disponibles');
        }
    };

    // Función para reservar la cita
    const reservarCita = async () => {
        if (!horarioSeleccionado) {
            Alert.alert('Seleccione un horario antes de reservar');
            return;
        }

        if (!usuarioId || !profesionalId || !servicioId || !movilizacionId) {
            Alert.alert('Error', 'Por favor, ingrese todos los campos requeridos');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('authToken');
            
            console.log('Datos para crear cita:', {
                usuario_id: Number(usuarioId),
                profesional_id: Number(profesionalId),
                servicio_id: Number(servicioId),
                agenda_id: horarioSeleccionado.agenda_id,
                fecha_cita: horarioSeleccionado.dia,
                movilizacion_id: Number(movilizacionId),
            });

            const response = await axios.post(
                'http://localhost:3000/api/citas/crear-cita',
                {
                    usuario_id: Number(usuarioId),
                    profesional_id: Number(profesionalId),
                    servicio_id: Number(servicioId),
                    agenda_id: horarioSeleccionado.agenda_id,
                    fecha_cita: horarioSeleccionado.dia,
                    movilizacion_id: Number(movilizacionId),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                Alert.alert('Éxito', 'Hora reservada exitosamente');
            }
        } catch (error) {
            console.error('Error al reservar la cita:', error);
            Alert.alert('Error', 'No se pudo reservar la cita');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Ingrese los datos necesarios para Agendar:</Text>

            <TextInput
                placeholder="ID del Usuario"
                value={usuarioId}
                onChangeText={setUsuarioId}
                style={{ borderBottomWidth: 1, marginBottom: 15 }}
                keyboardType="numeric"
            />

            <TextInput
                placeholder="ID del Profesional"
                value={profesionalId}
                onChangeText={setProfesionalId}
                style={{ borderBottomWidth: 1, marginBottom: 15 }}
                keyboardType="numeric"
            />

            <TextInput
                placeholder="ID del Servicio"
                value={servicioId}
                onChangeText={setServicioId}
                style={{ borderBottomWidth: 1, marginBottom: 15 }}
                keyboardType="numeric"
            />

            <TextInput
                placeholder="ID de Movilización"
                value={movilizacionId}
                onChangeText={setMovilizacionId}
                style={{ borderBottomWidth: 1, marginBottom: 15 }}
                keyboardType="numeric"
            />

            <TouchableOpacity onPress={obtenerHorariosDisponibles} style={{ backgroundColor: 'blue', padding: 15, borderRadius: 5, marginBottom: 20 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Mostrar Horarios Disponibles</Text>
            </TouchableOpacity>

            <Text>Seleccione un Horario Disponible:</Text>
            <FlatList
                data={horarios}
                keyExtractor={(item) => item.agenda_id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            backgroundColor: item === horarioSeleccionado ? 'lightblue' : 'white',
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc',
                        }}
                        onPress={() => setHorarioSeleccionado(item)}
                    >
                        <Text>{item.dia} - {item.hora_inicio} a {item.hora_fin}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                onPress={reservarCita}
                style={{
                    backgroundColor: 'green',
                    padding: 15,
                    borderRadius: 5,
                    marginTop: 20,
                }}
            >
                <Text style={{ color: 'white', textAlign: 'center' }}>Reservar Hora</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SeleccionarHorarioManual;
