import { useColorScheme } from "nativewind";
import { useState, useCallback } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/ScreenHeader";
import SearchSection from "../../components/SearchSection";
import FilterModal from "../../components/FilterModal";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useLocationFilters } from "../../hooks/useLocationFilters";
import { useFilters } from "../../context/FiltersContext";
import RecentTemples from "./components/RecentTemples";
import FeaturedTemples from "./components/FeaturedTemples";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "MainTabs">;

const HomeScreen = ({ navigation }: Props) => {
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const { filters, setFilters } = useFilters();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [forceLoad, setForceLoad] = useState(false);

      useFocusEffect(
          useCallback(() => {
              setSelectedDistrict(filters.district);
              setSelectedState(filters.state);
          }, [filters])
      );

  const {
    states,
    districts,
    selectedState,
    selectedDistrict,
    setSelectedState,
    setSelectedDistrict,
  } = useLocationFilters(filters);

     const handleStateChange = useCallback((state) => {
        setSelectedState(state);
        setSelectedDistrict(null);
    }, []);

    const handleDistrictChange = useCallback((district) => {
        setSelectedDistrict(district);
    }, []);

  const handleApplyFilters = useCallback(() => {
    const applied = {
      state: selectedState,
      district: selectedDistrict,
      search: filters.search,
    };

    setFilters(applied);
    setIsFilterOpen(false);
    navigation.navigate("Listing");
  }, [selectedState, selectedDistrict, filters.search]);


  const handleClearFilters = useCallback(() => {
    setSelectedState(null);
    setSelectedDistrict(null);

    setFilters({
      state: null,
      district: null,
      search: "",
    });
    setIsFilterOpen(false);
  }, []);
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 bg-background dark:bg-background-dark"
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <ScreenHeader
        title={t("generic.devakosha")}
        onProfilePress={() => navigation.navigate("Profile")}
        onReloadPress={() => {
            setForceLoad(true)
        setTimeout(() => setForceLoad(false), 1000);}}
      />

      {/* Search bar and rest of screen */}
      <SearchSection
        search={filters.search}
        onSearchChange={(text) => {
          setFilters((prev) => ({ ...prev, search: text }));
          navigation.navigate("Listing");
        }}
        selectedState={filters.state}
        selectedDistrict={filters.district}
        setIsFilterOpen={setIsFilterOpen}
      />

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={forceLoad}
            onRefresh={() => {
              setForceLoad(true);
              setTimeout(() => setForceLoad(false), 1000);
            }}
          />
        }
      >
        <View className="flex-1 px-6">
          <Text className="text-text-primary dark:text-text-primary-dark text-lg font-semibold mb-3">
            {t("home.sacred_spotlight")}
          </Text>
          {/* Card */}
          <FeaturedTemples
            filters={filters}
            navigation={navigation}
            forceReload={forceLoad}
          />

          <Text className="text-text-primary dark:text-text-primary-dark text-lg font-semibold mb-3">
            {t("home.latest_updates")}
          </Text>
          <RecentTemples 
          filters={filters} 
          navigation={navigation}
          forceReload={forceLoad} />
        </View>
      </ScrollView>

      <FilterModal
        visible={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        search={filters.search}
        onSearchChange={(text) => {
          setFilters((prev) => ({ ...prev, search: text }));
        }}
        selectedState={filters.state}
        onStateChange={handleStateChange}
        selectedDistrict={filters.district}
        onDistrictChange={handleDistrictChange}
        stateOptions={states}
        districtOptions={districts}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
