import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import Boton from "@/components/botones/BotonLogin"; 
import { useRouter } from "expo-router";

export default function NewPassword() {

  const router = useRouter()

  return (
    <View style={[styles.container, Platform.OS === 'web' && styles.webContainer]}>
      <Text style={styles.title}>New Password</Text>

      <TextInput
        style={[styles.input, Platform.OS === 'web' && styles.webInput]}
        placeholder="Enter New Password"
        secureTextEntry={true}
      />
      
      <TextInput
        style={[styles.input, Platform.OS === 'web' && styles.webInput]}
        placeholder="Confirm New Password"
        secureTextEntry={true}
      />

      <Boton text="Send" onPress={() => router.replace("./login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  webContainer: {
    width: '50%',
    maxWidth: 600,
    borderRadius: 20,
    padding: 20,
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Solo para web
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5, // Para Android
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    maxWidth: 350,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  webInput: {
    width: '100%',
    maxWidth: 500,
    height: 50,
  },
});
