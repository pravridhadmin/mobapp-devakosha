import { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import CustomTextInput from "../components/CustomTextInput";
import { useLoading } from "../hooks/useLoading";
import { formattedPhoneNumber } from "../utils/helperFunctions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthNavigatorParamList } from "../navigation/AuthNavigator";
import { CustomAlert } from "../components/CustomAlert";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

type Props = NativeStackScreenProps<AuthNavigatorParamList, 'Login'>;
const LoginScreen = ({ navigation }: Props) => {
    const { sendOtp, loading } = useFirebaseAuth();
    const { t } = useTranslation();
    const [mobile, setMobile] = useState<string>("");

    // Send OTP
    const handleSendOtp = async () => {
        if (mobile.length !== 10) {
            CustomAlert(
                t("invalid_mobile_number"), 
                t("please_enter_valid_mobile_number")
            );
            return;
        }
        try {
            // otp-> login 
            const confirmation = await sendOtp(formattedPhoneNumber(mobile));
            navigation.navigate('OtpScreen', { mobile, confirmation });
            CustomAlert(t("otp_sent"), `OTP sent to ${formattedPhoneNumber(mobile)}`);
        } catch (error: any) {
            console.error("Error", error.message);
        } finally {
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
                        {t("welcome_back")}
                    </Text>

                    <Text className="text-base text-gray-600 dark:text-gray-400">
                        Enter your mobile number to continue
                    </Text>
                </View>

                <View className="space-y-4">
                        <CustomTextInput
                            placeholder={t("mobile_number")}
                            keyboardType="phone-pad"
                            maxLength={10}
                            value={mobile}
                            onChangeText={setMobile}
                        />

                    <View className="mt-4">
                        <Button
                            title={t("get_otp") }
                            variant="primary"
                            onPress={handleSendOtp}
                            disabled={loading}
                            fullWidth
                        />
                    </View>

                </View>
                <ActivityIndicator size="large" color="#0000ff" animating={loading} />
            </KeyboardAvoidingView>

        </SafeAreaView>
    );
};

export default LoginScreen;