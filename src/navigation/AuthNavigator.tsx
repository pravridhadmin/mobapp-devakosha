import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import OtpScreen from "../screens/OtpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

export type AuthNavigatorParamList = {
  Login: undefined;
  Welcome: undefined;
  OtpScreen: { mobile: string, confirmation: any };
};

const Stack = createNativeStackNavigator<AuthNavigatorParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} id="login">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </Stack.Navigator>
  );
}