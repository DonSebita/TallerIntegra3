import { Stack } from "expo-router"

export default function AuthLayout() {
  return (
    <Stack >
        <Stack.Screen name="login" options={{ headerShown: false }}/>
        <Stack.Screen name="forgotPassword" options={{ headerShown: false }}/>
        <Stack.Screen name="resetPassword" options={{ headerShown: false }}/>
        <Stack.Screen name="verificacion" options={{ headerShown: false }}/>
    </Stack>
  )
}
