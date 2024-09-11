import { Stack } from 'expo-router';
import 'react-native-reanimated';



export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="index"/>
        <Stack.Screen name="Auth" />
        <Stack.Screen name="Home" />
      </Stack>
  );
}
