// components/Skeleton.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface SkeletonProps {
  className?: string;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1300,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    loop.start();
    return () => loop.stop();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <View
      className={`bg-gray-300 overflow-hidden ${className}`}
      style={style}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{ translateX }],
            width: "50%",
            backgroundColor: "rgba(255,255,255,0.4)",
          },
        ]}
      />
    </View>
  );
};