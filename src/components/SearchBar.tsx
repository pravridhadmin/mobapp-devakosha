import React from "react";
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
  const [text, setText] = React.useState(value);
  return (
    <View className="flex-row items-center bg-slate-100 dark:bg-zinc-900 rounded-2xl px-4 py-3 border border-zinc-700">
      <Ionicons name="search-outline" size={20} color="#9CA3AF" />
      <TextInput
        value={text}
        onChangeText={setText}
        onSubmitEditing={() => {
          onChange(text.trim());
          Keyboard.dismiss();
        }}
        placeholder={placeholder}
        returnKeyType="search"
        // onSubmitEditing={() => Keyboard.dismiss()}
        placeholderTextColor="#9CA3AF"
        className="flex-1 ml-3 text-white text-base"
      />
    </View>
  );
};

export default SearchBar;