import { View, Text, Pressable, TextInput, Image, Animated, Easing , Alert  , ActivityIndicator} from 'react-native'
import React, { useState, useRef } from 'react'
import { useRouter } from 'expo-router'
import { login } from '@/services/authService' // Adjust the import path as necessary

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const fadeAnim = useRef(new Animated.Value(0)).current
    const scaleAnim = useRef(new Animated.Value(0.9)).current
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLogin = async () => {
        if (isLoading) return
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields")
            return
        }

        setIsLoading(true)
        await login(email, password)
            .then((res) => {
                router.push('/home')
            })
            .catch((err) => {
                Alert.alert("Login Failed", "Invalid email or password")
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: true
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true
            })
        ]).start()
    }, [])

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    return (
        <View className="flex-1 bg-gradient-to-b  bg-indigo-400 from-indigo-900 via-purple-800 to-pink-700">
            {/* Decorative Elements */}
            <View className="absolute top-10 left-0 w-40 h-40 bg-purple-500 rounded-full mix-blend-soft-light opacity-50" />
            <View className="absolute bottom-20 right-0 w-60 h-60 bg-pink-500 rounded-full mix-blend-soft-light opacity-30" />
            
            <Animated.View 
                className="flex-1 justify-center px-8 "
                style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
            >
                {/* Logo/Header */}
                <View className="items-center mb-12">
                    <Text className="text-4xl font-bold text-white mb-2">Welcome Back</Text>
                    <Text className="text-lg text-purple-200">Sign in to continue</Text>
                </View>

                {/* Animated Form Container */}
                <Animated.View 
                    className={`bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 ${isFocused ? 'border-purple-400' : 'border-white/20'} transition-colors`}
                >
                    {/* Email Input */}
                    <TextInput
                        className="bg-white/20 text-white rounded-xl px-6 py-4 mb-4 text-lg"
                        placeholder="Email"
                        placeholderTextColor="#d8b4fe"
                        value={email}
                        onChangeText={setEmail}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        keyboardType="email-address"
                    />

                    {/* Password Input */}
                    <TextInput
                        className="bg-white/20 text-white rounded-xl px-6 py-4 mb-6 text-lg"
                        placeholder="Password"
                        placeholderTextColor="#d8b4fe"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />

                    {/* Login Button */}
                    <Pressable 
                        className={`bg-gradient-to-r ${email && password ? 'from-pink-500 to-purple-600' : 'from-gray-400 to-gray-500'} rounded-xl p-4 items-center shadow-lg shadow-purple-500/30`}
                        disabled={!email || !password}
                        onPress={handleLogin}
                    >
                        {isLoading ? <ActivityIndicator color="white" /> : <Text className="text-white text-xl font-bold">Sign In</Text>}
                    </Pressable>
                    
                    {/* Forgot Password */}
                    <Pressable className="mt-4 self-center">
                        <Text className="text-purple-300 text-sm">Forgot Password?</Text>
                    </Pressable>
                </Animated.View>

                {/* Sign Up Section */}
                <View className="flex-row justify-center mt-8">
                    <Text className="text-purple-200">Don't have an account? </Text>
                    <Pressable onPress={() => router.push('/register')}>
                        <Text className="text-white font-bold underline">Sign Up</Text>
                    </Pressable>
                </View>

                {/* Social Login */}
                <View className="mt-10">
                    <Text className="text-center text-purple-200 mb-4">Or continue with</Text>
                    <View className="flex-row justify-center space-x-6">
                        {['google', 'facebook', 'apple'].map((provider) => (
                            <Pressable 
                                key={provider}
                                className="bg-white/10 p-4 rounded-full"
                            >
                                <Image 
                                    source={{ uri: `https://logo.clearbit.com/${provider}.com` }}
                                    className="w-6 h-6"
                                />
                            </Pressable>
                        ))}
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}

export default Login