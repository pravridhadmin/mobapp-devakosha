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
import { formattedPhoneNumber } from "../utils/helperFunctions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthNavigatorParamList } from "../navigation/AuthNavigator";
import { CustomAlert } from "../components/CustomAlert";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

type Props = NativeStackScreenProps<AuthNavigatorParamList, 'Signin'>;
const SigninScreen = ({ navigation }: Props) => {
    const { sendOtp, loading } = useFirebaseAuth();
    const { t } = useTranslation();
    const [mobile, setMobile] = useState<string>("");

    // Send OTP
    const handleSendOtp = async () => {
        if (mobile.length !== 10) {
            CustomAlert(
                t("signin.invalid_mobile_number"),
                t("signin.please_enter_valid_mobile_number")
            );
            return;
        }
        try {
            // otp-> signin 
            const confirmation = await sendOtp(formattedPhoneNumber(mobile));
            navigation.navigate('OtpScreen', { mobile, confirmation });
        } catch (error: any) {
            CustomAlert("Error", error.message);
        }
    };


    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 justify-center px-6"
            >
                <View className="mb-8">
                    <Text className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                        {t("signin.title")}
                    </Text>
                </View>

                <View className="space-y-4">
                    <CustomTextInput
                        placeholder={t("signin.enter_mobile_number")}
                        keyboardType="phone-pad"
                        maxLength={10}
                        value={mobile}
                        onChangeText={setMobile}
                    />
                    <Text className="text-base mt-2 text-gray-600 dark:text-gray-400">
                        {t("signin.will_send_otp_by_sms_to_verify")}
                    </Text>

                    <View className="mt-4">
                        <Button
                            title={t("generic.continue")}
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

export default SigninScreen;