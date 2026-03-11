import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Button from "./Button";

interface EmptyStateProps {
    message?: string;
    subMessage?: string;
    onAction?: () => void;
    actionLabel?: string;
    icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    message = "",
    subMessage,
    onAction,
    actionLabel,
    icon,
}) => {
    return (
        <View className="flex-1 justify-center items-center  min-h-[300px]">

            {/* Main Message */}
            <View>
            <Text className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
                {message}
            </Text>

            {/* Sub Message */}
            {subMessage && (
                <Text className="text-base text-surface-dark dark:text-surface mb-6 leading-5">
                    {subMessage}
                </Text>
            )}

            {/* Optional Action Button */}
            {onAction && actionLabel && (
                <Button
                    title={actionLabel}
                    onPress={onAction}
                    variant="primary"
                    fullWidth={false}
                />
            )}
            </View>
        </View>
    );
};

export default EmptyState;