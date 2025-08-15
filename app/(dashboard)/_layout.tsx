import { useAuth } from '@/context/AuthContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';






const DashboardLayout = () => {
const { user , loading } = useAuth()
const router = useRouter()

useEffect(() => {
if (!loading && !user){
    router.push("/login")
}},[user, loading]);

if (loading) {
    return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#8b5cf6" />
        </View>
    )

}



  return <Tabs screenOptions={{ headerShown: false , tabBarActiveTintColor: '#8b5cf6', tabBarInactiveTintColor: '#6b7280'  }}>
    <Tabs.Screen name="home" options={{ title: 'Home' ,  tabBarIcon: (data) => <AntDesign name="home" size={24} color="black" /> }} />
    <Tabs.Screen name="settings" options={{ title: 'Settings' , tabBarIcon: (data) => <Feather name="settings" size={24} color="black" />}} />
    <Tabs.Screen name="profile" options={{ title: 'Profile' ,tabBarIcon: (data) => <AntDesign name="profile" size={24} color="black" /> }} />
    <Tabs.Screen name="tasks/index" options={{ title: 'Tasks' ,tabBarIcon: (data) => <FontAwesome5 name="tasks" size={24} color="black" /> }} />
  </Tabs>
}

export default DashboardLayout 