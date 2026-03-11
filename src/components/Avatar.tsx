import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

const Avatar = () => {
    return (
        <View className="w-20 h-20 rounded-full justify-center items-center mb-4 bg-primary-300 dark:bg-primary-900">
            <Ionicons name="person" size={40} color="#EE7610" />
        </View>
    )
}

export default Avatar
