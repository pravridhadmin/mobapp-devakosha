import React, { useRef, useState } from "react";
import { View, TextInput, Text, Pressable, Keyboard } from "react-native";

type Props = {
    length?: number;
    otp: string;
    setOtp?: (otp: string) => void;
};

export default function OTPInput({ length = 6, setOtp, otp }: Props) {
    // const [otp, setOtp] = useState("");
    const inputRef = useRef<TextInput>(null);

    const handleChange = (text: string) => {
        const cleaned = text.replace(/[^0-9]/g, "");

        setOtp(cleaned);
        if (cleaned.length === length) {
            Keyboard.dismiss();
            setOtp(cleaned);
        }
    };

    return (
        <Pressable
            onPress={() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 50);
    }}
            className="flex-row px-4 gap-2"
        >
            {/* Hidden Input */}
            <TextInput
                ref={inputRef}
                value={otp}
                onChangeText={handleChange}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
                maxLength={length}
                className="absolute opacity-0"
            />

            {Array.from({ length }).map((_, index) => {
                const digit = otp[index];
                const isFocused = index === otp?.length;

                return (
                    <View
                        key={index}
                        className={`flex-1 min-h-14 rounded-lg border items-center justify-center 
                            ${isFocused
                                ? "border-primary-500 dark:border-primary-500"
                                : digit
                                    ? "border-gray-500 dark:border-gray-400"
                                    : "border-gray-300 dark:border-gray-600"
                            } bg-background dark:bg-background-dark`}
                    >
                        <Text className="text-xl font-semibold text-text-primary dark:text-text-primary-dark ">
                            {digit ?? ""}
                        </Text>
                    </View>
                );
            })}
        </Pressable>
    );
}
