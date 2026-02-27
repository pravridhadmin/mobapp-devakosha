import { useEffect, useState } from "react";
import { FEATURED_PAGE_LIMIT, RECENT_PAGE_LIMIT } from "../utils/constants";

type Filters = {
  state?: any;
  district?: any;
  search?: string;
};

export const useHomeTemples = (
  fetchTemples: Function,
  filters: Filters,
  offset: number = 0
) => {
  const [featuredTemple, setFeaturedTemple] = useState<any | null>(null);
  const [recentTemples, setRecentTemples] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


const fetchFeaturedTemple = async () => {
  try {
    const featured = await fetchTemples({
      ...filters,
      featured: true,
      limit: FEATURED_PAGE_LIMIT,
      offset: offset,
    });
    setFeaturedTemple(featured?.[0] || null);
    return featured;
  } catch (err) {
    setError("Failed to load featured temple");
  }
};

const fetchRecentTemples = async () => {
  try {
    const recent = await fetchTemples({
      state: null,
      district: null,
      search: null,
      limit: RECENT_PAGE_LIMIT,
      offset: offset,
    });
    setRecentTemples(recent || []);
    return recent;
  } catch (err) {
    setError("Failed to load recent temples");
  }
}

  const loadHomeData = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Featured (only 1) without any filters
      await fetchFeaturedTemple();

      // 2️⃣ Recent (5) without any filters - to show recent additions irrespective of location/search
      await fetchRecentTemples();
    } catch (err) {
      setError("Failed to load home data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, [filters]);

  return {
    featuredTemple,
    recentTemples,
    loading,
    error,
    reload: loadHomeData,
  };
};