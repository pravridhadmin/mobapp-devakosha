import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { AuthNavigatorParamList } from '../navigation/AuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomAlert } from '../components/CustomAlert';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { formattedPhoneNumber } from '../utils/helperFunctions';
import OTPInput from '../components/OTPInput';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {RESEND_OTP_TIME } from '../utils/constants';

type Props = NativeStackScreenProps<AuthNavigatorParamList, 'OtpScreen'>;
const OtpScreen = ({ navigation, route }: Props) => {
    const { mobile, confirmation } = route.params;
    const { t } = useTranslation();
    const { verifyOtp, loading, resendOtp } = useFirebaseAuth();
    const [otp, setOtp] = useState("");
    const [firebaseConfirmation, setFirebaseConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult | null>(confirmation);

    const [timer, setTimer] = useState(RESEND_OTP_TIME);
    const [canResend, setCanResend] = useState(false);

    // resend timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);


    //  Verify OTP
    const handleVerifyOtp = async () => {


        try {
            const userCredential = await verifyOtp(otp, firebaseConfirmation);
        } catch (error) {

            if (error.code === "auth/invalid-verification-code") {
                CustomAlert(
                    t("otpScreen.invalid_otp")
                );
            }
            else if (error.code === "auth/code-expired") {
                CustomAlert(
                    t("otpScreen.otp_expired"),
                    t("otpScreen.request_new_otp")
                );
            } else if (error.code === "auth/too-many-requests") {
                CustomAlert(
                    t("otpScreen.too_many_requests"),
                    t("otpScreen.try_again_after_some_time")
                );
            } else {
                CustomAlert("Error", error.message);
            }
        }
    };

    const handleResendOtp = async () => {
        try {
            const newConfirmation = await resendOtp(mobile);
            setFirebaseConfirmation(newConfirmation);
        } catch (error) {
            CustomAlert("Error", "Failed to resend OTP");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 justify-center px-6"
            >
                <View className="mb-10">
                    <Text className="text-3xl font-bold mb-2 text-text-primary dark:text-text-primary-dark">
                        {t("otpScreen.enter_otp_sent_to", { mobile: `${mobile}` })}
                    </Text>

                </View>

                <View className="space-y-4">
                    <OTPInput onComplete={(otp) => setOtp(otp)} />

                    <View className="mt-4">
                        <Button
                            title={t("otpScreen.verify")}
                            variant="primary"
                            onPress={handleVerifyOtp}
                            disabled={loading || otp.length !== 6}
                            fullWidth
                        />
                    </View>

                    <Button
                        title={t("otpScreen.change_number")}
                        variant="ghost"
                        onPress={() => {
                            setOtp("");
                            navigation.goBack();
                        }}
                    />
                    <View className="items-center mt-6 space-y-2">

                        {!canResend ? (
                            <Text className="text-sm dark:text-surface dark:text-surface">
                                {t("otpScreen.resend_otp_in")}{" "}
                                <Text className="font-semibold text-gray-700 dark:text-gray-200">
                                    {timer}s
                                </Text>
                            </Text>
                        ) : (
                            <View className="flex-row items-center gap-2">
                                <Text className="text-sm dark:text-surface dark:text-surface">
                                   {t("otpScreen.didn't_receive_code")}
                                </Text>

                            <Button
                                title={t("otpScreen.resend_otp")}
                                variant="ghost"
                                onPress={handleResendOtp}
                                />
                            </View>
                        )}

                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default OtpScreen
