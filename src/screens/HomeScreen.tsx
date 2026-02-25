import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, StatusBar, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import SearchSection from '../components/SearchSection';
import FilterModal from '../components/FilterModal';
import { useTranslation } from "react-i18next";
import { fetchTemples, getDistrictsUrl, getStatesUrl } from '../api/cms';
import TempleCard from '../components/Card';
import { TemplePage } from '../types/models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import EmptyState from '../components/EmptyState';
import { useLocationFilters } from '../hooks/useLocationFilters';
import { useHomeTemples } from '../hooks/useHomeTemples';
import { useFilters } from '../context/FiltersContext';

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

const HomeScreen = ({ navigation }: Props) => {
  const { colorScheme } = useColorScheme();
      const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
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

  const {
    featuredTemple,
    recentTemples,
    loading,
    error,
    reload,
  } = useHomeTemples(fetchTemples, filters);

  const handleApplyFilters = () => {
    const applied = {
      state: selectedState,
      district: selectedDistrict,
      search: search.trim(),
    };

    setFilters(applied);

    navigation.navigate("Listing");

    setIsFilterOpen(false);
  };
  const handleClearFilters = () => {
    setSearch("");
    setSelectedState(null);
    setSelectedDistrict(null);
    setIsFilterOpen(false);
  }



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
        title={t("devakosha")}
        onProfilePress={() => navigation.navigate('Profile')}
        onFilterPress={() => setIsFilterOpen(true)}
      />

      {/* Search bar and rest of screen */}
      <SearchSection
        search={search || filters.search}
        onSearchChange={(text) => { 
          setSearch(text)
          setFilters((prev) => ({ ...prev, search: text }))
          navigation.navigate("Listing")
        }}
        selectedState={filters.state}
        selectedDistrict={filters.district}
        setIsFilterOpen={setIsFilterOpen}
      />

      {/* Content */}
      <View className="flex-1 px-6">
        <Text className='text-black dark:text-gray-300 text-lg mb-3'>{t("featured_temples")}</Text>
        {/* Card */}
        {!error && featuredTemple && (
          <FlatList
            data={[featuredTemple]}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={reload} />
            }
            onEndReachedThreshold={0.5}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !loading && (
                <EmptyState
                  message={t("no_temples_found")}
                  subMessage={t("we_couldnt_find_any_temples_at_the_moment")}
                  actionLabel={t("try_again")}
                  onAction={reload}
                  icon="🏙️"
                />
              )
            }
          />
        )}

        <Text className='text-black dark:text-gray-300 text-lg mb-3 mt-6'>{t("recently_added")}</Text>
        {!error && recentTemples.length != 0 && (
          <FlatList
            data={recentTemples}
            renderItem={renderRecentItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className="w-4" />}
            onEndReachedThreshold={0.5}
            horizontal
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !loading && (
                <EmptyState
                  message={t("no_recent_temples_found")}
                  subMessage={t("we_couldnt_find_any_temples_at_the_moment")}
                  actionLabel={t("try_again")}
                  onAction={reload}
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
