import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

const Avatar = () => {
  return (
    <View className="w-20 h-20 rounded-full justify-center items-center mb-4 bg-blue-100 dark:bg-blue-900">
        <Ionicons name="person" size={40} color="#2563EB" />
    </View>
  )
}

export default Avatar
