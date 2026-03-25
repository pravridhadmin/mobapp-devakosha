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
import BottomModel from "./BottomModel";

type Props = {
    visible: boolean;
    onClose: () => void;
    onSelectLanguage: (lang: string) => void;
};

const LanguageModal = ({ visible, onClose, onSelectLanguage }: Props) => {
    const { t } = useTranslation();

    return (
        <BottomModel onClose={onClose} visible={visible} modelTitle={t("welcomeScreen.choose_app_lang")}>
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
        </BottomModel>
    );
};

export default LanguageModal;