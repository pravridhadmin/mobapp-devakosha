import React, { useCallback, useContext } from "react";
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
import { CustomAlert } from "../components/CustomAlert";
import IconButton from "../components/IconButton";

export default function ProfileScreen({
    navigation
}) {
    const { t, i18n } = useTranslation();
    const { user, signout } = useContext(AuthContext);

    const handleSignOut = () => {
        CustomAlert(
            t('profile.signout_confirm_title'),
            t('profile.signout_confirm_message'),
            [
                { text: t('profile.stayback'), style: "cancel" },
                {
                    text: t('profile.signout'),
                    style: "destructive",
                    onPress: () => signout()
                }
            ]
        );
    };

    const changeLanguage = async (lng) => {
        try {
            await i18n.changeLanguage(lng);
            await AsyncStorage.setItem('user-language', lng);
        } catch (error) {
            throw error;
        }
    };
    
    const handleBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">

            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3">
                    <IconButton
                        iconName="arrow-back"
                        className="bg-white dark:bg-gray-800"
                        onPress={handleBack}
                    />
                <Text className="text-xl font-bold text-gray-900 dark:text-white">
                    {t("profile.profile")}
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
                        {t("profile.registered_mobile")}
                    </Text>
                </View>

                <View className="p-4 rounded-2xl mb-3 bg-white dark:bg-zinc-900">
                    <Text className="text-sm mb-3 text-gray-500">
                        {t('profile.language')}
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


                {/* signout */}
                <TouchableOpacity
                    onPress={handleSignOut}
                    className="flex-row items-center p-4 rounded-2xl mb-3 bg-gray-100 dark:bg-zinc-900"
                >
                    <View className="w-10 h-10 rounded-full bg-red-100 justify-center items-center mr-4">
                        <Ionicons name="log-out-outline" size={22} color="#DC2626" />
                    </View>

                    <Text className="flex-1 text-base font-semibold text-red-600">
                        {t("profile.signout")}
                    </Text>

                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>

                {/* Version */}
                <View className="items-center mt-10">
                    <Text className="text-xs text-gray-400">
                        {t("profile.app_version", { version: "1.0.0" })}
                    </Text>
                </View>

            </View>
        </SafeAreaView>
    );
}