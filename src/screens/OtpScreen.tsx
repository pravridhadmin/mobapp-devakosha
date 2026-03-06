import  { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../components/CustomTextInput';
import Button from '../components/Button';
import { useLoading } from '../hooks/useLoading';
import { AuthNavigatorParamList } from '../navigation/AuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomAlert } from '../components/CustomAlert';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

type Props = NativeStackScreenProps<AuthNavigatorParamList, 'OtpScreen'>;
const OtpScreen = ({ navigation, route }: Props) => {
    const { mobile, confirmation } = route.params;
    const { t } = useTranslation();
    const { verifyOtp, loading } = useFirebaseAuth();
    const [otp, setOtp] = useState("");


    //  Verify OTP
    const handleVerifyOtp = async () => {
        try {
            const userCredential = await verifyOtp(otp, confirmation);
            console.log(userCredential);
        } catch (error) {
            CustomAlert(
                t("invalid_otp"),
                t("please_enter_correct_otp")
            );
            console.log("Error", error);
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
                        {t("verify_otp")}
                    </Text>

                    <Text className="text-base text-gray-600 dark:text-gray-400">
                        {`Enter the code sent to +91 ${mobile}`}
                    </Text>
                </View>

                <View className="space-y-4">
                    <CustomTextInput
                        placeholder="000000"
                        keyboardType="number-pad"
                        maxLength={6}
                        className="text-center"
                        value={otp}
                        onChangeText={setOtp}
                    />

                    <View className="mt-4">
                        <Button
                            title={t("verify_login")}
                            variant="primary"
                            onPress={handleVerifyOtp}
                            disabled={loading}
                            fullWidth
                        />
                    </View>

                    <Button
                        title={t("change_number")}
                        variant="ghost"
                        onPress={() => {
                            setOtp("");
                            navigation.goBack();
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default OtpScreen
