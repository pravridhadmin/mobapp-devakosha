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
            <View className="flex-row flex-wrap items-center space-x-2">
                <Badge text={city} />
                <Text className="text-surface-dark dark:text-surface mx-1.5">•</Text>

                <Text className="text-surface-dark dark:text-surface text-sm">
                    {state}
                </Text>
            </View>
        </Pressable>
    );
};

export default AddressRow;