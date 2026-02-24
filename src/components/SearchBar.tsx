import React from "react";
import { View, TextInput } from "react-native";
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
  return (
    <View className="flex-row items-center bg-slate-100 dark:bg-zinc-900 rounded-2xl px-4 py-3 border border-zinc-700">
      <Ionicons name="search-outline" size={20} color="#9CA3AF" />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        className="flex-1 ml-3 text-white text-base"
      />
    </View>
  );
};

export default SearchBar;