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
        <View className="flex-1 justify-center items-center px-10 min-h-[300px] bg-background dark:bg-background-dark">

            <Text className="text-2xl font-bold text-text-primary-dark dark:text-text-primary text-center mb-2">
                {title}
            </Text>

            {message && (
                <Text className="text-base text-surface-dark dark:text-surface mb-6 text-center">
                    {message}
                </Text>
            )}

            {onRefresh && buttonText && (
                <Button
                    title={buttonText}
                    onPress={onRefresh}
                    variant="outline"
                />
            )}

        </View>
    )
}

export default ErrorState
