import React, { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import CustomTextInput from "../components/CustomTextInput";

const LoginScreen: React.FC = () => {
    const { login } = useContext(AuthContext);
    const { t } = useTranslation();

    const [step, setStep] = useState<1 | 2>(1);
    const [mobile, setMobile] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<any>(null);

    // Auto login if OTP auto verified (Android)
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(user => {
            if (user) {
                login(user.phoneNumber || "");
            }
        });
        return subscriber;
    }, []);

    // 🔥 Send OTP
    const handleSendOtp = async () => {
        if (mobile.length !== 10) {
            Alert.alert(t("invalid_mobile_number"), t("please_enter_valid_mobile_number"));
            return;
        }

        try {
            setLoading(true);

            const formattedNumber = `+91${mobile}`;

            const confirmation = await auth().signInWithPhoneNumber(formattedNumber);

            setConfirm(confirmation);
            setStep(2);

            Alert.alert(t("otp_sent"), `OTP sent to ${formattedNumber}`);
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Verify OTP
    const handleVerifyOtp = async () => {
        if (!confirm) return;

        try {
            setLoading(true);
            await confirm.confirm(otp);
            // login() will be triggered automatically by onAuthStateChanged
        } catch (error) {
            Alert.alert(t("invalid_otp"), t("please_enter_correct_otp"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 justify-center px-6"
            >
                <View className="mb-10">
                    <Text className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                        {step === 1 ? t("welcome_back") : t("verify_otp")}
                    </Text>

                    <Text className="text-base text-gray-600 dark:text-gray-400">
                        {step === 1
                            ? "Enter your mobile number to continue"
                            : `Enter the code sent to +91 ${mobile}`}
                    </Text>
                </View>

                <View className="space-y-4">
                    {step === 1 ? (
                        <CustomTextInput
                            placeholder={t("mobile_number")}
                            keyboardType="phone-pad"
                            maxLength={10}
                            value={mobile}
                            onChangeText={setMobile}
                        />
                    ) : (
                        <CustomTextInput
                            placeholder="000000"
                            keyboardType="number-pad"
                            maxLength={6}
                            className="text-center"
                            value={otp}
                            onChangeText={setOtp}
                        />
                    )}

                    <View className="mt-4">
                        <Button
                            title={step === 1 ? t("get_otp") : t("verify_login")}
                            variant="primary"
                            onPress={step === 1 ? handleSendOtp : handleVerifyOtp}
                            disabled={loading}
                            fullWidth
                        />
                    </View>

                    {step === 2 && (
                        <Button
                            title={t("change_number")}
                            variant="ghost"
                            onPress={() => {
                                setStep(1);
                                setOtp("");
                                setConfirm(null);
                            }}
                        />
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;