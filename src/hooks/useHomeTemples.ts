import { useEffect, useState } from "react";
import { FEATURED_PAGE_LIMIT, RECENT_PAGE_LIMIT } from "../utils/constants";
import { useHomeContext } from "../context/HomeContext";
import { District, State } from "../types/models";

type Filters = {
    state?: State;
    district?: District;
    search?: string;
};

export const useHomeTemples = (
    fetchTemples: Function,
    filters: Filters,
    offset: number = 0
) => {
    const { homeData, setHomeData } = useHomeContext(); 
    const [recentTemplesLoading, setRecentTemplesloading,] = useState(false);
    const [featuredLoading, setFeaturedLoading] = useState(false);
    const [featuredError, setFeaturedError] = useState<string | null>(null);
    const [recentTemplesError, setRecentTemplesError] = useState<string | null>(null);

    const fetchFeaturedTemple = async (forceReload = false) => {
        if (!forceReload && homeData.featuredTemple !== null) {
            return homeData.featuredTemple;
        }
        setFeaturedLoading(true);
        setFeaturedError(null);
        try {
            const featured = await fetchTemples({
                featured: true,
                limit: FEATURED_PAGE_LIMIT,
                offset: offset,
            });
            setHomeData({
                ...homeData,
                featuredTemple: featured || [],
                lastFetched: Date.now(),
            });
            return featured;
        } catch (err) {
            setFeaturedError("Failed to load featured temple");
        } finally {
            setFeaturedLoading(false);
        }
    };

    const fetchRecentTemples = async (forceReload = false) => {
        if (!forceReload && homeData.recentTemples.length > 0) {
            return homeData.recentTemples;
        }
        setRecentTemplesloading(true);
        setRecentTemplesError(null);
        try {
            const recent = await fetchTemples({
                state: null,
                district: null,
                search: null,
                limit: RECENT_PAGE_LIMIT,
                offset: offset,
            });
            setHomeData({
                ...homeData,
                recentTemples: recent || [],
                lastFetched: Date.now(),
            });
            // setRecentTemples(recent || []);
            return recent;
        } catch (err) {
            setRecentTemplesError("Failed to load recent temples");
        } finally {
            setRecentTemplesloading(false);
        }
    }

    return {
        fetchFeaturedTemple,
        fetchRecentTemples,
        recentTemplesLoading,
        featuredLoading,
        featuredError,
        recentTemplesError,
        // reload: () => loadHomeData(true),
    };
};