import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Bienvenido' }} // Personaliza el título
      />
      <Stack.Screen 
        name="Auth/register" 
        options={{ title: 'Registrar' }} // Personaliza el título
      />
      <Stack.Screen 
        name="Home" 
        options={{ title: 'Inicio' }} // Personaliza el título
      />
    </Stack>
  );
}
