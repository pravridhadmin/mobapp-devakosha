import React from "react";
import { View, Text,useColorScheme } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { District, State } from "../types/models";
// import { useColorScheme } from "nativewind";

interface FilterDropdownProps {
    selectedValue: State | District | null;
    onValueChange: (value: State | District | null) => void;
    items: State[] | District[];
    placeholder?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    selectedValue,
    onValueChange,
    items,
    placeholder = "Select",
}) => {
    const isDark = useColorScheme();
    const isEmpty = !items || items.length === 0;
    return (
        <View className="w-full border border-gray-300 dark:border-gray-600 rounded-lg ">
            <Dropdown
                style={{
                    width: "100%",
                    paddingHorizontal: 12,
                    height: 48,
                }}
                containerStyle={{
                    borderRadius: 12,
                    marginTop: 4,
                    height: 500,
                    top: -200,
                }}
                // dropdownPosition="top"
                maxHeight={250}
                activeColor="#9CA3AF"
                data={items}
                disable={isEmpty}
                labelField="title"
                valueField="id"
                placeholder={placeholder}
                placeholderStyle={{ color: isDark=='dark' ? "#F7F9FB" : "#161D26" } }
                selectedTextStyle={{ color: "#9CA3AF" }}
                value={selectedValue}
                onChange={(item) => onValueChange(item)}
                renderRightIcon={() => (
                    <Ionicons name="chevron-down" size={18} color="#F97316" />
                )}
            />
        </View>
    );
};

export default FilterDropdown;