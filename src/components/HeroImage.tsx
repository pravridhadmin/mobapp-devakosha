import React from "react";
import { ImageBackground, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

interface Props {
  imageUrl: string;
  children?: React.ReactNode;
}

const HeroImage: React.FC<Props> = ({ imageUrl, children }) => {
  return (
    <View className="h-96 w-full">
      {/* Background Image */}
        <ImageBackground
        source={imageUrl ? { uri: imageUrl } : require("../../assets/splash-icon.png")}
        className="flex-1 justify-between"
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    </View>
  );
};

export default HeroImage;