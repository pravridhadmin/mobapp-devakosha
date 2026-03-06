import React, { lazy, Suspense, use, useEffect, useState } from 'react'
// import TempleCard from '../../../components/Card';
import { useHomeTemples } from '../../../hooks/useHomeTemples';
import { filter } from 'domutils';
import { fetchTemples } from '../../../api/cms';
import EmptyState from '../../../components/EmptyState';
import CardSkeleton from '../../../components/skeleton/CardSkeleton';
const TempleCard = lazy(() => import('../../../components/Card'));

const FeaturedTemples = ({ props }) => {
    const { fetchFeaturedTemple, featuredLoading, featuredError } = useHomeTemples(fetchTemples, props.filters, 0);
    const [temple, setTemple] = useState(null);


    useEffect(() => {
        const loadFeatured = async () => {
            const featuredTemple = await fetchFeaturedTemple(false);
            setTemple(featuredTemple?.[0]);
        };
        loadFeatured();
    }, []);

    if(!temple) {
        return (
            <EmptyState message={"no_featured_temples"} />
        );
    }

    // error
    if(featuredError) {
        return (
            <EmptyState message={"error_fetching_featured_temples"} />
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
                    onPress={() => props.navigation.navigate('Details', { itemId: temple.id })}
                />
        </Suspense>
    )
}

export default FeaturedTemples
