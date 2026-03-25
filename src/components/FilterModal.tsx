import React from "react";
import {View} from "react-native";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import Button from "./Button";
import { District, State } from "../types/models";
import { useTranslation } from "react-i18next";
import BottomModel from "./BottomModel";

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
        <BottomModel onClose={onClose} visible={visible} modelTitle={t("filter.search_temples_&_deities")}>
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
            <View className="flex-row  items-center justify-around mt-10">
                <Button title={t("generic.clear")} className="flex-1" variant="ghost" onPress={onClear} />

                <Button title={t("generic.search")} className="flex-1" onPress={onApply} variant="primary" />
            </View>
        </BottomModel>
    );
};

export default FilterModal;