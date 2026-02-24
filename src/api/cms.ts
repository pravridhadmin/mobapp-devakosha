import { District, DistrictResponse, State, StateResponse, TemplePage, TemplesUrlParams } from "../types/models";
import { Platform } from 'react-native';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const getProxiedUrl = (url : string) : string => {
    if (Platform.OS === 'web') {
        const targetUrl = new URL(url);
        // Use relative path for web proxy
        return targetUrl.pathname + targetUrl.search;
    }
    return url;
};

export const getStates = async (): Promise<State[]> => {
  try {
    const response = await fetch(`${BASE_URL}/states`);

    if (!response.ok) {
      throw new Error("Failed to fetch states");
    }

    const data: StateResponse = await response.json();
    return data.items; 
  } catch (error) {
    throw error;
  }
};


export const getDistricts = async (stateId: string | number): Promise<District[]> => {
  try {
    const response = await fetch(`${BASE_URL}/districts/?state=${stateId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch districts");
    }

    const data: DistrictResponse = await response.json();
    return data.items; 
  } catch (error) {
    throw error;
  }
};




export const getTemplesUrl = (params: TemplesUrlParams = {} ) : string => {
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

export const getTempleDetailUrl = (templeId: string | number) => {
    const url = `${BASE_URL}/pages/${templeId}/?fields=*,state(title),district(title)`;
    return getProxiedUrl(url);
};

export const getStatesUrl = (limit = 40) => {
    const url = `${BASE_URL}/states/?limit=${limit}`;
    return getProxiedUrl(url);
};

export const getDistrictsUrl = (stateId, limit = 50) => {
    const url = `${BASE_URL}/districts/?state=${stateId}&limit=${limit}`;
    return getProxiedUrl(url);
};
export const fetchTemples = async (params: TemplesUrlParams = {}) : Promise<TemplePage[]>=> {
    const url = getTemplesUrl(params);
    console.log('Fetching temples with URL:', url); // Debugging log
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Error fetching temples:', error);
        throw error;
    }
};

export const fetchStates = async (limit = 40) => {
    const url = getStatesUrl(limit);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch states');
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Error fetching states:', error);
        return [];
    }
};

export const fetchDistricts = async (stateId, limit = 50) => {
    if (!stateId) return [];
    const url = getDistrictsUrl(stateId, limit);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch districts');
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Error fetching districts:', error);
        return [];
    }
};