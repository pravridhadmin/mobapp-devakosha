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
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;

    search: string;
    onSearchChange: (text: string) => void;

    selectedState: State | null;
    onStateChange: (state: State | null) => void;

    selectedDistrict: District | null;
    onDistrictChange: (district: District | null) => void;

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
    const { t } = useTranslation();
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
                            <View className="bg-background dark:bg-background-dark rounded-t-3xl px-5 pt-4 pb-24">

                                {/* Drag Indicator */}
                                <View className="items-center mb-4">
                                    <View className="w-12 h-1.5  bg-zinc-400 dark:bg-zinc-600 rounded-full" />
                                </View>

                                {/* Header */}
                                <View className="flex-row items-center justify-between mb-6">
                                    <Text className="text-text-primary dark:text-text-primary-dark text-2xl font-semibold">
                                        {t("filter.search_temples_&_deities")}
                                    </Text>

                                    <Pressable onPress={onClose}>
                                        <Ionicons name="close" size={24} color="#A1A1AA" />
                                    </Pressable>
                                </View>

                                {/* SEARCH */}
                                <SearchBar
                                    placeholder={t("generic.search_deity_or_temple")}
                                    value={search}
                                    onChange={onSearchChange}
                                />

                                {/* STATE */}
                                <View className="mt-6 mb-2">
                                    <FilterDropdown
                                        selectedValue={selectedState}
                                        onValueChange={onStateChange}
                                        items={stateOptions}
                                        placeholder={t("generic.choose_state")}
                                    />
                                </View>

                                {/* DISTRICT */}
                                <View className="mt-6 mb-2">
                                    <FilterDropdown
                                        selectedValue={selectedDistrict}
                                        onValueChange={onDistrictChange}
                                        items={districtOptions}
                                        placeholder={t("generic.choose_district")}
                                    />
                                </View>

                                {/* Bottom Buttons */}
                                <View className="flex-row items-center justify-around mt-10">
                                    <Button title={t("generic.clear")} variant="ghost" onPress={onClear} />

                                    <Button title={t("generic.search")} onPress={onApply} variant="primary" />

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