import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Pressable, Animated, Easing, Image } from 'react-native';
import { AntDesign, Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design Meeting', description: 'Discuss new project UI', time: '10:00 AM', category: 'work', completed: false },
    { id: 2, title: 'Grocery Shopping', description: 'Buy fruits and vegetables', time: '2:30 PM', category: 'personal', completed: true },
    { id: 3, title: 'Gym Workout', description: 'Chest and triceps day', time: '6:00 PM', category: 'health', completed: false },
    { id: 4, title: 'Call Mom', description: 'Check how she is doing', time: '7:00 PM', category: 'personal', completed: false },
    { id: 5, title: 'Project Deadline', description: 'Submit final design files', time: '11:59 PM', category: 'work', completed: false },
  ]);
  
  const [categories] = useState([
    { id: 'all', name: 'All Tasks', icon: 'list', count: 12 },
    { id: 'work', name: 'Work', icon: 'briefcase', count: 5 },
    { id: 'personal', name: 'Personal', icon: 'user', count: 4 },
    { id: 'health', name: 'Health', icon: 'heart', count: 3 },
    { id: 'shopping', name: 'Shopping', icon: 'shopping-cart', count: 2 },
  ]);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [greeting, setGreeting] = useState('Good Morning');
  const [stats, setStats] = useState({ completed: 24, pending: 8, overdue: 3 });
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  React.useEffect(() => {
    // Start animations on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true
      })
    ]).start();
    
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-gradient-to-b from-purple-600 to-indigo-700 pt-12 px-6 pb-8 rounded-b-3xl shadow-lg">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-black text-xl">{greeting}</Text>
            <Text className="text-black text-3xl font-bold mt-1">Alex Morgan</Text>
          </View>
          <Pressable className="bg-white/20 p-3 rounded-full">
            <Feather name="bell" size={24} color="white" />
            <View className="absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-xs font-bold">3</Text>
            </View>
          </Pressable>
        </View>
        
        {/* Stats Cards */}
        <Animated.View 
          className="flex-row justify-between mb-6"
          style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
        >
          <View className="bg-white/20 rounded-2xl p-4 flex-1 mx-2 items-center">
            <Text className="text-black text-2xl font-bold">{stats.completed}</Text>
            <Text className="text-black/80 text-sm">Completed</Text>
          </View>
          <View className="bg-white/20 rounded-2xl p-4 flex-1 mx-2 items-center">
            <Text className="text-black text-2xl font-bold">{stats.pending}</Text>
            <Text className="text-black/80 text-sm">Pending</Text>
          </View>
          <View className="bg-white/20 rounded-2xl p-4 flex-1 mx-2 items-center">
            <Text className="text-black text-2xl font-bold">{stats.overdue}</Text>
            <Text className="text-black/80 text-sm">Overdue</Text>
          </View>
        </Animated.View>
        
        {/* Search Bar */}
        <Pressable className="bg-black/20 rounded-xl px-4 py-3 flex-row items-center">
          <Feather name="search" size={20} color="white" />
          <Text className="text-white/80 ml-3">Search tasks, projects...</Text>
          <View className="ml-auto bg-white/30 rounded-lg p-1">
            <Feather name="sliders" size={18} color="white" />
          </View>
        </Pressable>
      </View>
      
      {/* Main Content */}
      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-800 text-xl font-bold">Categories</Text>
            <Pressable>
              <Text className="text-purple-600">View All</Text>
            </Pressable>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="py-2"
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
        </View>
        
        {/* Today's Tasks */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-800 text-xl font-bold">Today's Tasks</Text>
            <Pressable>
              <Text className="text-purple-600">See All</Text>
            </Pressable>
          </View>
          
          {tasks.map((task) => (
            <Animated.View 
              key={task.id}
              className={`bg-white rounded-2xl p-4 mb-4 shadow-sm ${
                task.completed ? 'opacity-60' : ''
              }`}
              style={{ 
                borderLeftWidth: 4,
                borderLeftColor: task.category === 'work' ? '#7e3af2' : 
                                task.category === 'personal' ? '#0e9f6e' : 
                                task.category === 'health' ? '#3f83f8' : '#f05252',
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }}
            >
              <View className="flex-row">
                <Pressable 
                  className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${
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
                    className={`text-lg font-medium ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">{task.description}</Text>
                </View>
                
                <View className="items-end">
                  <Text className="text-gray-500">{task.time}</Text>
                  <View className="flex-row mt-3">
                    <Pressable className="ml-3">
                      <Ionicons 
                        name={task.completed ? "arrow-undo" : "checkmark-circle"} 
                        size={20} 
                        color={task.completed ? "#6b7280" : "#0e9f6e"} 
                      />
                    </Pressable>
                    <Pressable className="ml-3">
                      <MaterialIcons 
                        name="delete-outline" 
                        size={20} 
                        color="#f05252" 
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>
        
        {/* Productivity Section */}
        <View className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 mb-8">
          <View className="flex-row items-center mb-4">
            <View className="bg-white/20 p-3 rounded-full mr-3">
              <Feather name="award" size={24} color="white" />
            </View>
            <Text className="text-white text-xl font-bold">Productivity</Text>
          </View>
          
          <Text className="text-white/90 mb-4">
            You've completed 65% of your tasks this week. Keep up the good work!
          </Text>
          
          <View className="bg-white/20 h-2 rounded-full mb-2">
            <View 
              className="bg-white h-2 rounded-full" 
              style={{ width: '65%' }}
            ></View>
          </View>
          
          <View className="flex-row justify-between">
            <Text className="text-white/70 text-sm">0%</Text>
            <Text className="text-white/70 text-sm">100%</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Add Task Button */}
      <Pressable 
        className="absolute bottom-8 right-8 bg-purple-600 w-16 h-16 rounded-full items-center justify-center shadow-xl"
        style={{
          shadowColor: '#7e3af2',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 15,
          elevation: 10
        }}
      >
        <Feather name="plus" size={32} color="white" />
      </Pressable>
    </View>
  );
};

export default HomeScreen;