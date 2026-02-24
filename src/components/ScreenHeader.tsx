import React from "react";
import { View } from "react-native";
import TitleText from "./TitleText";
import IconButton from "./IconButton";

interface ScreenHeaderProps {
  title: string;
  onProfilePress?: () => void;
  onFilterPress?: () => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onProfilePress,
  onFilterPress,
}) => {
  return (
    <View className="flex-row items-center justify-between px-6 pt-2 pb-3">
      {/* Left - Title */}
      <TitleText>{title}</TitleText>

      {/* Right - Icons */}
      <View className="flex-row items-center space-x-3">
        <IconButton iconName="person-circle-outline" onPress={onProfilePress} />
        <IconButton iconName="options-outline" onPress={onFilterPress} />
      </View>
    </View>
  );
};

export default ScreenHeader;