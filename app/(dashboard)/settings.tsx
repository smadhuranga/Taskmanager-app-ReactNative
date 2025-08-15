import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, Pressable, Image, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(true);

  const settingOptions = [
    {
      title: "Account",
      icon: <MaterialIcons name="account-circle" size={24} color="#8b5cf6" />,
      items: [
        { name: "Personal Information", icon: <Feather name="user" size={20} color="#6b7280" /> },
        { name: "Security", icon: <MaterialIcons name="security" size={20} color="#6b7280" /> },
        { name: "Payment Methods", icon: <FontAwesome name="credit-card" size={20} color="#6b7280" /> },
      ]
    },
    {
      title: "Preferences",
      icon: <MaterialIcons name="settings" size={24} color="#8b5cf6" />,
      items: [
        { 
          name: "Dark Mode", 
          icon: <MaterialCommunityIcons name="theme-light-dark" size={20} color="#6b7280" />,
          action: <Switch value={darkMode} onValueChange={setDarkMode} thumbColor={darkMode ? "#8b5cf6" : "#f5f3ff"} trackColor={{ false: "#e5e7eb", true: "#ddd6fe" }} />
        },
        { 
          name: "Notifications", 
          icon: <Ionicons name="notifications" size={20} color="#6b7280" />,
          action: <Switch value={notifications} onValueChange={setNotifications} thumbColor={notifications ? "#8b5cf6" : "#f5f3ff"} trackColor={{ false: "#e5e7eb", true: "#ddd6fe" }} />
        },
        { 
          name: "Biometric Login", 
          icon: <MaterialCommunityIcons name="fingerprint" size={20} color="#6b7280" />,
          action: <Switch value={biometric} onValueChange={setBiometric} thumbColor={biometric ? "#8b5cf6" : "#f5f3ff"} trackColor={{ false: "#e5e7eb", true: "#ddd6fe" }} />
        },
      ]
    },
    {
      title: "Data",
      icon: <MaterialCommunityIcons name="database" size={24} color="#8b5cf6" />,
      items: [
        { 
          name: "Cloud Sync", 
          icon: <Ionicons name="cloud" size={20} color="#6b7280" />,
          action: <Switch value={syncEnabled} onValueChange={setSyncEnabled} thumbColor={syncEnabled ? "#8b5cf6" : "#f5f3ff"} trackColor={{ false: "#e5e7eb", true: "#ddd6fe" }} />
        },
        { name: "Export Data", icon: <Feather name="download" size={20} color="#6b7280" /> },
        { name: "Backup & Restore", icon: <MaterialCommunityIcons name="backup-restore" size={20} color="#6b7280" /> },
      ]
    },
    {
      title: "Support",
      icon: <MaterialCommunityIcons name="help-circle" size={24} color="#8b5cf6" />,
      items: [
        { name: "Help Center", icon: <Feather name="help-circle" size={20} color="#6b7280" /> },
        { name: "Contact Us", icon: <MaterialIcons name="contact-support" size={20} color="#6b7280" /> },
        { name: "Privacy Policy", icon: <MaterialIcons name="privacy-tip" size={20} color="#6b7280" /> },
        { name: "Terms of Service", icon: <MaterialIcons name="description" size={20} color="#6b7280" /> },
      ]
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-gradient-to-r from-purple-600 to-indigo-700 pt-16 pb-8 px-6 rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-3xl font-bold text-black">Settings</Text>
          <Pressable className="bg-white/20 p-2 rounded-full">
            <Feather name="search" size={24} color="white" />
          </Pressable>
        </View>
        
        {/* User Profile */}
        <View className="flex-row items-center">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80' }} 
            className="w-20 h-20 rounded-full border-4 border-white/30"
          />
          <View className="ml-4 flex-1">
            <Text className="text-black text-xl font-bold">Alex Morgan</Text>
            <Text className="text-black-200">alex@taskmanager.com</Text>
            <Pressable className="bg-white/20 rounded-full px-4 py-1 mt-2 self-start">
              <Text className="text-black">Edit Profile</Text>
            </Pressable>
          </View>
        </View>
      </View>
      
      {/* Settings Content */}
      <ScrollView className="flex-1 px-4 pt-6 pb-20" showsVerticalScrollIndicator={false}>
        {settingOptions.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mb-8">
            <View className="flex-row items-center mb-4">
              {section.icon}
              <Text className="text-purple-700 font-bold text-lg ml-2">{section.title}</Text>
            </View>
            
            <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <Pressable 
                  key={itemIndex}
                  className={`flex-row items-center justify-between px-5 py-4 ${itemIndex < section.items.length - 1 ? 'border-b border-gray-100' : ''}`}
                  android_ripple={{ color: '#f5f3ff' }}
                >
                  <View className="flex-row items-center">
                    <View className="mr-4">
                      {item.icon}
                    </View>
                    <Text className="text-gray-800 text-base">{item.name}</Text>
                  </View>
                  
                  {item.action ? item.action : <Feather name="chevron-right" size={20} color="#9ca3af" />}
                </Pressable>
              ))}
            </View>
          </View>
        ))}
        
        {/* App Version & Logout */}
        <View className="items-center mt-6">
          <Text className="text-gray-500">Task Manager v2.4.1</Text>
          <Pressable className="mt-8 flex-row items-center justify-center bg-red-50 rounded-full px-8 py-3">
            <MaterialIcons name="logout" size={20} color="#ef4444" />
            <Text className="text-red-500 font-bold ml-2">Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
      
      {/* Floating Premium Button */}
      <Pressable 
        className="absolute bottom-6 right-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full px-6 py-4 flex-row items-center shadow-lg"
        style={{
          shadowColor: '#f59e0b',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10
        }}
      >
        <MaterialIcons name="workspace-premium" size={24} color="white" />
        <Text className="text-white font-bold ml-2">Go Premium</Text>
      </Pressable>
    </View>
  );
};

export default Settings;