import React from "react";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type InfoRowProps = {
  label: string;
  value?: string;
  component?: React.ReactNode;
  icon?: keyof typeof Ionicons.glyphMap;
  isClickable?: boolean;
  onPress?: () => void;
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
    <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
      {/* Left Side (Icon + Label) */}
      <View className="flex-row items-center">
        {icon && (
          <Ionicons
            name={icon}
            size={16}
            color="#6B7280" // gray-500
            style={{ marginRight: 6 }}
          />
        )}
        <Text className="text-[15px] font-medium text-gray-500">
          {label}
        </Text>
      </View>

      {/* Right Side (Value / Component) */}
      <Pressable
        disabled={!isClickable}
        onPress={onPress}
        className="flex-1 ml-4"
      >
        {component ? (
          component
        ) : (
          <Text
            className={`text-[15px] text-right ${
              isClickable
                ? "text-blue-600 underline"
                : "text-gray-900"
            }`}
          >
            {value}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default InfoRow;