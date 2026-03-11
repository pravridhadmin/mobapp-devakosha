import { useState, useContext, useEffect, useRef } from "react";
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
import PhoneInput from "react-native-phone-number-input";
import { useColorScheme } from "nativewind";

type Props = NativeStackScreenProps<AuthNavigatorParamList, 'Signin'>;
const SigninScreen = ({ navigation }: Props) => {
    const { sendOtp, loading } = useFirebaseAuth();
    const { t } = useTranslation();
    const [mobile, setMobile] = useState<string>("");
    const [formattedNumber, setFormattedNumber] = useState<string>("");
    const phoneInput = useRef<PhoneInput>(null);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

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
            const confirmation = await sendOtp(formattedNumber);
            navigation.navigate('OtpScreen', { mobile: formattedNumber, confirmation });
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
                    <Text className="text-3xl font-bold mb-2 text-text-primary dark:text-text-primary-dark">
                        {t("signin.title")}
                    </Text>
                </View>

                <View className="space-y-4">
                    {/* <CustomTextInput
                        placeholder={t("signin.enter_mobile_number")}
                        keyboardType="phone-pad"
                        maxLength={10}
                        value={mobile}
                        onChangeText={setMobile}
                    /> */}
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={mobile}
                        defaultCode="IN"
                        layout="second"
                        placeholder={t("signin.enter_mobile_number")}
                        onChangeText={(text) => {
                            setMobile(text);
                        }}
                        onChangeFormattedText={(text) => {
                            setFormattedNumber(text);
                        }}
                        containerStyle={{
                            height: 56,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: isDark ? "#4B5563" : "#D1D5DB",
                            backgroundColor: isDark ? "#0E141B" : "#ffffff",
                            width: "100%",
                        }}

                        textContainerStyle={{
                            backgroundColor: "transparent",
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                            paddingVertical: 0,
                        }}

                        textInputStyle={{
                            fontSize: 16,
                            color: isDark ? "#F9FAFB" : "#111827",
                        }}

                        codeTextStyle={{
                            fontSize: 16,
                            color: isDark ? "#F9FAFB" : "#111827",
                        }}

                        countryPickerButtonStyle={{
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                        }}
                        countryPickerProps={{
                            withFilter: true,
                            withCallingCode: true,
                            theme: {
                                backgroundColor: isDark ? "#020617" : "#ffffff",
                                onBackgroundTextColor: isDark ? "#ffffff" : "#000000",
                                fontSize: 16,
                            }
                        }}
                    />
                    <Text className="text-base mt-2 text-surface-dark  dark:text-surface">
                        {t("signin.will_send_otp_by_sms_to_verify")}
                    </Text>

                    <View className="mt-4">
                        <Button
                            title={t("generic.continue")}
                            variant="primary"
                            onPress={handleSendOtp}
                            disabled={loading || mobile.length !== 10}
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