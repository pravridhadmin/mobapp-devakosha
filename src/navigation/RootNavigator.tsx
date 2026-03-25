import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator, StatusBar } from "react-native";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { useColorScheme } from "nativewind";

export default function RootNavigator() {
  const { user, isLoading } = useContext(AuthContext);
  const theme = useColorScheme();
  const colorScheme = theme.colorScheme;
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color="#ee7610" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
      />
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}