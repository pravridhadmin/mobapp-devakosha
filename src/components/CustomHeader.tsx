import React from 'react'
import IconButton from './IconButton'
import { Text, View } from 'react-native'

interface Props {
    screenTitle?: string,
    onPress?: () => void
}

const CustomHeader = ({ screenTitle, onPress }: Props) => {
    return (
        <View className="flex-row items-center justify-between px-4 py-3">
            <IconButton
                iconName="arrow-back"
                className="bg-background dark:bg-background-dark"
                onPress={onPress}
            />
            {screenTitle &&
                (
                    <Text className="text-xl font-bold text-gray-900 dark:text-white">
                        {screenTitle}
                    </Text>
                )}
            <View className="w-6" />
        </View>
    )
}

export default CustomHeader
