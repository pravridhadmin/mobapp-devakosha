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
import Button from '../components/Button';
import { RefreshControl } from 'react-native';
import DetailsSkeleton from '../components/skeleton/DetailsSkeleton';

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

    const handleEmailPress = useCallback(() => {
        if (temple?.contact_email) {
            handleEmail(temple.contact_email);
        }
    }, [temple]);

    const handleCallPress = useCallback(() => {
        if (temple?.contact_number) {
            handleCall(temple.contact_number);
        }
    }, [temple]);
    const handleMapPress = useCallback(() => {
        if (temple?.latitude && temple?.longitude) {
            handleMap(temple?.latitude, temple?.longitude)
        }
    }, [temple]);


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
            content: (<>
                {temple?.address_line1 ? (
                    <InfoRow label={t('details.address')}
                        icon={'location-outline'}
                        isClickable={!!temple?.latitude && !!temple?.longitude}
                        onPress={handleMapPress}
                        component={<>
                            <Text className={`text-primary flex-1 text-right ${temple?.latitude && temple?.longitude ? "underline" : ""}`}>
                                {temple.address_line1}{'\n'}
                                {temple.address_line2 && temple.address_line2}, {temple?.city || ''}{'\n'}
                                {temple.postal_code && temple.postal_code + '\n'}
                                {temple.district && temple.district?.title}, {temple?.state?.title || ''}</Text>
                        </>} />
                ) : null}
                <InfoRow label={t('details.email')} value={temple?.contact_email || ""} icon={'mail-outline'} isClickable={true} onPress={handleEmailPress} />
                <InfoRow label={t('details.call')} value={temple?.contact_number || ""} icon={'call-outline'} isClickable={true} onPress={handleCallPress} />
            </>
            )
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
                    <View className="absolute top-10 left-6">
                        <IconButton
                            iconName="arrow-back"
                            className="bg-white dark:bg-gray-800"
                            onPress={handleBack}
                        />
                    </View>

                    {/* year badge */}
                    {temple?.built_year && (
                        <View className="absolute bottom-10 left-6">
                            <Badge text={temple.built_year} />
                        </View>
                    )}

                    {/* status badge */}
                    {temple?.morning_start && temple?.morning_end && temple?.evening_start && temple?.evening_end && (
                        <View className="absolute bottom-10 right-6">
                            <Badge text={isTempleOpen(temple) ? t('details.open_now') : t("details.closed")} color={isTempleOpen(temple) ? "bg-green-500" : "bg-red-500"} />
                        </View>
                    )}
                </HeroImage>
                <View className="flex-1  bg-background dark:bg-background-dark rounded-t-3xl -mt-6 px-5 pt-6">

                    {/* Title */}
                    <Text className="text-primary dark:text-primary-dark text-3xl font-semibold">
                        {temple?.title || "Temple Name"}
                    </Text>

                    {/* Address */}
                    <AddressRow
                        city={temple?.city || temple?.district?.title}
                        state={temple?.state?.title}
                        onPress={handleMapPress}
                    />

                    {/* Tabs */}
                    <DetailsTabs tabs={tabs} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}