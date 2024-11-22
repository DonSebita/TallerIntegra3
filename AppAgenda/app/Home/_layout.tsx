import { View, Text } from 'react-native'
import { Slot, Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='index'/>
    </Stack>
  )
}

export default _layout