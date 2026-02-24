import React, { useEffect, useState } from 'react';
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

type Props = NativeStackScreenProps<RootStackParamList, 'Listing'>;

export default function ListingScreen({ navigation, route }: Props) {
    const { searchFilters } = route.params;
    const { t } = useTranslation();
    const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();
    const [states, setStates] = useState<State[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [search, setSearch] = useState(searchFilters.search);
    // const [state, setState] = useState("");
    // const [district, setDistrict] = useState("");
    const [selectedState, setSelectedState] = useState(searchFilters.state);
    const [selectedDistrict, setSelectedDistrict] = useState(searchFilters.district);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [filters, setFilters] = useState({ state: searchFilters.state, district: searchFilters.district, search: searchFilters.search });
    const [temples, setTemples] = useState<TemplePage[]>([]);

    // Pagination state
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const PAGE_SIZE = 10;




    useEffect(() => {
        fetchStates();
    }, []);


    useEffect(() => {
        if (selectedState) {
            console.log('Selected state changed:', selectedState);
            fetchDistricts(selectedState.id);
        } else {
            setDistricts([]);
            setSelectedDistrict(null);
        }
    }, [selectedState]);

    const loadTemples = async (reset = false) => {
        if (reset) {
            setLoading(true);
            setError(null);
        } else {
            setLoadingMore(true);
        }

        try {
            const currentOffset = reset ? 0 : offset;
            console.log('Loading temples with filters:', filters, 'offset:', currentOffset);
            const newItems = await fetchTemples({ ...filters, limit: PAGE_SIZE, offset: currentOffset });
            if (newItems.length < PAGE_SIZE) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }

            if (reset) {
                setTemples(newItems);
                setOffset(PAGE_SIZE);
            } else {
                setTemples(prev => [...prev, ...newItems]);
                setOffset(prev => prev + PAGE_SIZE);
            }
        } catch (error) {
            if (reset) {
                setError('Failed to load temples.');
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
            setLoadingMore(false);
        }
    };
    const onRefresh = () => {
        setRefreshing(true);
        loadTemples(true);
    };

    useEffect(() => {
        loadTemples(true);
    }, [filters]);

    const handleApplyFilters = () => {
        console.log('Applying filters:', { state: selectedState, district: selectedDistrict, search });
        setFilters({
            state: selectedState,
            district: selectedDistrict,
            search: search.trim()
        });
        setIsFilterOpen(false);
    };
    const handleClearFilters = () => {

        setSelectedState(null);
        setSelectedDistrict(null);
        setSearch('');
        setFilters({ state: null, district: null, search: '' });
        // Effect triggers fetch
    };

    const handleLoadMore = () => {
        if (!loadingMore && !loading && hasMore) {
            loadTemples(false);
        }
    };

    const fetchStates = async () => {
        setLoadingStates(true);
        setError(null);
        try {
            // Limit 40 covers all Indian states/UTs (36 total)
            const url = getStatesUrl();
            const response = await fetch(url);
            const data = await response.json();
            setStates(data.items || []);
        } catch (error) {
            console.error('Error fetching states:', error);
            setError(t('states_load_error'));
        } finally {
            setLoadingStates(false);
        }
    };

    const fetchDistricts = async (stateId) => {
        setLoadingDistricts(true);
        try {
            // Limit 50 is the max allowed by API.
            const url = getDistrictsUrl(stateId);
            console.log('Districts API URL:', url);
            const response = await fetch(url);
            const data = await response.json();
            setDistricts(data.items || []);
        } catch (error) {
            console.error('Error fetching districts:', error);
        } finally {
            setLoadingDistricts(false);
        }
    };
    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
                <ActivityIndicator size="large" />
                <Text className="mt-4 text-text dark:text-text-dark">
                    Loading...
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
                <Text className="text-red-500">{error}</Text>
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
        <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
            <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />

            {/* Header */}

            <ScreenHeader
                title="Devakosha"
                onProfilePress={() => console.log("Profile")}
                onFilterPress={() => setIsFilterOpen(true)}
            />

            {/* Search bar and rest of screen */}
            <SearchSection
                search={search}
                onSearchChange={(text) => setSearch(text)}
                selectedState={selectedState}
                selectedDistrict={selectedDistrict}
                setIsFilterOpen={setIsFilterOpen}
            />

            {/* Content */}
            <View className="flex-1 px-6">

                {/* Card */}
                {!error && temples.length != 0 && (
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
                            !loading && (
                                <EmptyState
                                    message="No temples found"
                                    subMessage={filters.state ? "Try clearing filters to see more results." : "We couldn't find any temples at the moment."}
                                    actionLabel={filters.state ? "Clear Filters" : "Try Again"}
                                    onAction={filters.state ? handleClearFilters : () => loadTemples(true)}
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
                search={search}
                onSearchChange={(text) => setSearch(text)}
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
    );
}