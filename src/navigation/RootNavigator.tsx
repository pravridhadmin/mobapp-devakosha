import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

export default function RootNavigator() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}