import React, { useState } from "react";
import { View, Text, Linking, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
import LanguageModal from "../components/LanguageModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native";

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
    const { t, i18n } = useTranslation();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark"
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
        <ImageBackground
            source={require("../../assets/welcome-bg.jpeg")}
            className="flex-1 justify-between"
            resizeMode="cover"
        >
            <LinearGradient
                colors={
                    isDark
                        ? ["transparent", "rgba(0,0,0,0.7)", "#000"]
                        : ["transparent", "rgba(247, 249, 251, 0.4)", "rgba(247, 249, 251,0.9)"]
                }
                className="absolute bottom-0 left-0 right-0 h-3/4"
            />
            <View />
            <SafeAreaView className="flex-1 justify-end px-6 ">
                {/* Top Empty Space */}
                {/* Center Content */}
                <View className="px-2 mb-8">
                    <Text className="text-3xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
                        {t("welcomeScreen.welcome_to_your_sacred_journey")}
                    </Text>

                    <Text className="text-base text-text-primary dark:text-text-primary-dark leading-6 mb-4">
                        {t("welcomeScreen.by_proceeding_you_confirm")}{" "}
                        <Text
                            className="font-semibold underline text-primary-500"
                            onPress={() =>
                                Linking.openURL("https://pravridh.org/privacy-policy")
                            }
                        >
                            {t("welcomeScreen.privacy_policy")}
                        </Text>{" "}
                        {t("welcomeScreen.and")}{" "}
                        <Text
                            className="font-semibold underline text-primary-500"
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
                        onPress={() => { navigation.navigate('Signin') }}
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
        </ImageBackground>
    );
};

export default WelcomeScreen;
