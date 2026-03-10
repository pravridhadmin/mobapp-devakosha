import React from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { District, State } from "../types/models";

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

    return (
        <View className="w-full">
            <Dropdown
                style={{
                    borderRadius: 12,
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
                labelField="title"
                valueField="id"
                placeholder={placeholder}
                placeholderStyle={{ color: "#9CA3AF" }}
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