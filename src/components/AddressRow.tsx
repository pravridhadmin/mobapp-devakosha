import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Badge from "./Badge";

interface Props {
    city: string;
    state: string;
    onPress?: any;
}

const AddressRow: React.FC<Props> = ({ city, state, onPress }) => {
    return (
        <Pressable className="flex-row items-center" onPress={onPress}>
            <View className="flex-row items-center space-x-2">
                <Badge text={city} />
                <Text className="text-zinc-400 mx-1.5">•</Text>

                <Text className="text-zinc-400 text-sm">
                    {state}
                </Text>
            </View>
        </Pressable>
    );
};

export default AddressRow;