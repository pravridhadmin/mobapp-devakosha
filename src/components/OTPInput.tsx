import React, { useRef, useState } from "react";
import { View, TextInput, Text, Pressable, Keyboard } from "react-native";

type Props = {
    length?: number;
    onComplete?: (otp: string) => void;
};

export default function OTPInput({ length = 6, onComplete }: Props) {
    const [otp, setOtp] = useState("");
    const inputRef = useRef<TextInput>(null);

    const handleChange = (text: string) => {
        const cleaned = text.replace(/[^0-9]/g, "");

        setOtp(cleaned);

        if (cleaned.length === length) {
            Keyboard.dismiss();
            onComplete?.(cleaned);
        }
    };

    return (
        <Pressable
            onPress={() => inputRef.current?.focus()}
            className="flex-row justify-between px-4"
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
                const isFocused = index === otp.length;

                return (
                    <View
                        key={index}
                        className={`w-12 h-14 rounded-xl border items-center justify-center 
                            ${isFocused
                                ? "border-blue-500 dark:border-blue-400"
                                : digit
                                    ? "border-gray-500 dark:border-gray-400"
                                    : "border-gray-300 dark:border-gray-600"
                            }bg-white dark:bg-gray-900`}
                    >
                        <Text className="text-xl font-semibold text-gray-900 dark:text-gray-100 ">
                            {digit ?? ""}
                        </Text>
                    </View>
                );
            })}
        </Pressable>
    );
}
