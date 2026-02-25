import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function ProfileScreen({
  navigation,
  user,
}) {
    const { t, i18n } = useTranslation();
  return (
   <View className="flex-1 bg-white dark:bg-black">
      
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
          <View className="w-20 h-20 rounded-full justify-center items-center mb-4 bg-blue-100 dark:bg-blue-900">
            <Ionicons name="person" size={40} color="#2563EB" />
          </View>

          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            +91 {user?.mobile || "----------"}
          </Text>

          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {t("registered_mobile")}
          </Text>
        </View>

      
        {/* Language Switcher */}
        <View className="p-4 rounded-2xl mb-3 bg-gray-100 dark:bg-zinc-900">
          <Text className="text-sm mb-3 text-gray-500 dark:text-gray-400">
            {t("language")}
          </Text>

          <View className="flex-row gap-3">
            {[
              { code: "en", label: "English" },
              { code: "kn", label: "ಕನ್ನಡ" },
            ].map((lang) => (
              <TouchableOpacity
                key={lang.code}
                // onPress={() => changeLanguage(lang.code)}
                className={`flex-1 py-3 rounded-lg items-center border ${
                  i18n.language === lang.code
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-300 dark:border-zinc-700"
                }`}
              >
                <Text
                  className={`font-medium ${
                    i18n.language === lang.code
                      ? "text-white"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
        //   onPress={handleLogout}
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
    </View>
  );
}