import React from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { District, State } from "../types/models";

interface FilterDropdownProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
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

        activeColor="#27272A" // zinc-800
        data={items}
        labelField="title"
        valueField="id"
        placeholder={placeholder}
        placeholderStyle={{ color: "#9CA3AF" }} // zinc-400
        selectedTextStyle={{ color: "white" }}
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