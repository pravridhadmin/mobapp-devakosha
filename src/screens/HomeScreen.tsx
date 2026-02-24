import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, StatusBar, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import SearchSection from '../components/SearchSection';
import FilterModal from '../components/FilterModal';
import { fetchTemples, getDistrictsUrl, getStatesUrl } from '../api/cms';
import TempleCard from '../components/Card';
import { TemplePage } from '../types/models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import EmptyState from '../components/EmptyState';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    state: null,
    district: null,
    search: ""
  });
  const [temples, setTemples] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [recentTemples, setRecentTemples] = useState([]);
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

  const onRefresh = () => {
    setRefreshing(true);
    loadTemples(true);
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
      setError('Failed to load states. Please try again.');
    } finally {
      setLoadingStates(false);
    }
  };

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
      const newItems = await fetchTemples({ featured: true, limit: 1, offset: currentOffset });
      const recentlyAdded = await fetchTemples({ state: null, district: null, search: null, limit: 5, offset: currentOffset });
      if (newItems.length < PAGE_SIZE) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      if (reset) {
        setTemples(newItems);
        setRecentTemples(recentlyAdded);
        setOffset(PAGE_SIZE);
      } else {
        setTemples(prev => [...prev, ...newItems]);
        setRecentTemples(prev => [...prev, ...recentlyAdded]);
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

  useEffect(() => {
    loadTemples(true);
  }, [filters]);
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


  const handleClearFilters = () => {
    setSearch("");
    setSelectedState(null);
    setSelectedDistrict(null);
    setIsFilterOpen(false);
  }

  const handleApplyFilters = () => {
    console.log('Applying filters:', { state: selectedState, district: selectedDistrict, search });
    setFilters({
      state: selectedState,
      district: selectedDistrict,
      search: search.trim()
    });
    navigation.navigate('Listing', { searchFilters: { state: selectedState, district: selectedDistrict, search: search.trim() } });
    setIsFilterOpen(false);
  };

  const handleLoadMore = () => {
    if (!loadingMore && !loading && hasMore) {
      loadTemples(false);
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
  const renderRecentItem = ({ item }: { item: TemplePage }) => (
    <TempleCard
      image={item.featured_image && item.featured_image.length > 0 ? item.featured_image[0].value : null}
      name={item.title}
      district={item.district?.title}
      state={item.state?.title}
      cardHeight="h-44"
      cardWidth="w-72"
      onPress={() => navigation.navigate('Details', { itemId: item.id })}
    />
  );
  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
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
        <Text className='text-black dark:text-gray-300 text-lg mb-3'>Featured Temples</Text>
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
            scrollEnabled={false}
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
                  message="No Featured temples found"
                  subMessage={filters.state ? "Try clearing filters to see more results." : "We couldn't find any temples at the moment."}
                  actionLabel={filters.state ? "Clear Filters" : "Try Again"}
                  onAction={filters.state ? handleClearFilters : () => loadTemples(true)}
                  icon="🏙️"
                />
              )
            }
          />
        )}

        <Text className='text-black dark:text-gray-300 text-lg mb-3 mt-6'>Recently Added</Text>
        {!error && recentTemples.length != 0 && (
          <FlatList
            data={recentTemples}
            renderItem={renderRecentItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className="w-4" />}
            onEndReachedThreshold={0.5}
            horizontal
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
                  message="No Featured temples found"
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
  )
}

export default HomeScreen
