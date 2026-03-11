import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableWithoutFeedback,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";

type Props = {
    visible: boolean;
    onClose: () => void;
    onSelectLanguage: (lang: string) => void;
};

const LanguageModal = ({ visible, onClose, onSelectLanguage }: Props) => {
    const { t } = useTranslation();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            statusBarTranslucent
        >
            {/* Background Overlay */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/60 justify-end">

                    {/* Prevent closing when clicking inside */}
                    <TouchableWithoutFeedback>
                        <View className=" bg-background dark:bg-background-dark rounded-t-3xl px-5 pt-4 pb-24">

                            {/* Drag Indicator */}
                            <View className="items-center mb-4">
                                <View className="w-12 h-1.5 bg-secondary-dark rounded-2xl" />
                            </View>

                            {/* Header */}
                            <View className="flex-row items-center justify-between mb-6">
                                <Text className="text-text-primary dark:text-text-primary-dark text-2xl font-semibold">
                                    {t("welcomeScreen.choose_app_lang")}
                                </Text>

                                <Pressable onPress={onClose}>
                                    <Ionicons name="close" size={24} color="#A1A1AA" />
                                </Pressable>
                            </View>

                            {/* Language Options */}

                            <Pressable
                                onPress={() => {
                                    onSelectLanguage("en");
                                    onClose();
                                }}
                                className="flex-row items-center py-4 border-b border-surface dark:border-surface-dark"
                            >
                                {i18n.language === "en" && (
                                    <Ionicons name="checkmark" size={22} color="#22c55e" />
                                )}
                                <Text className="text-text-primary dark:text-text-primary-dark text-lg">English</Text>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    onSelectLanguage("kn");
                                    onClose();
                                }}
                                className="flex-row items-center py-4 border-b border-surface dark:border-surface-dark"
                            >
                                {i18n.language === "kn" && (
                                    <Ionicons name="checkmark" size={22} color="#22c55e" />
                                )}
                                <Text className="text-text-primary dark:text-text-primary-dark text-lg">ಕನ್ನಡ</Text>
                            </Pressable>

                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default LanguageModal;