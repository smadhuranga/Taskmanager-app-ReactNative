import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/AuthContext'

const index = () => {
    const router = useRouter()
    const { user, loading } = useAuth()

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.push("/home")
            } else {
                router.push("/login")
            }
        }
    }, [user, loading])
  return loading ? (
    <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#8b5cf6" />
    </View>

  ) : null
}

export default index