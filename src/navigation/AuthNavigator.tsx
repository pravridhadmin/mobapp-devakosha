import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "../screens/SigninScreen";
import OtpScreen from "../screens/OtpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

export type AuthNavigatorParamList = {
  Signin: undefined;
  Welcome: undefined;
  OtpScreen: { mobile: string, confirmation: any };
};

const Stack = createNativeStackNavigator<AuthNavigatorParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} id="Signin">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </Stack.Navigator>
  );
}