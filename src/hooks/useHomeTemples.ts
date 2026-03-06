import { useEffect, useState } from "react";
import { FEATURED_PAGE_LIMIT, RECENT_PAGE_LIMIT } from "../utils/constants";
import { useHomeContext } from "../context/HomeContext";

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
    const { homeData, setHomeData } = useHomeContext();
    const [featuredTemple, setFeaturedTemple] = useState<any | null>(null);
    const [recentTemples, setRecentTemples] = useState<any[]>([]);
    const [recentTemplesLoading, setRecentTemplesloading,] = useState(false);
    const [featuredLoading, setFeaturedLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [featuredError, setFeaturedError] = useState<string | null>(null);
    const [recentTemplesError, setRecentTemplesError] = useState<string | null>(null);

    const fetchFeaturedTemple = async (forceReload = false) => {
        if (!forceReload && homeData.featuredTemple) {
            return homeData.featuredTemple;
        }
        setFeaturedLoading(true);
        setFeaturedError(null);
        try {
            const featured = await fetchTemples({
                ...filters,
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
        if (!forceReload && homeData.recentTemples.length) {
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

    // const loadHomeData = async (forceReload = false) => {
    //     // Prevent API call if data already exists
    //     if (!forceReload && homeData.featuredTemple && homeData.recentTemples.length) {
    //         return;
    //     }
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         // 1️⃣ Featured (only 1) without any filters
    //         let featuredTemple = await fetchFeaturedTemple();

    //         // 2️⃣ Recent (5) without any filters - to show recent additions irrespective of location/search
    //         let recentTemples = await fetchRecentTemples();

    //         setHomeData({
    //             featuredTemple: featuredTemple?.[0] || null,
    //             recentTemples: recentTemples || [],
    //             lastFetched: Date.now(),
    //         });
    //     } catch (err) {
    //         setError("Failed to load home data");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     loadHomeData();
    // }, [filters]);

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