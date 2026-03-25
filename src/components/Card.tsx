import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Badge from "./Badge";
import { Ionicons } from "@expo/vector-icons";
import AddressRow from "./AddressRow";

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
                <View className="w-full h-[150px] bg-surface dark:bg-surface-dark justify-center items-center">
                    <Ionicons
                        name="image-outline"
                        size={40}
                        className="text-[#CCC] dark:text-slate-500"
                    />
                    <Text className="text-surface-dark dark:text-surface mt-2 text-sm font-medium">
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
                <Text className="text-text-primary dark:text-text-primary-dark text-xl font-semibold mb-2 line-clamp-1">
                    {name}
                </Text>

                {/* District + State Row */}
                <AddressRow city={district} state={state} />
              

                {/* Address */}
                {address && (
                    <Text className="text-base leading-5 text-surface-dark dark:text-surface mt-2">
                        {address}
                    </Text>
                )}
            </View>
        </Pressable>
    );
};

export default React.memo(TempleCard);