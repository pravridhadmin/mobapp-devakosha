import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import EmptyState from '../../../components/EmptyState'
import { View } from 'react-native'
import { TemplePage } from '../../../types/models'
import { useTranslation } from 'react-i18next'
import TempleCard from '../../../components/Card';
import { fetchTemples } from '../../../api/cms'
import { useHomeTemples } from '../../../hooks/useHomeTemples'
import CardSkeleton from '../../../components/skeleton/CardSkeleton'
import ErrorState from '../../../components/ErrorState'

interface Props {
    filters: any,
    navigation?: any
    forceReload?: boolean
}
const RecentTemples = ({filters, navigation, forceReload}: Props) => {
    const { t } = useTranslation();
    const { fetchRecentTemples, recentTemplesLoading, recentTemplesError } = useHomeTemples(fetchTemples, filters, 0);
    const [temples, setTemples] = useState<TemplePage[] | null>(null);

    useEffect(() => {
        const loadRecentTemples = async () => {
            const recentTemples = await fetchRecentTemples(forceReload);
            setTemples(recentTemples);
        };
        loadRecentTemples();
    }, [forceReload]);


    const keyExtractor = useCallback((item: TemplePage) => {
        return item.id.toString();
    }, []);


    const renderSeparator = useCallback(() => {
        return <View className="w-4" />;
    }, []);

    
    const handleNavigate = useCallback(
        (id: number) => {
            navigation.navigate('Details', { itemId: id });
        },
        []
    );

    const renderRecentItem = useCallback(
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
                cardHeight="h-44"
                cardWidth="w-72"
                onPress={() => handleNavigate(item.id)}
            />
        ),
        []
    );

    // Loading
    if (recentTemplesLoading) {
        return (
            <View className="flex-row gap-4">
                <CardSkeleton cardHeight="h-44" cardWidth="w-72" />
                <CardSkeleton cardHeight="h-44" cardWidth="w-72" />
            </View>
        );
    }

    //  Error
    if (recentTemplesError) {
        return (
            <ErrorState
                title={t("error.title")}
                message={t("error.message")} 
                buttonText={t("error.button_text")}
                onRefresh={() => fetchRecentTemples(true)}
            />
        );
    }


    return (
        <Suspense fallback={<CardSkeleton cardHeight="h-44" cardWidth="w-72" />}>
        <FlatList
            data={temples}
            renderItem={renderRecentItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={renderSeparator}
            onEndReachedThreshold={0.5}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                !recentTemplesLoading &&
                <EmptyState
                    message={t("recent.no_recent_temples_found")}
                    subMessage={t("recent.we_couldnt_find_any_temples_at_the_moment")}
                    actionLabel={t("recent.try_again")}
                    onAction={() => fetchRecentTemples(true)}
                />
            }
        />
        </Suspense>
    )
}

export default RecentTemples
