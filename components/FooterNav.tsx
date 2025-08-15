import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

const FooterNav = () => {
  return (

     <View className="flex-row justify-around w-4/5 z-10 absolute bottom-12">
      <View className="rounded-full p-0.5 shadow-lg shadow-black/30 bg-green-500 mt-6">
          <Link href="/" className="py-4 rounded-full bg-white/15 items-center">
            <Text className="font-bold text-sm text-white text-shadow shadow-black/20 px-2.5 tracking-wider">
              🏠 Home
            </Text>
          </Link>
        </View>
        <View className="rounded-full p-0.5 shadow-lg shadow-black/30 bg-rose-500 mt-6">
          <Link href="/profile" className="py-4 rounded-full bg-white/15 items-center">
            <Text className="font-bold text-sm text-white text-shadow shadow-black/20 px-2.5 tracking-wider">
              👤 Profile
            </Text>
          </Link>
        </View>
        

        <View className="rounded-full p-0.5 shadow-lg shadow-black/30 bg-sky-400 mt-6">
          <Link href="/user" className="py-4 rounded-full bg-white/15 items-center">
            <Text className="font-bold text-sm text-white text-shadow shadow-black/20 px-2.5 tracking-wider">
              👥 User
            </Text>
          </Link>
        </View>
        <View className="rounded-full p-0.5 shadow-lg shadow-black/30 bg-sky-400 mt-6">
          <Link href="/login" className="py-4 rounded-full bg-white/15 items-center">
            <Text className="font-bold text-sm text-white text-shadow shadow-black/20 px-2.5 tracking-wider">
              🔐 Login
            </Text>
          </Link>
        </View>
        <Link href={"/home/test"}>
          <Text className='text-sm mt-2 text-gray-500'>Home Folder Test</Text>
        </Link>
        <Link href={"/home/"}>
          <Text className='text-sm mt-2 text-gray-500'>Home Index Test</Text>
        </Link>
      </View>
   
  )
}

export default FooterNav