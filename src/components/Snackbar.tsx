import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";

type SnackbarType = "success" | "error" | "warning" | "info";

interface SnackbarProps {
  visible: boolean;
  message: string;
  type?: SnackbarType;
  duration?: number;
  onDismiss?: () => void;
}

const typeStyles = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-yellow-500",
  info: "bg-zinc-800",
};

export default function Snackbar({
  visible,
  message,
  type = "info",
  duration = 4000,
  onDismiss,
}: SnackbarProps) {
  const translateY = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        hideSnackbar();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideSnackbar = () => {
    Animated.timing(translateY, {
      toValue: 100,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDismiss?.();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
      }}
      className={`absolute bottom-6 left-4 right-4 px-4 py-3 rounded-xl shadow-lg ${typeStyles[type]}`}
    >
      <Text className="text-white text-sm font-medium">{message}</Text>
    </Animated.View>
  );
}