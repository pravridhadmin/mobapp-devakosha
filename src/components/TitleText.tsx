import { Text, TextProps } from "react-native";
import React from "react";

interface TitleTextProps extends TextProps {
  children: React.ReactNode;
}

const TitleText: React.FC<TitleTextProps> = ({ children, className = "", ...props }) => {
  return (
    <Text
      className={`text-primary text-3xl font-semibold ${className} dark:text-primary-dark`}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TitleText;