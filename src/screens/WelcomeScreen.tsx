import React, { useState } from "react";
import { View, Text, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import LanguageModal from "../components/LanguageModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
    const { t, i18n } = useTranslation();
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const changeLanguage = async (lng) => {
        try {
            await i18n.changeLanguage(lng);
            await AsyncStorage.setItem('user-language', lng);
        } catch (error) {
            throw error;
        }
    };
    return (

        <SafeAreaView className="flex-1 justify-end px-6 bg-background dark:bg-background-dark">

            {/* Top Empty Space */}
            <View />

            {/* Center Content */}
            <View className="px-2 mb-8">
                <Text className="text-3xl font-bold text-primary dark:text-primary-dark mb-4">
                    {t("welcomeScreen.welcome_to_your_sacred_journey")}
                </Text>

                <Text className="text-base text-gray-800 dark:text-white leading-6 mb-4">
                    {t("welcomeScreen.by_proceeding_you_confirm")}{" "}
                    <Text
                        className="font-semibold underline"
                        onPress={() =>
                            Linking.openURL("https://pravridh.org/privacy-policy")
                        }
                    >
                        {t("welcomeScreen.privacy_policy")}
                    </Text>{" "}
                    &{" "}
                    <Text
                        className="font-semibold underline"
                        onPress={() =>
                            Linking.openURL("https://pravridh.org/terms-of-use")
                        }
                    >
                        {t("welcomeScreen.terms_of_use")}
                    </Text>
                </Text>
            </View>

            {/* Bottom Section */}
            <View className="pb-8 space-y-4">
                <Button
                    title={t("generic.continue")}
                    variant="primary"
                    fullWidth
                    onPress={() => { navigation.navigate('Login') }}
                />
                <Button
                    title={t("welcomeScreen.choose_app_lang")}
                    variant="ghost"
                    leftIcon="language-outline"
                    fullWidth
                    onPress={() => setShowLanguageModal(true)}
                />
            </View>

            <LanguageModal
                visible={showLanguageModal}
                onClose={() => setShowLanguageModal(false)}
                onSelectLanguage={(lang) => {
                    changeLanguage(lang);
                }}
            />

        </SafeAreaView>
    );
};

export default WelcomeScreen;
