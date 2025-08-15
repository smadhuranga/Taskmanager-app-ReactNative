import { View, Text, Pressable, TextInput, Image, Animated, Easing, ScrollView, KeyboardAvoidingView, Platform , Alert ,ActivityIndicator} from 'react-native';
import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { register } from '@/services/authService'; // Adjust the import path as necessary


const Register = () => {
 
  const router = useRouter();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading , setIsLoading] = useState<boolean>(false);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  
  const handleRegister = async () => {
    if (isLoading) return;
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    await register(email, password)
    .then((res) => {
      router.back();
    }) // const res = await register(email, password)
    .catch((err) => {
      Alert.alert("Registration Failed", "Something went wrong");
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };
  


  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  // Background animation
  const bgAnim = useRef(new Animated.Value(0)).current;
  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#4c1d95', '#7e22ce']
  });

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
        friction: 6,
        useNativeDriver: true
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 15000,
            easing: Easing.linear,
            useNativeDriver: true
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
          })
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(bgAnim, {
            toValue: 1,
            duration: 8000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false
          }),
          Animated.timing(bgAnim, {
            toValue: 0,
            duration: 8000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false
          })
        ])
      )
    ]).start();
  }, []);



  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View 
      className="flex-1"
      style={{ backgroundColor: bgColor }}
    >
      {/* Decorative floating shapes */}
      <Animated.View 
        className="absolute top-20 left-10 w-24 h-24 bg-purple-400 rounded-full opacity-20"
        style={{ 
          transform: [{ rotate: rotateInterpolate }],
          top: 100,
          left: 20
        }}
      />
      <Animated.View 
        className="absolute top-40 right-8 w-32 h-32 bg-pink-400 rounded-full opacity-20"
        style={{ 
          transform: [{ rotate: rotateInterpolate }],
          top: 200,
          right: 30
        }}
      />
      <Animated.View 
        className="absolute bottom-40 left-16 w-20 h-20 bg-indigo-400 rounded-full opacity-20"
        style={{ 
          transform: [{ rotate: rotateInterpolate }],
          bottom: 180,
          left: 60
        }}
      />
      
      {/* Header section */}
      <View className="pt-16 px-8 pb-6">
        <Pressable 
          onPress={() => router.push('/login')}
          className="absolute top-16 left-8 z-10"
        >
          <Text className="text-white text-lg">← Back</Text>
        </Pressable>
        <Text className="text-white text-4xl font-bold text-center mt-4">Create Account</Text>
        <Text className="text-purple-200 text-center mt-2">Join our community today</Text>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View 
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mx-6 mt-6 border-2 border-white/20"
            style={{ 
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideUpAnim }
              ]
            }}
          >
            {/* Name Input */}
            {/* <View className="mb-6">
              <Text className="text-purple-200 mb-2">Full Name</Text>
              <TextInput
                className="bg-white/20 text-white rounded-xl px-6 py-4 text-lg"
                placeholder="John Doe"
                placeholderTextColor="#d8b4fe"
                value={name}
                onChangeText={setName}
                
              />
            </View> */}
            
            {/* Email Input */}
            <View className="mb-6">
              <Text className="text-purple-200 mb-2">Email Address</Text>
              <TextInput
                className="bg-white/20 text-white rounded-xl px-6 py-4 text-lg"
                placeholder="john@example.com"
                placeholderTextColor="#d8b4fe"
                value={email}
                onChangeText={setEmail}
               
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-purple-200 mb-2">Password</Text>
              <TextInput
                className="bg-white/20 text-white rounded-xl px-6 py-4 text-lg"
                placeholder="••••••••"
                placeholderTextColor="#d8b4fe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
               
              />
            </View>
            
            {/* Confirm Password Input */}
            <View className="mb-8">
              <Text className="text-purple-200 mb-2">Confirm Password</Text>
              <TextInput
                className="bg-white/20 text-white rounded-xl px-6 py-4 text-lg"
                placeholder="••••••••"
                placeholderTextColor="#d8b4fe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
               
              />
            </View>
            
            {/* Terms and Conditions
            <View className="flex-row items-center mb-8">
              <Pressable className="w-6 h-6 border-2 border-purple-300 rounded-md mr-3 items-center justify-center">
                <View className="w-4 h-4 bg-purple-500 rounded-sm" />
              </Pressable>
              <Text className="text-purple-200 flex-1">
                I agree to the <Text className="text-white font-bold">Terms & Conditions</Text> and <Text className="text-white font-bold">Privacy Policy</Text>
              </Text>
            </View> */}
            
            {/* Register Button */}
            
            <Pressable 
              className={`bg-gradient-to-r 'from-indigo-500 to-purple-600' : 'from-gray-500 to-gray-600'} rounded-xl p-4 items-center shadow-lg shadow-purple-500/30`}
              
              onPress={handleRegister}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-xl font-bold">Create Account</Text>
              )}
            </Pressable>
          </Animated.View>
          
          {/* Divider */}
          <View className="flex-row items-center mx-8 my-8">
            <View className="flex-1 h-px bg-white/20" />
            <Text className="text-purple-200 mx-4">or continue with</Text>
            <View className="flex-1 h-px bg-white/20" />
          </View>
          
          {/* Social Login */}
          <View className="flex-row justify-center mx-8 space-x-6">
            {[
              { name: 'Google', color: '#DB4437' },
              { name: 'Facebook', color: '#4267B2' },
              { name: 'Apple', color: '#000000' }
            ].map((provider) => (
              <Pressable 
                key={provider.name}
                className="w-16 h-16 rounded-2xl items-center justify-center"
                style={{ backgroundColor: `${provider.color}20` }}
              >
                <Text className="text-white font-bold">{provider.name}</Text>
              </Pressable>
            ))}
          </View>
          
          {/* Already have an account */}
          <View className="flex-row justify-center mt-10">
            <Text className="text-purple-200">Already have an account? </Text>
            <Pressable onPress={() => router.push('/login')}>
              <Text className="text-white font-bold">Sign In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default Register;