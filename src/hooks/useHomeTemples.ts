import { useEffect, useState } from "react";

type Filters = {
  state?: any;
  district?: any;
  search?: string;
};

export const useHomeTemples = (
  fetchTemples: Function,
  filters: Filters
) => {
  const [featuredTemple, setFeaturedTemple] = useState<any | null>(null);
  const [recentTemples, setRecentTemples] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHomeData = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Featured (only 1) without any filters
      const featured = await fetchTemples({
        // ...filters,
        featured: true,
        limit: 1,
        offset: 0,
      });

      // 2️⃣ Recent (5) without any filters - to show recent additions irrespective of location/search
      const recent = await fetchTemples({
        state: null,
        district: null,
        search: null,
        limit: 5,
        offset: 0,
      });

      setFeaturedTemple(featured?.[0] || null);
      setRecentTemples(recent || []);
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