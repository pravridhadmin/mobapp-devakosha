import React from "react";
import { View } from "react-native";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import { District, State } from "../types/models";
import Button from "./Button";

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
  return (
    <View className="px-4 mt-4">
      {/* Search Bar */}
      <SearchBar value={search} onChange={onSearchChange} />

      {/* Dropdowns Centered */}
      <View className="flex-row justify-center mt-4 space-x-4">
        
        <Button
          title={selectedState ? selectedState.title : "Select State"}
          variant="ghost"
          leftIcon="location-outline"
          onPress={() => setIsFilterOpen(true)}
        />
        <Button
          title={selectedDistrict ? selectedDistrict.title : "Select District"}
          variant="ghost"
          leftIcon="map-outline"
          onPress={() => setIsFilterOpen(true)}
        />

      </View>
    </View>
  );
};

export default SearchSection;