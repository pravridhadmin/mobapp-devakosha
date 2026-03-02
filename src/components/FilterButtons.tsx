import React from 'react'
import { View } from 'react-native'
import Button from './Button'
import { District, State } from '../types/models';

interface FilterButtonsProps {
  selectedState: State;

  selectedDistrict: District;
  stateLabel:String;
  districtLabel:String;
  setIsFilterOpen: (open: boolean) => void;
}

const FilterButtons  = ({
    selectedState, 
    selectedDistrict, 
    setIsFilterOpen, 
    stateLabel, 
    districtLabel} : FilterButtonsProps) => {
  return (
    <View className="flex-row justify-center space-x-4">
        
        <Button
          title={selectedState ? selectedState.title : stateLabel}
          variant="ghost"
          leftIcon="location-outline"
          onPress={() => setIsFilterOpen(true)}
        />
        <Button
          title={selectedDistrict ? selectedDistrict.title : districtLabel}
          variant="ghost"
          leftIcon="map-outline"
          onPress={() => setIsFilterOpen(true)}
        />

      </View>
  )
}

export default FilterButtons
