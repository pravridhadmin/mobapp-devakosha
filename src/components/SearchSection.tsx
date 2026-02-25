import React from "react";
import { View } from "react-native";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import { District, State } from "../types/models";
import Button from "./Button";
import { useTranslation } from "react-i18next";

interface SearchSectionProps {
  search: string;
  onSearchChange: (text: string) => void;

  selectedState: State;

  selectedDistrict: District;
  setIsFilterOpen: (open: boolean) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  search,
  onSearchChange,
  selectedState,
  selectedDistrict,
  setIsFilterOpen,
}) => {
  const {t} = useTranslation();
  return (
    <View className="px-4">
      {/* Search Bar */}
      <SearchBar value={search} onChange={onSearchChange} placeholder={t("search_temple")} />

      {/* Dropdowns Centered */}
      <View className="flex-row justify-center space-x-4">
        
        <Button
          title={selectedState ? selectedState.title : t("select_state")}
          variant="ghost"
          leftIcon="location-outline"
          onPress={() => setIsFilterOpen(true)}
        />
        <Button
          title={selectedDistrict ? selectedDistrict.title : t("select_district")}
          variant="ghost"
          leftIcon="map-outline"
          onPress={() => setIsFilterOpen(true)}
        />

      </View>
    </View>
  );
};

export default SearchSection;