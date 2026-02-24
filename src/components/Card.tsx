import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Badge from "./Badge";
import { Ionicons } from "@expo/vector-icons";

interface TempleCardProps {
  image: string;
  name: string;
  district: string;
  state: string;
  address?: string;
  cardWidth?: string | number;
  cardHeight?: string | number;
  onPress?: () => void;
}

const TempleCard: React.FC<TempleCardProps> = ({
  image,
  name,
  district,
  state,
  address,
  cardWidth = "",
  cardHeight = "h-48",
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`mb-6 rounded-3xl overflow-hidden bg-surface dark:bg-surface-dark active:opacity-90 shadow ${cardWidth}`}
    >
      {/* Temple Image */}
      {!image ? (
        <View className="w-full h-[150px] bg-[#F5F5F5] dark:bg-slate-800 justify-center items-center">
          <Ionicons
            name="image-outline"
            size={40}
            className="text-[#CCC] dark:text-slate-500"
          />
          <Text className="text-[#999] dark:text-slate-400 mt-2 text-[12px] font-medium">
            Coming Soon
          </Text>
        </View>
      ) : (
        <Image
          source={{ uri: image }}
          className={`w-full ${cardHeight}`}
          resizeMode="cover"
        />
      )}

      {/* Content */}
      <View className="p-4">
        {/* Temple Name */}
        <Text className="text-black text-xl font-semibold mb-2 dark:text-white">
          {name}
        </Text>

        {/* District + State Row */}
        <View className="flex-row items-center mb-2">
          <Badge text={district} />

          <Text className="text-zinc-400 mx-2">•</Text>

          <Text className="text-zinc-600 text-sm dark:text-zinc-300">
            {state}
          </Text>
        </View>

        {/* Address */}
        {address && (
          <Text className="text-zinc-600 text-sm leading-5 dark:text-zinc-300">
            {address}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default TempleCard;