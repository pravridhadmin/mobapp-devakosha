import React, { lazy, Suspense, use, useEffect, useState } from 'react'
// import TempleCard from '../../../components/Card';
import { useHomeTemples } from '../../../hooks/useHomeTemples';
import { filter } from 'domutils';
import { fetchTemples } from '../../../api/cms';
import EmptyState from '../../../components/EmptyState';
import CardSkeleton from '../../../components/skeleton/CardSkeleton';
import { useTranslation } from 'react-i18next';
import ErrorState from '../../../components/ErrorState';
const TempleCard = lazy(() => import('../../../components/Card'));

interface Props {
    filters: any;
    navigation?: any;
    forceReload?: boolean
}

const FeaturedTemples = ({ filters, navigation, forceReload } :   Props) => {
    const { fetchFeaturedTemple, featuredLoading, featuredError } = useHomeTemples(fetchTemples, filters, 0);
    const { t } = useTranslation();
    const [temple, setTemple] = useState(null);


    useEffect(() => {
        const loadFeatured = async () => {
            const featuredTemple = await fetchFeaturedTemple(forceReload);
            setTemple(featuredTemple?.[0]);
        };
        loadFeatured();
    }, [forceReload]);
if(featuredLoading) {
    return (
        <CardSkeleton />
    );
}

    if(!temple && !featuredLoading) {
        return (
            <EmptyState message={t("featured.no_featured_temples")} />
        );
    }

    // error
    if(featuredError) {
        return (
            <ErrorState title={t('error.title')} message={t("error.message")} />
        );
    }
    return (
      
        <Suspense fallback={<CardSkeleton />}>
                <TempleCard
                    image={temple?.featured_image && temple.featured_image.length > 0 ? temple.featured_image[0].value : null}
                    name={temple.title}
                    district={temple.district?.title}
                    state={temple.state?.title}
                    address={temple?.address_line1}
                    onPress={() => navigation.navigate('Details', { itemId: temple.id })}
                />
        </Suspense>
    )
}

export default FeaturedTemples
