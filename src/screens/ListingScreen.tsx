import { useCallback, useState } from 'react';
import { View, Text, Pressable, TouchableOpacity, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { TemplePage } from "../types/models";
import { getDistrictsUrl, getStatesUrl } from '../api/cms';
import ScreenHeader from '../components/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import TempleCard from '../components/Card';
import SearchSection from '../components/SearchSection';
import FilterModal from '../components/FilterModal';
import { RefreshControl } from 'react-native';
import EmptyState from '../components/EmptyState';
import { useLocationFilters } from '../hooks/useLocationFilters';
import { useTemples } from '../hooks/useTemples';
import { useFilters } from '../context/FiltersContext';
import { useFocusEffect } from '@react-navigation/native';
import ErrorState from '../components/ErrorState';
import CardSkeleton from '../components/skeleton/CardSkeleton';
import Skeleton from '../components/skeleton/Skeleton';

type Props = NativeStackScreenProps<RootStackParamList, 'Listing'>;

export default function ListingScreen({ navigation }: Props) {
    const { t } = useTranslation();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { filters, setFilters } = useFilters();

    useFocusEffect(
        useCallback(() => {
            if (filters.search === "" && filters.state === null && filters.district === null) {
                setIsFilterOpen(true);
            }
        }, [filters])
    );
    const {
        states,
        districts,
        selectedState,
        selectedDistrict,
        setSelectedState,
        setSelectedDistrict,
    } = useLocationFilters();



    const {
        temples,
        loading,
        error,
        refreshing,
        loadingMore,
        onRefresh,
        handleLoadMore,
    } = useTemples(filters);

    const handleStateChange = useCallback((state) => {
        setSelectedState(state);
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

    const keyExtractor = useCallback((item: TemplePage) => {
        return item.id.toString();
    }, []);



    const handleNavigate = useCallback(
        (id: number) => {
            navigation.navigate('Details', { itemId: id });
        },
        []
    );

    const renderItem = useCallback(
        ({ item }: { item: TemplePage }) => (
            <TempleCard
                image={
                    item.featured_image && item.featured_image.length > 0
                        ? item.featured_image[0].value
                        : null
                }
                name={item.title}
                district={item.district?.title}
                state={item.state?.title}
                onPress={() => handleNavigate(item.id)}
            />
        ),
        []
    );

    if (error) {
        return (
            <ErrorState
                title={t("error.title")}
                message={t("error.message")}
                buttonText={t("error.button_text")}
                onRefresh={onRefresh} />
        );
    }
    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-background dark:bg-background-dark">
            {/* Header */}
            <ScreenHeader
                title={t('generic.devakosha')}
                onProfilePress={() => navigation.navigate('Profile')}
                onReloadPress={() => onRefresh()}
            />

            {/* Search bar and rest of screen */}
            {loading ? <Skeleton className="w-11/12 m-auto h-16 rounded-lg mb-4" /> : 
            <SearchSection
                search={filters.search}
                onSearchChange={(text) => {
                    setFilters((prev) => ({ ...prev, search: text }))
                }}
                selectedState={filters.state}
                selectedDistrict={filters.district}
                setIsFilterOpen={setIsFilterOpen}
            /> }

            {/* Content */}
            <View className="flex-1 px-6">

                {/* Card */}
                {loading ? (
                    <>
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                    </>
                ) :
                    !error && (
                        <FlatList
                            data={temples}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={
                                loadingMore ? (
                                    <CardSkeleton />
                                ) : null
                            }
                            ListEmptyComponent={
                                !loading && temples.length === 0 && (
                                    <EmptyState
                                        message={t("search.no_temples_found")}
                                        subMessage={t("search.try_clearing_filters_to_see_more_results")}
                                        actionLabel={t("search.clear_filters")}
                                        onAction={handleClearFilters}
                                        icon="🏙️"
                                    />
                                )
                            }
                        />
                    )}

            </View>
            <FilterModal
                visible={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                search={filters.search}
                onSearchChange={(text) => {
                    setFilters((prev) => ({ ...prev, search: text }))
                }}
                selectedState={selectedState}
                onStateChange={handleStateChange}
                selectedDistrict={selectedDistrict}
                onDistrictChange={handleDistrictChange}
                stateOptions={states}
                districtOptions={districts}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
            />
        </SafeAreaView>
    );
}