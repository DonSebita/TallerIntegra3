import Footer from '@/scripts/Footer';
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const EditarCitas = () => {
    const [citas, setCitas] = useState([]);
    const [texto, setTexto] = useState('');
    const [idCita, setIdCita] = useState(null);

    const handleSubmit = () => {
        if (!texto.trim()) {
            Alert.alert('Error', 'Por favor ingresa un texto para la cita.');
            return;
        }

        if (idCita) {
            setCitas(citas.map(cita => (cita.id === idCita ? { id: idCita, texto } : cita)));
        } else {
            setCitas([...citas, { id: Date.now(), texto }]);
        }
        setTexto('');
        setIdCita(null);
    };

    const eliminarCita = (id) => {
        setCitas(citas.filter(cita => cita.id !== id));
    };

    const modificarCita = (cita) => {
        setTexto(cita.texto);
        setIdCita(cita.id);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={texto}
                onChangeText={setTexto}
                placeholder="Nueva Cita"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{idCita ? "MODIFICAR CITA" : "GUARDAR CITA"}</Text>
            </TouchableOpacity>
            <FlatList
                data={citas}
                keyExtractor={cita => cita.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.citaContainer}>
                        <Text style={styles.citaTexto}>{item.texto}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => modificarCita(item)}>
                                <Text style={styles.buttonText}>MODIFICAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => eliminarCita(item.id)}>
                                <Text style={styles.buttonText}>ELIMINAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <View style={styles.footer}>
                <Text style={styles.footerText}>Total De Citas Agendadas: {citas.length}</Text>
                <TouchableOpacity style={styles.button} onPress={() => setCitas([])}>
                    <Text style={styles.buttonText}>ELIMINAR TODAS LAS CITAS AGENDADAS</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer2}>
                <Footer/>
           </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        overflow: 'auto',
        width: '100%'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    citaContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    citaTexto: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#006400', // Verde oscuro
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff', // Texto en blanco
        textAlign: 'center',
    },
    footer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        alignItems: 'center',
    },
    footerText: {
        marginBottom: 10,
    },
    footer2: {
       flex: 1,
       justifyContent: 'flex-start',
       alignItems: 'center',
       

    },
});

export default EditarCitas;