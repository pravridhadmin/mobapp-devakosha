import React from 'react'
import { Text, View } from 'react-native'
import Button from './Button'

interface Props {
    icon?: string;
    title: string;
    message?: string;
    buttonText?: string;
    onRefresh?: () => void;
}

const ErrorState = ({
    icon = "🛕",
    title,
    message,
    buttonText = "Retry",
    onRefresh }: Props) => {
    return (
        <View className="flex-1 justify-center items-center px-10 min-h-[300px] dark:bg-slate-900">

            {/* Icon Circle */}
            <View className="w-20 h-20 rounded-full bg-zinc-800 justify-center items-center mb-6">
                <Text className="text-3xl">{icon}</Text>
            </View>

            <Text className="text-lg font-bold text-zinc-400 text-center mb-2">
                {title}
            </Text>

            {message && (
                <Text className="text-sm text-zinc-400 text-center mb-6 leading-5">
                    {message}
                </Text>
            )}

            {onRefresh && buttonText && (
                <Button
                    title={buttonText}
                    onPress={onRefresh}
                    variant="primary"
                />
            )}

        </View>
    )
}

export default ErrorState
