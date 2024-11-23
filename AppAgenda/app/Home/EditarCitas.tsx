import React, { useState, useEffect } from 'react';
import { 
    View, TextInput, FlatList, Text, StyleSheet, Alert, TouchableOpacity, Dimensions, Vibration 
} from 'react-native';

// Definimos la interfaz para los horarios
interface Horario {
    agenda_id: number;
    profesional_id: number;
    dia: string;
    hora_inicio: string;
    hora_fin: string;
    disponible: number;
}

const App = () => {
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [loading, setLoading] = useState(false);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState<Horario | null>(null);
    const [usuarioId, setUsuarioId] = useState('');
    const [movilizacionId, setMovilizacionId] = useState('');
    const [servicioId, setServicioId] = useState('');
    const [windowWidth, setWindowWidth] = useState<number>(Dimensions.get('window').width);

    const isMobile = windowWidth < 768;

    // Obtener horarios disponibles
    const obtenerHorarios = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/citas/disponibles');
            if (response.ok) {
                const data: Horario[] = await response.json();
                setHorarios(data);
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'No se pudieron obtener los horarios.');
            }
        } catch (error) {
            console.error('Error al obtener horarios disponibles:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerHorarios();
        const updateDimensions = () => setWindowWidth(Dimensions.get('window').width);
        const subscription = Dimensions.addEventListener('change', updateDimensions);
        return () => subscription.remove();
    }, []);

    // Crear cita
    const crearCita = async () => {
        if (!horarioSeleccionado) {
            Alert.alert('Error', 'Por favor seleccione un horario.');
            return;
        }

        if (!usuarioId || !movilizacionId || !servicioId) {
            Alert.alert('Error', 'Por favor complete todos los campos necesarios.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/citas/crear-cita', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario_id: Number(usuarioId),
                    profesional_id: horarioSeleccionado.profesional_id,
                    agenda_id: horarioSeleccionado.agenda_id,
                    servicio_id: Number(servicioId),
                    movilizacion_id: Number(movilizacionId),
                }),
            });

            if (response.ok) {
                Alert.alert('Éxito', 'Cita creada exitosamente.');
                setHorarioSeleccionado(null);
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'No se pudo crear la cita.');
            }
        } catch (error) {
            console.error('Error al crear la cita:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
    };

    return (
        <View style={[styles.container, isMobile ? styles.mobileContainer : styles.desktopContainer]}>
            <Text style={[styles.title, { fontSize: isMobile ? 20 : 24 }]} maxFontSizeMultiplier={1.5}>
                Horarios Disponibles
            </Text>
            {loading ? (
                <Text style={styles.loadingText}>Cargando horarios...</Text>
            ) : (
                <FlatList
                    data={horarios}
                    keyExtractor={(item) => item.agenda_id.toString()}
                    style={[isMobile ? styles.mobileList : styles.desktopList]}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            accessible={true}
                            accessibilityLabel={`Seleccionar horario del día ${item.dia}, de ${item.hora_inicio} a ${item.hora_fin}`}
                            focusable={true}
                            style={[
                                styles.horarioItem,
                                horarioSeleccionado?.agenda_id === item.agenda_id && styles.horarioItemSelected,
                            ]}
                            onPress={() => {
                                setHorarioSeleccionado(item);
                                Vibration.vibrate(50);
                                Alert.alert(
                                    'Horario seleccionado',
                                    `Seleccionaste el horario del día ${item.dia}`
                                );
                            }}
                        >
                            <Text style={styles.horarioText}>Día: {item.dia}</Text>
                            <Text style={styles.horarioText}>Hora: {item.hora_inicio} - {item.hora_fin}</Text>
                            <Text style={styles.horarioText}>Profesional ID: {item.profesional_id}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            <View style={[styles.formContainer, isMobile ? styles.mobileFormContainer : styles.desktopFormContainer]}>
                <Text style={[styles.subtitle, { fontSize: isMobile ? 18 : 22 }]}>Reservar Cita</Text>
                <View>
                    <Text style={styles.inputLabel}>ID del Usuario</Text>
                    <TextInput
                        style={[styles.input, { fontSize: isMobile ? 14 : 18 }]}
                        value={usuarioId}
                        onChangeText={setUsuarioId}
                        placeholder="ID del Usuario"
                        keyboardType="numeric"
                        accessible={true}
                        accessibilityLabel="Campo para ingresar el ID del usuario"
                    />
                </View>
                <View>
                    <Text style={styles.inputLabel}>ID del Servicio</Text>
                    <TextInput
                        style={[styles.input, { fontSize: isMobile ? 14 : 18 }]}
                        value={servicioId}
                        onChangeText={setServicioId}
                        placeholder="ID del Servicio"
                        keyboardType="numeric"
                        accessible={true}
                        accessibilityLabel="Campo para ingresar el ID del servicio"
                    />
                </View>
                <View>
                    <Text style={styles.inputLabel}>ID de Movilización</Text>
                    <TextInput
                        style={[styles.input, { fontSize: isMobile ? 14 : 18 }]}
                        value={movilizacionId}
                        onChangeText={setMovilizacionId}
                        placeholder="ID de Movilización"
                        keyboardType="numeric"
                        accessible={true}
                        accessibilityLabel="Campo para ingresar el ID de movilización"
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={crearCita}
                    accessible={true}
                    accessibilityLabel="Botón para crear cita"
                >
                    <Text style={styles.buttonText}>Crear Cita</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f7',
    },
    desktopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mobileContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    mobileList: {
        width: '100%',
    },
    desktopList: {
        width: '60%',
        marginRight: 20,
    },
    horarioItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 10,
    },
    horarioItemSelected: {
        backgroundColor: '#cce5ff',
        borderColor: '#007bff',
    },
    horarioText: {
        fontSize: 16,
    },
    formContainer: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    desktopFormContainer: {
        width: '35%',
    },
    mobileFormContainer: {
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default App;
