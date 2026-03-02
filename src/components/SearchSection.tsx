import React from "react";
import { View } from "react-native";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import { District, State } from "../types/models";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import FilterButtons from "./FilterButtons";

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
      <FilterButtons 
      selectedDistrict={selectedDistrict}
      selectedState={selectedState}
      stateLabel={t('select_state')}
      districtLabel={t('select_district')}
      setIsFilterOpen={setIsFilterOpen}
      />

    </View>
  );
};

export default SearchSection;