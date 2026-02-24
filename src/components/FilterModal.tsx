import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import Button from "./Button";
import { District, State } from "../types/models";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;

  search: string;
  onSearchChange: (text: string) => void;

  selectedState: string | null;
  onStateChange: (state: string) => void;

  selectedDistrict: string | null;
  onDistrictChange: (district: string) => void;

  stateOptions: State[];
  districtOptions: District[];

  onApply: (filters: any) => void;
  onClear: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  search,
  onSearchChange,
  selectedState,
  onStateChange,
  selectedDistrict,
  onDistrictChange,
  stateOptions,
  districtOptions,
  onApply,
  onClear,
}) => {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      {/* Background Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/60 justify-end">
          {/* Stop closing when pressing inside modal */}
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View className="bg-black rounded-t-3xl px-5 pt-4 pb-6">
              
              {/* Drag Indicator */}
              <View className="items-center mb-4">
                <View className="w-12 h-1.5 bg-zinc-600 rounded-full" />
              </View>

              {/* Header */}
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-white text-2xl font-semibold">
                  Filter Temples
                </Text>

                <Pressable onPress={onClose}>
                  <Ionicons name="close" size={24} color="#A1A1AA" />
                </Pressable>
              </View>

              {/* SEARCH */}
              <Text className="text-zinc-400 mb-2 tracking-widest">
                SEARCH
              </Text>

              <SearchBar
                value={search}
                onChange={onSearchChange}
              />

              {/* STATE */}
              <Text className="text-zinc-400 mt-6 mb-2 tracking-widest">
                STATE
              </Text>

              <FilterDropdown
                selectedValue={selectedState}
                onValueChange={onStateChange}
                items={stateOptions}
                placeholder="Select State"
              />

              {/* DISTRICT */}
              <Text className="text-zinc-400 mt-6 mb-2 tracking-widest">
                DISTRICT
              </Text>

              <FilterDropdown
                selectedValue={selectedDistrict}
                onValueChange={onDistrictChange}
                items={districtOptions}
                placeholder="Select District"
              />

              {/* Bottom Buttons */}
              <View className="flex-row items-center justify-around mt-10">
                <Button title="Clear" variant="ghost" onPress={onClear} />

                <Button title="Apply Filters" onPress={onApply} variant="primary" />

              </View>
            </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;