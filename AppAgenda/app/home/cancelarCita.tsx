import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";

interface Cita {
  cita_id: number;
  servicio_id: number;
  profesional_id: number;
  fecha_cita: string;
  estado_cita: string;
}

const CancelarCitas: React.FC = () => {
  const [userId, setUserId] = useState<number>(1); // Cambia este ID según tu autenticación
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(Dimensions.get("window").width);

  const isMobile = windowWidth < 768;

  // Fetch para obtener las citas de un usuario
  const fetchCitas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/citas/usuario/${userId}`);
      if (response.ok) {
        const data: Cita[] = await response.json();
        setCitas(data);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "No se pudieron obtener las citas.");
      }
    } catch (error) {
      console.error("Error al obtener las citas:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Función para cancelar una cita
  const cancelarCita = async (citaId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/citas/cancelar/${citaId}`, {
        method: "PATCH",
      });

      if (response.ok) {
        Alert.alert("Éxito", "Cita cancelada exitosamente.");
        setCitas((prevCitas) => prevCitas.filter((cita) => cita.cita_id !== citaId));
        setModalVisible(false); // Cierra el modal
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "No se pudo cancelar la cita.");
      }
    } catch (error) {
      console.error("Error al cancelar la cita:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  useEffect(() => {
    fetchCitas();

    const updateDimensions = () => setWindowWidth(Dimensions.get("window").width);
    const subscription = Dimensions.addEventListener("change", updateDimensions);
    return () => subscription.remove();
  }, [userId]);

  return (
    <View style={[styles.container, isMobile ? styles.mobileContainer : styles.desktopContainer]}>
      <Text style={[styles.title, { fontSize: isMobile ? 20 : 24 }]}>Mis Citas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : citas.length === 0 ? (
        <Text style={styles.noCitasText}>No tienes citas activas.</Text>
      ) : (
        <FlatList
          data={citas}
          keyExtractor={(item) => item.cita_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.citaItem}>
              <Text style={styles.citaText}>Fecha: {item.fecha_cita.split("T")[0]}</Text>
              <Text style={styles.citaText}>Hora: {item.fecha_cita.split("T")[1].substring(0, 5)}</Text>
              <Text style={styles.citaText}>Servicio ID: {item.servicio_id}</Text>
              <Text style={styles.citaText}>Profesional ID: {item.profesional_id}</Text>
              <Text style={styles.citaText}>Estado: {item.estado_cita}</Text>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setSelectedCita(item);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar Cita</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Modal para confirmar cancelación */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Cancelación</Text>
            {selectedCita && (
              <>
                <Text style={styles.modalText}>¿Deseas cancelar esta cita?</Text>
                <Text style={styles.modalText}>
                  Fecha: {selectedCita.fecha_cita.split("T")[0]}
                </Text>
                <Text style={styles.modalText}>
                  Hora: {selectedCita.fecha_cita.split("T")[1].substring(0, 5)}
                </Text>
                <Text style={styles.modalText}>Servicio ID: {selectedCita.servicio_id}</Text>
              </>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelModalButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmModalButton]}
                onPress={() => {
                  if (selectedCita) cancelarCita(selectedCita.cita_id);
                }}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    padding: 20,
  },
  desktopContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mobileContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  noCitasText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  citaItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  citaText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#f44336",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  cancelModalButton: {
    backgroundColor: "#ccc",
  },
  confirmModalButton: {
    backgroundColor: "#f44336",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CancelarCitas;
