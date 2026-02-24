import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  className?: string;
  onPress?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  size = 24,
  className = "",
  color = "#F97316", // orange-500
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`p-2 rounded-full active:opacity-70 ${className}`}
    >
      <Ionicons name={iconName} size={size} color={color}  />
    </Pressable>
  );
};

export default IconButton;