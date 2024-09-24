import { View, Text, TextInput, Pressable, StyleSheet, Platform } from "react-native";
import Boton from "@/components/botones/BotonLogin"; 
import { useRouter } from "expo-router";

export default function Verification() {

    const router = useRouter()

  return (
    <View style={[styles.container, Platform.OS === 'web' && styles.webContainer]}>
      <Text style={styles.title}>Verification</Text>
      
      <View style={styles.codeInputContainer}>
        {[1, 2, 3, 4].map((item, index) => (
          <TextInput key={index} style={[styles.codeInput, Platform.OS === 'web' && styles.webCodeInput]} maxLength={1} keyboardType="numeric" />
        ))}
      </View>

      <Boton text="Send" onPress={() => router.replace("./resetPassword")} />

      <Pressable onPress={() => {/* Acción de resend */}}>
        <Text style={styles.resend}>Resend Code</Text>
      </Pressable>
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
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#f9f9f9',
  },
  webCodeInput: {
    width: 60,
    height: 60,
  },
  resend: {
    color: '#F0421D',
    marginVertical: 15,
  },
});
