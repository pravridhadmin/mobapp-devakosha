import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import HeroImage from '../components/HeroImage';
import Badge from '../components/Badge';
import DetailsTabs, { TabItem } from '../components/DetailsTabs';
import AddressRow from '../components/AddressRow';
import IconButton from '../components/IconButton';
import { getTempleDetailUrl } from '../api/cms';
import RenderHtmlContent from '../components/RenderHtmlContent';
import { TemplePage } from '../types/models';
import { isTempleOpen } from '../utils/timeHelper';
import ImageGallery from '../components/ImageGallery';
import InfoRow from '../components/InfoRow';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleCall, handleEmail, handleMap } from '../utils/helperFunctions';
import { useTranslation } from 'react-i18next';
import { useTempleDetails } from '../hooks/useTempleDetails';
import { RefreshControl } from 'react-native';
import DetailsSkeleton from '../components/skeleton/DetailsSkeleton';
import CustomHeader from '../components/CustomHeader';
import DetailConnect from '../components/DetailConnect';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
    const { t } = useTranslation();
    const { itemId } = route.params;

    const { temple, loading, error, refetch } = useTempleDetails(itemId);


    const galleryImages = useMemo(() => {
        const carouselBlock = temple?.images?.find(b => b.type === "carousel");
        return carouselBlock?.value || [];
    }, [temple]);

    const handleBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);


    const tabs: TabItem[] = useMemo(() => [
        {
            key: "about",
            label: t('details.about'),
            content: (<RenderHtmlContent htmlContent={temple?.description || ""} />),
        },
        {
            key: "gallery",
            label: t('details.gallery'),
            content: (<ImageGallery galleryImages={galleryImages} imageSize={200} />),
        },
        {
            key: "connect",
            label: t('details.connect'),
            content: (<DetailConnect temple={temple} t={t} /> )
        }
    ], [temple, galleryImages, t]);

    if (loading) {
        return <DetailsSkeleton />;
    }

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={refetch} />
                }>
                <HeroImage
                    imageUrl={temple?.featured_image?.[0]?.value || null}
                >
                    {/* back button */}
                    <CustomHeader onPress={handleBack} />

                    {/* year badge */}
                    <View className="absolute bottom-10 left-6 right-6 flex-row justify-between items-end">

                    {temple?.built_year && (
                        <View className="max-w-[50%]">
                            <Badge text={temple.built_year} />
                        </View>
                    )}

                    {/* status badge */}
                    {temple?.morning_start && temple?.morning_end && temple?.evening_start && temple?.evening_end && (
                        <View className="">
                            <Badge text={isTempleOpen(temple) ? t('details.open_now') : t("details.closed")} color={isTempleOpen(temple) ? "bg-green-500" : "bg-red-500"} />
                        </View>
                    )}
                    </View>
                </HeroImage>
                <View className="flex-1  bg-background dark:bg-background-dark rounded-t-3xl -mt-6 px-5 pt-6">

                    {/* Title */}
                    <Text className="text-text-primary dark:text-text-primary-dark text-2xl font-semibold mb-2">
                        {temple?.title || "Temple Name"}
                    </Text>

                    {/* Address */}
                    <AddressRow
                        city={temple?.city || temple?.district?.title}
                        state={temple?.state?.title}
                    />

                    {/* Tabs */}
                    <DetailsTabs tabs={tabs} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}