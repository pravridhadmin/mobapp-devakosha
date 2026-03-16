import { TemplePage, TemplesUrlParams } from "../types/models";
import { Platform } from 'react-native';
import apiClient from "./apiClient";
import { showSnackbar } from "../utils/snackbar";
import { handleApiError } from "../utils/errorHandler";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const getProxiedUrl = (url: string): string => {
    if (Platform.OS === 'web') {
        const targetUrl = new URL(url);
        // Use relative path for web proxy
        return targetUrl.pathname + targetUrl.search;
    }
    return url;
};


export const getTemplesUrl = (params: TemplesUrlParams = {}): string => {
    let url = `${BASE_URL}/pages/?type=temple.TemplePage&fields=*,state(title),district(title)&order=-last_published_at`;

    if (params.state) {
        url += `&state=${params.state.id}`;
    }
    if (params.district) {
        url += `&district=${params.district.id}`;
    }
    if (params.search) {
        url += `&search=${encodeURIComponent(params.search)}`;
    }
    if (params.featured) {
        url += `&is_featured=${params.featured}`;
    }

    // Pagination
    const limit = params.limit || 10;
    const offset = params.offset || 0;
    url += `&limit=${limit}&offset=${offset}`;

    return getProxiedUrl(url);
};

export const getTempleDetailUrl = (templeId: number) => {
    const url = `${BASE_URL}/pages/${templeId}/?fields=*,state(title),district(title)`;
    return getProxiedUrl(url);
};

export const getStatesUrl = (limit = 40) => {
    const url = `${BASE_URL}/states/?limit=${limit}`;
    return getProxiedUrl(url);
};

export const getDistrictsUrl = (stateId: number, limit = 50) => {
    const url = `${BASE_URL}/districts/?state=${stateId}`;
    return getProxiedUrl(url);
};
export const fetchTemples = async (params: TemplesUrlParams = {}): Promise<TemplePage[]> => {
    const url = getTemplesUrl(params);
    const data = await apiRequest({
        method: "GET",
        url,
    });

    return data.items || [];
};

export const fetchStates = async (limit = 40) => {
    const url = getStatesUrl(limit);
    const data = await apiRequest({
        method: "GET",
        url,
    });

    return data.items || [];
};

export const fetchDistricts = async (stateId: number, limit = 50) => {
    if (!stateId) return [];
    const url = getDistrictsUrl(stateId, limit);
    const data = await apiRequest({
        method: "GET",
        url,
    });

    return data.items || [];
};

export const fetchTempleDetail = async (templeId: number) => {
    const url = getTempleDetailUrl(templeId);
    const data = await apiRequest({
        method: "GET",
        url,
    });

    return data;
};


export const apiRequest = async ({
    method = "GET",
    url,
    data = null,
    params = {},
}) => {
    try {
        const response = await apiClient({
            method,
            url,
            data,
            params,
        });
        return response.data;
    } catch (error) {
    const message = handleApiError(error);

    throw new Error(message);

    }
};