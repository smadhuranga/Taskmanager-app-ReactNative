import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, StyleSheet, Animated } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Feather, FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [stats] = useState({
    completed: 124,
    pending: 8,
    overdue: 3,
    productivity: 82
  });
  
  const [user] = useState({
    name: "Alex Morgan",
    email: "alex@taskmanager.com",
    role: "Product Designer",
    location: "San Francisco, CA",
    joined: "January 2022",
    bio: "Passionate about creating beautiful and functional user experiences. Love hiking and photography on weekends."
  });
  
  const [recentTasks] = useState([
    { id: 1, title: "UI Design Review", time: "2 hours ago", completed: true },
    { id: 2, title: "Team Meeting", time: "5 hours ago", completed: true },
    { id: 3, title: "Project Deadline", time: "Yesterday", completed: false },
  ]);
  
  const [achievements] = useState([
    { id: 1, title: "Early Bird", icon: "sunrise", count: 56 },
    { id: 2, title: "Task Master", icon: "check-circle", count: 124 },
    { id: 3, title: "Productivity Guru", icon: "trending-up", count: 82 },
  ]);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with background */}
      <View className="bg-gradient-to-r from-purple-600 to-indigo-700 h-48 relative rounded-b-3xl overflow-hidden">
        {/* Decorative elements */}
        <View className="absolute top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full opacity-20" />
        <View className="absolute bottom-5 -right-5 w-32 h-32 bg-indigo-500 rounded-full opacity-20" />
        
        
      </View>
      
      {/* Profile content */}
      <ScrollView className="flex-1 px-5 -mt-16 pb-20" showsVerticalScrollIndicator={false}>
        {/* Profile header */}
        <View className="items-center mb-6">
          <View className="bg-white p-1 rounded-full shadow-lg">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80' }} 
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </View>
          
          <View className="items-center mt-4">
            <Text className="text-2xl font-bold text-gray-800">{user.name}</Text>
            <Text className="text-purple-600 font-medium mt-1">{user.role}</Text>
            
            <View className="flex-row mt-3 space-x-4">
              <Pressable className="bg-purple-100 px-4 py-2 rounded-full flex-row items-center">
                <MaterialIcons name="message" size={20} color="#8b5cf6" />
                <Text className="text-purple-700 font-medium ml-2">Message</Text>
              </Pressable>
              <Pressable className="bg-purple-600 px-4 py-2 rounded-full flex-row items-center">
                <Feather name="edit-2" size={18} color="white" />
                <Text className="text-white font-medium ml-2">Edit Profile</Text>
              </Pressable>
            </View>
          </View>
        </View>
        
        {/* Stats cards */}
        <View className="flex-row justify-between mb-8">
          <View className="bg-white rounded-2xl p-4 flex-1 mx-1 items-center shadow-sm">
            <Text className="text-2xl font-bold text-gray-800">{stats.completed}</Text>
            <Text className="text-gray-500 text-sm">Completed</Text>
          </View>
          <View className="bg-white rounded-2xl p-4 flex-1 mx-1 items-center shadow-sm">
            <Text className="text-2xl font-bold text-gray-800">{stats.pending}</Text>
            <Text className="text-gray-500 text-sm">Pending</Text>
          </View>
          <View className="bg-white rounded-2xl p-4 flex-1 mx-1 items-center shadow-sm">
            <Text className="text-2xl font-bold text-gray-800">{stats.overdue}</Text>
            <Text className="text-gray-500 text-sm">Overdue</Text>
          </View>
        </View>
        
        {/* Profile tabs */}
        <View className="flex-row bg-white rounded-2xl p-1 mb-8 shadow-sm">
          <Pressable 
            className={`flex-1 py-3 rounded-2xl items-center ${activeTab === 'tasks' ? 'bg-purple-100' : ''}`}
            onPress={() => setActiveTab('tasks')}
          >
            <Text className={`font-medium ${activeTab === 'tasks' ? 'text-purple-700' : 'text-gray-500'}`}>Tasks</Text>
          </Pressable>
          <Pressable 
            className={`flex-1 py-3 rounded-2xl items-center ${activeTab === 'about' ? 'bg-purple-100' : ''}`}
            onPress={() => setActiveTab('about')}
          >
            <Text className={`font-medium ${activeTab === 'about' ? 'text-purple-700' : 'text-gray-500'}`}>About</Text>
          </Pressable>
          <Pressable 
            className={`flex-1 py-3 rounded-2xl items-center ${activeTab === 'activity' ? 'bg-purple-100' : ''}`}
            onPress={() => setActiveTab('activity')}
          >
            <Text className={`font-medium ${activeTab === 'activity' ? 'text-purple-700' : 'text-gray-500'}`}>Activity</Text>
          </Pressable>
        </View>
        
        {/* Content based on active tab */}
        {activeTab === 'tasks' ? (
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">Recent Tasks</Text>
            
            {recentTasks.map(task => (
              <View 
                key={task.id} 
                className="bg-white rounded-2xl p-4 mb-4 flex-row items-center shadow-sm"
              >
                <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${task.completed ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <Feather 
                    name={task.completed ? "check" : "clock"} 
                    size={20} 
                    color={task.completed ? "#0e9f6e" : "#f59e0b"} 
                  />
                </View>
                
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">{task.title}</Text>
                  <Text className="text-gray-500 text-sm">{task.time}</Text>
                </View>
                
                <Pressable>
                  <Feather name="more-vertical" size={20} color="#9ca3af" />
                </Pressable>
              </View>
            ))}
            
            <Pressable className="bg-purple-50 rounded-2xl p-4 items-center mt-2">
              <Text className="text-purple-700 font-medium">View All Tasks</Text>
            </Pressable>
          </View>
        ) : activeTab === 'about' ? (
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">About Me</Text>
            
            <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
              <Text className="text-gray-600 mb-6">{user.bio}</Text>
              
              <View className="flex-row items-center mb-4">
                <Feather name="mail" size={20} color="#8b5cf6" />
                <Text className="text-gray-700 ml-3">{user.email}</Text>
              </View>
              
              <View className="flex-row items-center mb-4">
                <Feather name="map-pin" size={20} color="#8b5cf6" />
                <Text className="text-gray-700 ml-3">{user.location}</Text>
              </View>
              
              <View className="flex-row items-center">
                <Feather name="calendar" size={20} color="#8b5cf6" />
                <Text className="text-gray-700 ml-3">Member since {user.joined}</Text>
              </View>
            </View>
            
            <Text className="text-lg font-bold text-gray-800 mb-4">Achievements</Text>
            
            <View className="flex-row justify-between mb-8">
              {achievements.map(achievement => (
                <View 
                  key={achievement.id} 
                  className="bg-white rounded-2xl p-4 items-center flex-1 mx-1 shadow-sm"
                >
                  <View className="bg-purple-100 w-14 h-14 rounded-full items-center justify-center mb-3">
                    <Feather name={achievement.icon} size={24} color="#8b5cf6" />
                  </View>
                  <Text className="text-gray-800 font-bold text-lg">{achievement.count}</Text>
                  <Text className="text-gray-600 text-xs text-center">{achievement.title}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">Recent Activity</Text>
            
            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
              <View className="flex-row items-start mb-6">
                <View className="bg-green-100 p-2 rounded-full mr-4">
                  <Feather name="check-circle" size={20} color="#0e9f6e" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Completed "Client Meeting" task</Text>
                  <Text className="text-gray-500 text-sm mt-1">Today at 10:30 AM</Text>
                </View>
              </View>
              
              <View className="flex-row items-start mb-6">
                <View className="bg-blue-100 p-2 rounded-full mr-4">
                  <Feather name="plus" size={20} color="#3f83f8" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Created "Project Deadline" task</Text>
                  <Text className="text-gray-500 text-sm mt-1">Yesterday at 4:45 PM</Text>
                </View>
              </View>
              
              <View className="flex-row items-start mb-6">
                <View className="bg-purple-100 p-2 rounded-full mr-4">
                  <Feather name="edit" size={20} color="#8b5cf6" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Updated profile information</Text>
                  <Text className="text-gray-500 text-sm mt-1">2 days ago</Text>
                </View>
              </View>
              
              <View className="flex-row items-start">
                <View className="bg-amber-100 p-2 rounded-full mr-4">
                  <Feather name="award" size={20} color="#f59e0b" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Earned "Productivity Guru" badge</Text>
                  <Text className="text-gray-500 text-sm mt-1">3 days ago</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        
        {/* Productivity section */}
        <View className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 mb-8">
          <View className="flex-row items-center mb-4">
            <View className="bg-white/20 p-3 rounded-full mr-3">
              <Feather name="award" size={24} color="white" />
            </View>
            <Text className="text-white text-xl font-bold">Productivity Level</Text>
          </View>
          
          <Text className="text-white/90 mb-4">
            Your current productivity is {stats.productivity}%. Keep up the great work!
          </Text>
          
          <View className="bg-white/20 h-3 rounded-full mb-2">
            <View 
              className="bg-white h-3 rounded-full" 
              style={{ width: `${stats.productivity}%` }}
            ></View>
          </View>
          
          <View className="flex-row justify-between">
            <Text className="text-white/70 text-xs">0%</Text>
            <Text className="text-white/70 text-xs">100%</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Upgrade to premium button */}
      <Pressable 
        className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-4 flex-row items-center justify-center shadow-xl"
        style={{
          shadowColor: '#f59e0b',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10
        }}
      >
        <MaterialIcons name="workspace-premium" size={24} color="white" />
        <Text className="text-white font-bold text-lg ml-2">Upgrade to Premium</Text>
      </Pressable>
    </View>
  );
};

export default Profile;