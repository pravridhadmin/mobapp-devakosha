import React from 'react'
import { StyleProp, TextInput, TextInputProps, TextStyle } from 'react-native'

type CustomTextInputProps ={
    placeholder: string,
    keyboardType?: TextInputProps['keyboardType'],
    maxLength?:number,
    className?:string,
    value?:string,
    style?:StyleProp<TextStyle>;
    onChangeText: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({placeholder, keyboardType, maxLength, style, className, value, onChangeText}) => {
    return (
        <TextInput
            className={`h-14 rounded-xl px-4 text-lg border
                         bg-gray-100 text-gray-900 border-gray-300
                         dark:bg-zinc-900 dark:text-white dark:border-zinc-700 ${className}`}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            keyboardType={keyboardType}
            maxLength={maxLength}
            style={style}
            value={value}
            onChangeText={onChangeText}
            />
  )
}

export default CustomTextInput
