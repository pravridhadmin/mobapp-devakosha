import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Badge from "./Badge";

interface Props {
  city: string;
  state: string;
  onPress?: () => void;
}

const AddressRow: React.FC<Props> = ({ city, state, onPress }) => {
  return (
    <Pressable className="flex-row items-center mt-3" onPress={onPress}>
      <Ionicons
        name="location-outline"
        size={18}
        color="#F97316"
      />

      <View className="flex-row items-center ml-2 space-x-2">
       <Badge text={city} />
        <Text className="text-zinc-400">•</Text>

        <Text className="text-zinc-400 text-sm">
          {state}
        </Text>
      </View>
    </Pressable>
  );
};

export default AddressRow;