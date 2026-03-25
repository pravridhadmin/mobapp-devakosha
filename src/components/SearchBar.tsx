import { useEffect, useState } from "react";
import { View, TextInput, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
    value: string;
    onChange: (text: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    placeholder = "Search temples...",
}) => {
    const [text, setText] = useState(value);
    useEffect(() => {
        setText(value);
    }, [value]);

      const handleNameChange = (text) => {
    // Regex to allow only alphabetic characters (a-z, A-Z) and spaces
    const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
    setText(filteredText);
  };

    return (
        <View className="flex-row items-center rounded-lg border border-gray-300 bg-background dark:bg-background-dark  dark:border-gray-600 px-2 py-1">
            <Ionicons name="search-outline" size={20} color="#9CA3AF" />
            <TextInput
                value={text}
                onChangeText={handleNameChange}
                onSubmitEditing={() => {
                    onChange(text.trim());
                    Keyboard.dismiss();
                }}
                placeholder={placeholder}
                returnKeyType="search"
                keyboardType="default"
                // onSubmitEditing={() => Keyboard.dismiss()}
                className="flex-1 ml-2 text-text-primary dark:text-text-primary-dark text-base placeholder:text-surface-dark dark:placeholder:text-surface"
            />
            {text && (
                <Ionicons
                    name="close-outline"
                    size={20}
                    color="#9CA3AF"
                    onPress={() => {
                        setText("")
                        onChange('')
                    }}
                />)}
        </View>
    );
};

export default SearchBar;