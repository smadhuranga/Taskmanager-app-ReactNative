import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="login" options={{ title: 'Login' }} />
    <Stack.Screen name="register" options={{ title: 'Register' }} />
  </Stack>
}

export default AuthLayout