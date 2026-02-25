import { useEffect, useState } from "react";



export const useTemples = (fetchTemples, filters, isFeatured = false) => {
  const [temples, setTemples] = useState([]);
  const [recentTemples, setRecentTemples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const PAGE_SIZE = 10;

  const loadTemples = async (reset = false) => {
    if (reset) {
      setLoading(true);
      setError(null);
    } else {
      setLoadingMore(true);
    }

    try {
      const currentOffset = reset ? 0 : offset;

      const newItems = await fetchTemples({
        ...filters,
        limit: PAGE_SIZE,
        offset: currentOffset,
        featured: isFeatured,
      });

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
    } catch (err) {
      setError("Failed to load temples");
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadTemples(true);
  }, [filters]);

  const onRefresh = () => {
    setRefreshing(true);
    loadTemples(true);
  };

  const handleLoadMore = () => {
    if (!loading && !loadingMore && hasMore) {
      loadTemples(false);
    }
  };

  return {
    temples,
    recentTemples,
    loading,
    loadingMore,
    refreshing,
    error,
    onRefresh,
    handleLoadMore,
  };
};