import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  onAction?: () => void;
  actionLabel?: string;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No items found",
  subMessage,
  onAction,
  actionLabel,
  icon = "🛕",
}) => {
  return (
    <View className="flex-1 justify-center items-center px-10 min-h-[300px]">
      
      {/* Icon Circle */}
      <View className="w-20 h-20 rounded-full bg-zinc-800 justify-center items-center mb-6">
        <Text className="text-3xl">{icon}</Text>
      </View>

      {/* Main Message */}
      <Text className="text-lg font-bold text-white text-center mb-2">
        {message}
      </Text>

      {/* Sub Message */}
      {subMessage && (
        <Text className="text-sm text-zinc-400 text-center mb-6 leading-5">
          {subMessage}
        </Text>
      )}

      {/* Optional Action Button */}
      {onAction && actionLabel && (
        <TouchableOpacity
          onPress={onAction}
          className="bg-orange-500 px-6 py-3 rounded-full active:opacity-80"
        >
          <Text className="text-white text-sm font-semibold">
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState;