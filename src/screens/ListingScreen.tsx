import React, { use, useCallback, useEffect, useState } from 'react';
import { View, Text, Button, Pressable, TouchableOpacity, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Dropdown } from "react-native-element-dropdown";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useColorScheme } from "nativewind";
import { District, State, TemplePage } from "../types/models";
import { fetchTemples, getDistrictsUrl, getStates, getStatesUrl } from '../api/cms';
import { Skeleton } from "../components/Skeleton";
import ScreenHeader from '../components/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import TempleCard from '../components/Card';
import SearchSection from '../components/SearchSection';
import FilterModal from '../components/FilterModal';
import { RefreshControl } from 'react-native';
import EmptyState from '../components/EmptyState';
import { useLocationFilters } from '../hooks/useLocationFilters';
import { useTemples } from '../hooks/useTemples';
import { filter } from 'domutils';
import { useFilters } from '../context/FiltersContext';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Listing'>;

export default function ListingScreen({ navigation }: Props) {
    const { t } = useTranslation();
    const { colorScheme } = useColorScheme();
    const [search, setSearch] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { filters, setFilters } = useFilters();

    useFocusEffect(
        useCallback(() => {
            setIsFilterOpen(true);
        }, [])
    );
    const {
        states,
        districts,
        selectedState,
        selectedDistrict,
        setSelectedState,
        setSelectedDistrict,
    } = useLocationFilters(getStatesUrl, getDistrictsUrl);



    const {
        temples,
        loading,
        error,
        refreshing,
        loadingMore,
        onRefresh,
        handleLoadMore,
    } = useTemples(fetchTemples, filters);

    const handleApplyFilters = () => {
        const applied = {
            state: selectedState,
            district: selectedDistrict,
            search: filters.search,
        };

        setFilters(applied);



        setIsFilterOpen(false);
    };

    const handleClearFilters = () => {
        setSelectedState(null);
        setSelectedDistrict(null);
        setSearch("");
        setFilters({
            state: null,
            district: null,
            search: "",
        });
    };



    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
                <ActivityIndicator size="large" />
                <Text className="mt-4 text-text dark:text-text-dark">
                    {t("loading")}...
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
                <Text className="text-red-500">{error}</Text>
                <Button title={t("try_again")} onPress={onRefresh} />
            </View>
        );
    }
    const renderItem = ({ item }: { item: TemplePage }) => (
        <TempleCard
            image={item.featured_image && item.featured_image.length > 0 ? item.featured_image[0].value : null}
            name={item.title}
            district={item.district?.title}
            state={item.state?.title}
            address={item?.address_line1}
            onPress={() => navigation.navigate('Details', { itemId: item.id })}
        />
    );
    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-background dark:bg-background-dark">
            <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />

            {/* Header */}

            <ScreenHeader
                title="Devakosha"
                onProfilePress={() => navigation.navigate('Profile')}
            // onFilterPress={() => setIsFilterOpen(true)}
            />

            {/* Search bar and rest of screen */}
            <SearchSection
                search={filters.search}
                onSearchChange={(text) => {
                    setFilters((prev) => ({ ...prev, search: text }))
                    setSearch(text)
                }}
                selectedState={filters.state}
                selectedDistrict={filters.district}
                setIsFilterOpen={setIsFilterOpen}
            />

            {/* Content */}
            <View className="flex-1 px-6">

                {/* Card */}
                {!error && (
                    <FlatList
                        data={temples}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            loadingMore ? (
                                <View style={{ paddingVertical: 20 }}>
                                    <ActivityIndicator size="small" />
                                </View>
                            ) : null
                        }
                        ListEmptyComponent={
                            !loading && temples.length === 0 && (
                                <EmptyState
                                    message={t("no_temples_found")}
                                    subMessage={filters.state ? t("try_clearing_filters_to_see_more_results") : t("we_couldnt_find_any_temples_at_the_moment")}
                                    actionLabel={filters.state ? t("clear_filters") : t("try_again")}
                                    onAction={filters.state ? handleClearFilters : onRefresh}
                                    icon="🏙️"
                                />
                            )
                        }
                    />
                )}



                {/* <Skeleton className="h-6 w-3/4 rounded-md" /> */}
                {/* <Skeleton className="h-4 w-full rounded-md" /> */}
                {/* <Skeleton className="h-4 w-5/6 rounded-md" /> */}
                {/* <Skeleton className="h-40 w-full rounded-xl" /> */}
            </View>
            <FilterModal
                visible={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                search={filters.search}
                onSearchChange={(text) => {
                    setFilters((prev) => ({ ...prev, search: text }))
                    setSearch(text)
                }}
                selectedState={filters.state}
                onStateChange={(state) => setSelectedState(state)}
                selectedDistrict={filters.district}
                onDistrictChange={(district) => setSelectedDistrict(district)}
                stateOptions={states}
                districtOptions={districts}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
            />
        </SafeAreaView>
    );
}