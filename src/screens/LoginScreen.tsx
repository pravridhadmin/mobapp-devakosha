import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

    const handleSendOtp = () => {
        if (mobile.length < 10) {
            Alert.alert(t('invalid_mobile_number'), t('please_enter_valid_mobile_number'));
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setStep(2);
            Alert.alert(t("otp_sent", { mobile }), "use 000000 as OTP for testing");
        }, 1500);
    };

    const handleVerifyOtp = () => {
        if (otp === "000000") {
            login(mobile);
        } else {
            Alert.alert(t("invalid_otp"), t("please_enter_correct_otp"));
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 justify-center px-6"
            >
                {/* Header */}
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

                {/* Form */}

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
                            placeholder='000000'
                            keyboardType="number-pad"
                            maxLength={6}
                            style={{ letterSpacing: 8 }}
                            className="text-center"
                            value={otp}
                            onChangeText={setOtp}
                        />

                    )}

                    {/* Button */}
                    <View className="mt-4">
                        <Button
                            title={step === 1 ? t("get_otp") : t("verify_login")}
                            variant="primary"
                            onPress={step === 1 ? handleSendOtp : handleVerifyOtp}
                            disabled={loading}
                            fullWidth />
                    </View>

                    {/* Change Number */}

                    {step === 2 && (
                        <Button
                            title={t("change_number")}
                            variant="ghost"
                            onPress={() => {
                                setStep(1);
                                setOtp("");
                            }}
                        />
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;