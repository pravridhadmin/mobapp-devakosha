import React from "react";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "./IconButton";

type InfoRowProps = {
    label: string;
    value?: string;
    component?: React.ReactNode;
    icon?: keyof typeof Ionicons.glyphMap;
    isClickable?: boolean;
    onPress?: any;
};

const InfoRow: React.FC<InfoRowProps> = ({
    label,
    value,
    component,
    icon,
    isClickable = false,
    onPress,
}) => {
    if (!value && !component) return null;

    return (
        <View className="flex-row items-center justify-between py-4 border-b border-surface dark:border-surface-dark">
            <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center mb-2">
                    <Text className="text-sm font-medium text-gray-500">
                        {label}
                    </Text>
                </View>
                {/* Value */}
                <Text className="text-sm text-text-primary dark:text-text-primary-dark">
                    {value} {component}
                </Text>

            </View>
            {/* Action Button */}
            {icon && (
                <IconButton
                    iconName={icon}
                    onPress={isClickable ? onPress : undefined}
                    color="#6B7280"
                    className="bg-surface dark:bg-surface-dark"
                />
            )}
        </View>
    );
};

export default InfoRow;