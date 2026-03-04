import React, { useContext } from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import Avatar from "../components/Avatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";

export default function ProfileScreen({
  navigation
}) {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      t('logout_confirm_title'),
      t('logout_confirm_message'),
      [
        { text: t('cancel'), style: "cancel" },
        {
          text: t('logout'),
          style: "destructive",
          onPress: () => logout()
        }
      ]
    );
  };

  const changeLanguage = async (lng) => {
    try {
      await i18n.changeLanguage(lng);
      await AsyncStorage.setItem('user-language', lng);
    } catch (error) {
      console.error('Failed to change language', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <Text className="text-xl font-bold text-gray-900 dark:text-white">
          {t("profile")}
        </Text>

        <View className="w-6" />
      </View>

      <View className="px-6">

        {/* Profile Card */}
        <View className="items-center p-8 rounded-2xl mb-8 bg-gray-100 dark:bg-zinc-900 shadow-sm">
          <Avatar />

          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {user?.mobile || "----------"}
          </Text>

          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {t("registered_mobile")}
          </Text>
        </View>

        <View className="p-4 rounded-2xl mb-3 bg-white dark:bg-zinc-900">
          <Text className="text-sm mb-3 text-gray-500">
            {t('language')}
          </Text>

          <View className="flex-row gap-3 justify-center">
            {/* English Button */}
            <Button
              title="English"
              onPress={() => changeLanguage('en')}
              variant="primary"
              disabled={i18n.language === 'en'}
            />
            <Button
              title="Kannada"
              onPress={() => changeLanguage('kn')}
              variant="primary"
              disabled={i18n.language === 'kn'}
            />
   
          </View>
        </View>


        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center p-4 rounded-2xl mb-3 bg-gray-100 dark:bg-zinc-900"
        >
          <View className="w-10 h-10 rounded-full bg-red-100 justify-center items-center mr-4">
            <Ionicons name="log-out-outline" size={22} color="#DC2626" />
          </View>

          <Text className="flex-1 text-base font-semibold text-red-600">
            {t("logout")}
          </Text>

          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Version */}
        <View className="items-center mt-10">
          <Text className="text-xs text-gray-400">
            {t("app_version", { version: "1.0.0" })}
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}