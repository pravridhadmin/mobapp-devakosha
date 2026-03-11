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
            className={`h-14 rounded-lg px-4 text-base border
                         bg-background text-text-primary border-gray-300
                         dark:bg-background-dark dark:text-text-primary-dark dark:border-gray-600 placeholder:text-surface-dark dark:placeholder:text-surface  ${className}`}
            placeholder={placeholder}
            keyboardType={keyboardType}
            maxLength={maxLength}
            style={style}
            value={value}
            onChangeText={onChangeText}
            />
  )
}

export default CustomTextInput
