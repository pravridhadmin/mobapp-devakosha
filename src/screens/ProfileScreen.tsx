import React, { useCallback, useContext, useState } from "react";
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
import CustomHeader from "../components/CustomHeader";
import LanguageModal from "../components/LanguageModal";

export default function ProfileScreen({
    navigation
}) {
    const { t, i18n } = useTranslation();
    const { user, signout } = useContext(AuthContext);
    const [languageModalVisible, setLanguageModalVisible] = useState(false);

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
        <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">

            {/* Header */}
            <CustomHeader screenTitle={t("profile.profile")} onPress={handleBack} />


            <View className="px-6">

                {/* Profile Card */}
                <View className="items-center p-8 rounded-lg mb-8 bg-surface dark:bg-surface-dark shadow-sm">
                    <Avatar />
                    <Text className="text-2xl font-bold text-primary-500 dark:text-primary-500 mb-1">
                        {user?.mobile || "----------"}
                    </Text>

                    <Text className="text-sm text-text-primary dark:text-text-primary-dark">
                        {t("profile.registered_mobile")}
                    </Text>
                </View>


                {/* Language */}
                <View className="p-4 rounded-lg mb-3 bg-surface dark:bg-surface-dark">
                    <TouchableOpacity
                        className="flex-row items-center justify-between"
                    onPress={() => setLanguageModalVisible(true)}
                    >
                        <View>
                            <Text className="text-base text-gray-500">
                                {t('profile.language')}
                            </Text>

                            <Text className="text-base mt-2 text-text-primary dark:text-text-primary-dark">
                                {i18n.language === 'en' ? 'English' : 'ಕನ್ನಡ'}
                            </Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="gray" />
                    </TouchableOpacity>
                </View>


                {/* signout */}
                <TouchableOpacity
                    onPress={handleSignOut}
                    className="flex-row items-center p-4 rounded-lg mb-3 bg-surface dark:bg-surface-dark"
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
                    <Text className="text-xs text-secondary dark:text-secondary-dark">
                        {t("profile.app_version", { version: "1.0.0" })}
                    </Text>
                </View>

            </View>
            <LanguageModal 
                visible={languageModalVisible} 
                onClose={() => setLanguageModalVisible(false)} 
                onSelectLanguage={changeLanguage} 
            />
        </SafeAreaView>
    );
}