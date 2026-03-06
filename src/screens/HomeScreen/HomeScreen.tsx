import { useColorScheme } from 'nativewind';
import { useEffect, useState, useCallback } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, StatusBar, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/ScreenHeader';
import SearchSection from '../../components/SearchSection';
import FilterModal from '../../components/FilterModal';
import { useTranslation } from "react-i18next";
import { fetchTemples, getDistrictsUrl, getStatesUrl } from '../../api/cms';
import TempleCard from '../../components/Card';
import { TemplePage } from '../../types/models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import EmptyState from '../../components/EmptyState';
import { useLocationFilters } from '../../hooks/useLocationFilters';
import { useHomeTemples } from '../../hooks/useHomeTemples';
import { useFilters } from '../../context/FiltersContext';
import RecentTemples from './components/RecentTemples';
import FeaturedTemples from './components/FeaturedTemples';

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

const HomeScreen = ({ navigation }: Props) => {
    const { colorScheme } = useColorScheme();
    const { t, i18n } = useTranslation();
    // const [search, setSearch] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const {
        states,
        districts,
        selectedState,
        selectedDistrict,
        setSelectedState,
        setSelectedDistrict,
    } = useLocationFilters(getStatesUrl, getDistrictsUrl);

    const { filters, setFilters } = useFilters();
    const handleApplyFilters = () => {
        const applied = {
            state: selectedState,
            district: selectedDistrict,
            search: filters.search,
        };

        setFilters(applied);

        navigation.navigate("Listing");

        setIsFilterOpen(false);
    };
    const handleClearFilters = () => {
        // setSearch("");
         setFilters({
            state: null,
            district: null,
            search: "",
        });
        setSelectedState(null);
        setSelectedDistrict(null);
        setIsFilterOpen(false);
    }
    return (
        <SafeAreaView edges={["top", "left", 'right']} className="flex-1 bg-background dark:bg-background-dark">
            <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
            <ScreenHeader
                title={t("devakosha")}
                onProfilePress={() => navigation.navigate('Profile')}
            />

            {/* Search bar and rest of screen */}
            <SearchSection
                search={filters.search}
                onSearchChange={(text) => {
                    // setSearch(text)
                    setFilters((prev) => ({ ...prev, search: text }))
                    navigation.navigate("Listing")
                }}
                selectedState={filters.state}
                selectedDistrict={filters.district}
                setIsFilterOpen={setIsFilterOpen}
            />

            {/* Content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}>
                <View className="flex-1 px-6">
                    <Text className='text-black dark:text-gray-300 text-lg mb-3'>{t("featured_temples")}</Text>
                    {/* Card */}
                    <FeaturedTemples props={{ navigation, filters }} />

                    <Text className='text-black dark:text-gray-300 text-lg mb-3'>{t("recently_added")}</Text>
                    <RecentTemples filters={filters} navigation={navigation} />

                </View>
            </ScrollView>


            <FilterModal
                visible={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                search={filters.search}
                onSearchChange={(text) => {
                    setFilters((prev) => ({ ...prev, search: text }))
                    // setSearch(text)
                }}
                selectedState={selectedState}
                onStateChange={(state) => setSelectedState(state)}
                selectedDistrict={selectedDistrict}
                onDistrictChange={(district) => setSelectedDistrict(district)}
                stateOptions={states}
                districtOptions={districts}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
            />
        </SafeAreaView>
    )
}

export default HomeScreen
