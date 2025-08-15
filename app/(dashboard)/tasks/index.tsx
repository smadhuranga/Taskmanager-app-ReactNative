import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Animated, StyleSheet, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Feather, FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import { getAllTask } from '@/services/taskService';

const TaskScreen = () => {
const handleFetchData = async () => {
   await getAllTask().then((data) => {
      console.log(data);
   }).catch((error) => {
      console.error(error);
   })
}

  const [tasks] = useState([
    { 
      id: 1, 
      title: 'Design Meeting', 
      description: 'Discuss new project UI with team', 
      time: '10:00 AM - 11:30 AM', 
      category: 'work', 
      completed: false,
      priority: 'high',
      members: 4
    },
    { 
      id: 2, 
      title: 'Grocery Shopping', 
      description: 'Buy fruits, vegetables, and milk', 
      time: '2:30 PM', 
      category: 'personal', 
      completed: true,
      priority: 'medium',
      members: 1
    },
    { 
      id: 3, 
      title: 'Gym Workout', 
      description: 'Chest and triceps day', 
      time: '6:00 PM - 7:30 PM', 
      category: 'health', 
      completed: false,
      priority: 'high',
      members: 0
    },
    { 
      id: 4, 
      title: 'Call Mom', 
      description: 'Check how she is doing', 
      time: '7:00 PM', 
      category: 'personal', 
      completed: false,
      priority: 'low',
      members: 1
    },
    { 
      id: 5, 
      title: 'Project Deadline', 
      description: 'Submit final design files to client', 
      time: '11:59 PM', 
      category: 'work', 
      completed: false,
      priority: 'urgent',
      members: 3
    },
  ]);
  
  const [categories] = useState([
    { id: 'all', name: 'All', icon: 'grid', count: 18 },
    { id: 'work', name: 'Work', icon: 'briefcase', count: 8 },
    { id: 'personal', name: 'Personal', icon: 'user', count: 5 },
    { id: 'health', name: 'Health', icon: 'heart', count: 3 },
    { id: 'shopping', name: 'Shopping', icon: 'shopping-cart', count: 2 },
  ]);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('today');
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 65,
      duration: 1500,
      useNativeDriver: false
    }).start();
  }, []);

  const toggleTaskCompletion = (id) => {
    // Implementation would update task completion status
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-gradient-to-r from-purple-600 to-indigo-700 pt-16 pb-6 px-6 rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-black text-xl">Hello, Alex</Text>
            <Text className="text-black text-3xl font-bold mt-1">Your Tasks</Text>
          </View>
          <Pressable className="bg-white/20 p-3 rounded-full">
            <Feather name="bell" size={24} color="white" />
            <View className="absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-xs font-bold">3</Text>
            </View>
          </Pressable>
        </View>
        
        {/* Progress Section */}
        <View className="bg-black/20 rounded-2xl p-4 mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-black font-medium">Daily Progress</Text>
            <Text className="text-black font-bold">65%</Text>
          </View>
          
          <View className="bg-white/30 h-2 rounded-full mb-1">
            <Animated.View 
              className="bg-black h-2 rounded-full" 
              style={{ width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              }) }}
            />
          </View>
          
          <Text className="text-black/80 text-xs">6 of 9 tasks completed</Text>
        </View>
      </View>
      
      {/* Main Content */}
      <ScrollView className="flex-1 px-5 pt-5 pb-24" showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View className="flex-row bg-white rounded-2xl px-4 py-3 mb-6 shadow-sm items-center">
          <Feather name="search" size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-3 text-gray-800"
            placeholder="Search tasks, projects..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable className="bg-purple-100 p-2 rounded-lg">
            <Feather name="sliders" size={18} color="#8b5cf6" />
          </Pressable>
        </View>
        
        {/* Time Tabs */}
        <View className="flex-row bg-white rounded-2xl p-1 mb-6 shadow-sm">
          <Pressable 
            className={`flex-1 py-3 rounded-2xl items-center ${activeTab === 'today' ? 'bg-purple-100' : ''}`}
            onPress={() => setActiveTab('today')}
          >
            <Text className={`font-medium ${activeTab === 'today' ? 'text-purple-700' : 'text-gray-500'}`}>Today</Text>
          </Pressable>
          <Pressable 
            className={`flex-1 py-3 rounded-2xl items-center ${activeTab === 'upcoming' ? 'bg-purple-100' : ''}`}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text className={`font-medium ${activeTab === 'upcoming' ? 'text-purple-700' : 'text-gray-500'}`}>Upcoming</Text>
          </Pressable>
          <Pressable 
            className={`flex-1 py-3 rounded-2xl items-center ${activeTab === 'completed' ? 'bg-purple-100' : ''}`}
            onPress={() => setActiveTab('completed')}
          >
            <Text className={`font-medium ${activeTab === 'completed' ? 'text-purple-700' : 'text-gray-500'}`}>Completed</Text>
          </Pressable>
        </View>
        
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {categories.map((category) => (
            <Pressable 
              key={category.id}
              className={`mr-4 px-5 py-4 rounded-2xl items-center justify-center ${
                activeCategory === category.id 
                  ? 'bg-purple-100 border border-purple-300 shadow-sm' 
                  : 'bg-white shadow-sm'
              }`}
              onPress={() => setActiveCategory(category.id)}
            >
              <View className={`w-12 h-12 rounded-full mb-2 items-center justify-center ${
                activeCategory === category.id 
                  ? 'bg-purple-600' 
                  : 'bg-gray-200'
              }`}>
                <Feather 
                  name={category.icon} 
                  size={24} 
                  color={activeCategory === category.id ? 'white' : 'gray'} 
                />
              </View>
              <Text className={`font-medium ${
                activeCategory === category.id 
                  ? 'text-purple-700' 
                  : 'text-gray-600'
              }`}>
                {category.name}
              </Text>
              <Text className={`text-xs mt-1 ${
                activeCategory === category.id 
                  ? 'text-purple-600' 
                  : 'text-gray-500'
              }`}>
                {category.count} tasks
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        
        {/* Task List Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-800 text-xl font-bold">
            {activeTab === 'today' ? "Today's Tasks" : 
             activeTab === 'upcoming' ? "Upcoming Tasks" : "Completed Tasks"}
          </Text>
          <Pressable>
            <Text className="text-purple-600">View All</Text>
          </Pressable>
        </View>
        
        {/* Task List */}
        {tasks.map((task) => (
          <Pressable 
            key={task.id}
            className={`bg-white rounded-2xl p-5 mb-4 shadow-sm ${
              task.completed ? 'opacity-70' : ''
            }`}
            style={{
              borderLeftWidth: 4,
              borderLeftColor: task.priority === 'urgent' ? '#f05252' : 
                              task.priority === 'high' ? '#f59e0b' : 
                              task.priority === 'medium' ? '#3f83f8' : '#0e9f6e'
            }}
          >
            <View className="flex-row items-start">
              <Pressable 
                className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center mt-1 ${
                  task.completed 
                    ? 'bg-purple-600 border-purple-600' 
                    : 'border-gray-300'
                }`}
                onPress={() => toggleTaskCompletion(task.id)}
              >
                {task.completed && <Feather name="check" size={16} color="white" />}
              </Pressable>
              
              <View className="flex-1">
                <Text 
                  className={`text-lg font-bold mb-1 ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {task.title}
                </Text>
                <Text className="text-gray-500 mb-3">{task.description}</Text>
                
                <View className="flex-row items-center">
                  <Feather name="clock" size={16} color="#6b7280" />
                  <Text className="text-gray-500 ml-2 text-sm">{task.time}</Text>
                  
                  {task.members > 0 && (
                    <>
                      <Feather name="users" size={16} color="#6b7280" className="ml-4" />
                      <Text className="text-gray-500 ml-2 text-sm">{task.members} people</Text>
                    </>
                  )}
                </View>
              </View>
            </View>
            
            {/* Task Footer */}
            <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-100">
              <View className="flex-row">
                <Pressable className="bg-purple-50 rounded-full px-3 py-1 flex-row items-center mr-3">
                  <MaterialIcons 
                    name={task.category === 'work' ? 'work' : 
                          task.category === 'personal' ? 'person' : 
                          task.category === 'health' ? 'favorite' : 'shopping-cart'} 
                    size={16} 
                    color="#8b5cf6" 
                  />
                  <Text className="text-purple-700 text-sm ml-1 capitalize">
                    {task.category}
                  </Text>
                </Pressable>
                
                <Pressable className="bg-gray-100 rounded-full px-3 py-1 flex-row items-center">
                  <MaterialCommunityIcons 
                    name={task.priority === 'urgent' ? 'alert-circle' : 
                          task.priority === 'high' ? 'arrow-up-bold-circle' : 
                          task.priority === 'medium' ? 'equal-circle' : 'arrow-down-bold-circle'} 
                    size={16} 
                    color={
                      task.priority === 'urgent' ? '#f05252' : 
                      task.priority === 'high' ? '#f59e0b' : 
                      task.priority === 'medium' ? '#3f83f8' : '#0e9f6e'
                    } 
                  />
                  <Text className="text-gray-700 text-sm ml-1 capitalize">
                    {task.priority}
                  </Text>
                </Pressable>
              </View>
              
              <View className="flex-row">
                <Pressable className="ml-3">
                  <Feather name="edit-2" size={18} color="#6b7280" />
                </Pressable>
                <Pressable className="ml-3">
                  <Feather name="trash-2" size={18} color="#f05252" />
                </Pressable>
              </View>
            </View>
          </Pressable>
        ))}
        
        {/* Productivity Tip */}
        <View className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 mb-8 mt-4">
          <View className="flex-row items-center mb-4">
            <View className="bg-white/20 p-3 rounded-full mr-3">
              <Feather name="zap" size={24} color="white" />
            </View>
            <Text className="text-white text-xl font-bold">Productivity Tip</Text>
          </View>
          
          <Text className="text-white/90">
            Tackle your most challenging task first thing in the morning when your energy is highest.
          </Text>
        </View>
      </ScrollView>
      
      {/* Add Task Button */}
      <Pressable 
        className="absolute bottom-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-700 w-16 h-16 rounded-full items-center justify-center shadow-xl"
        style={{
          shadowColor: '#7e3af2',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10
        }}
      >
        <Feather name="plus" size={32} color="white" />
      </Pressable>
    </View>
  );
};

export default TaskScreen;