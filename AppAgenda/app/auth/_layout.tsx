import { View, Text } from 'react-native'
import { Slot, Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{headerShown: false,}}/>
        <Stack.Screen name='ForgotPassword' options={{headerShown: false,}}/>
        <Stack.Screen name='Register' options={{headerShown: false,}}/>
        <Stack.Screen name='ResetPassword' options={{headerShown: false,}}/>
        <Stack.Screen name='Login' options={{headerShown: false,}}/>
    </Stack>
  )
}

export default _layout