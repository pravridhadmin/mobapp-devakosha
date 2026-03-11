import React from "react";
import {
    Text,
    Pressable,
    ActivityIndicator,
    GestureResponderEvent,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";

interface ButtonProps {
    title: String;
    onPress?: (event: GestureResponderEvent) => void;
    variant?: ButtonVariant;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = "primary",
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
}) => {
    const isDisabled = disabled || loading;

    const baseStyle =
        "px-6 py-4 rounded-md items-center justify-center";

    const widthStyle = fullWidth ? "w-full" : "";

    const variantStyles: Record<ButtonVariant, string> = {
        primary: "bg-primary-500",
        outline: "border border-primary-500 bg-transparent",
        ghost: "bg-transparent",
        danger: "bg-red-500",
    };

    const textStyles: Record<ButtonVariant, string> = {
        primary: "text-text-primary-dark",
        outline: "text-primary-500",
        ghost: "text-primary-500",
        danger: "text-text-primary-dark",
    };

    const iconColor =
        variant === "outline" || variant === "ghost"
            ? "#F97316"
            : "#FFFFFF";

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            className={`${baseStyle} ${variantStyles[variant]} ${widthStyle} ${isDisabled ? "opacity-50" : "active:opacity-80"
                }`}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === "outline" || variant === "ghost" ? "#F97316" : "#FFFFFF"}
                />
            ) : (
                <View className="flex-row items-center">

                    {/* Left Icon */}
                    {leftIcon && (
                        <Ionicons
                            name={leftIcon}
                            size={18}
                            color={iconColor}
                            style={{ marginRight: 8 }}
                        />
                    )}

                    {/* Title */}
                    <Text className={`text-base font-semibold ${textStyles[variant]}`}>
                        {title}
                    </Text>

                    {/* Right Icon */}
                    {rightIcon && (
                        <Ionicons
                            name={rightIcon}
                            size={18}
                            color={iconColor}
                            style={{ marginLeft: 8 }}
                        />
                    )}

                </View>
            )}
        </Pressable>
    );
};

export default Button;