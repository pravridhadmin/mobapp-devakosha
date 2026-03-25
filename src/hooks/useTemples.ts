import { useCallback, useEffect, useState } from "react";
import { fetchTemples } from "../api/cms";
import { TemplePage } from "../types/models";
import { PAGE_LIMIT } from "../utils/constants";



export const useTemples = (filters, isFeatured = false) => {
    const [temples, setTemples] = useState<TemplePage[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const loadTemples = useCallback(
        async (reset = false) => {
            try {
                if (reset) {
                    setLoading(true);
                    setError(null);
                } else {
                    setLoadingMore(true);
                }

                const currentOffset = reset ? 0 : offset;

                const newItems = await fetchTemples({
                    ...filters,
                    limit: PAGE_LIMIT,
                    offset: currentOffset,
                    featured: isFeatured,
                });

                setHasMore(newItems.length === PAGE_LIMIT);

                if (reset) {
                    setTemples(newItems);
                    setOffset(PAGE_LIMIT);
                } else {
                    setTemples(prev => [...prev, ...newItems]);
                    setOffset(prev => prev + PAGE_LIMIT);
                }
            } catch (err) {
                setError("Failed to load temples");
                throw err;
            } finally {
                setLoading(false);
                setRefreshing(false);
                setLoadingMore(false);
            }
        },
        [filters, offset, isFeatured]
    );

    useEffect(() => {
        loadTemples(true);
    }, [filters, isFeatured]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadTemples(true);
    }, [loadTemples]);

    const handleLoadMore = useCallback(() => {
        if (!loading && !loadingMore && hasMore) {
            loadTemples(false);
        }
    }, [loading, loadingMore, hasMore, loadTemples]);

    return {
        temples,
        loading,
        loadingMore,
        refreshing,
        error,
        onRefresh,
        handleLoadMore,
    };
};