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
                        <View className=" bg-background dark:bg-black rounded-t-3xl px-5 pt-4 pb-24">

                            {/* Drag Indicator */}
                            <View className="items-center mb-4">
                                <View className="w-12 h-1.5 bg-zinc-600 rounded-full" />
                            </View>

                            {/* Header */}
                            <View className="flex-row items-center justify-between mb-6">
                                <Text className="text-black dark:text-white text-2xl font-semibold">
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
                                className="py-4 border-b border-zinc-700"
                            >
                                <Text className="text-black dark:text-white text-lg">English</Text>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    onSelectLanguage("kn");
                                    onClose();
                                }}
                                className="py-4"
                            >
                                <Text className="text-black dark:text-white text-lg">ಕನ್ನಡ</Text>
                            </Pressable>

                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default LanguageModal;