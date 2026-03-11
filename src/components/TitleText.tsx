import { Text, TextProps } from "react-native";
import React from "react";

interface TitleTextProps extends TextProps {
    children: React.ReactNode;
}

const TitleText: React.FC<TitleTextProps> = ({ children, className = "", ...props }) => {
    return (
        <Text
            className={`text-primary-500 text-3xl font-semibold ${className}`}
            {...props}
        >
            {children}
        </Text>
    );
};

export default TitleText;