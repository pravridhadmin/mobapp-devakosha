import { useEffect, useState } from "react";
import { fetchStates as fetchStatesApi, fetchDistricts as fetchDistrictsApi } from "../api/cms";
import { District, State } from "../types/models";


export const useLocationFilters = (fitlers: any ) => {
    const [states, setStates] = useState<State[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [selectedState, setSelectedState] = useState<State>(fitlers?.state);
    const [selectedDistrict, setSelectedDistrict] = useState<District>(fitlers?.district);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);

    useEffect(() => {
        fetchStates();
    }, []);

    useEffect(() => {
        if (selectedState) {
            fetchDistricts(selectedState.id);
        } else {
            setDistricts([]);
            setSelectedDistrict(null);
        }
    }, [selectedState]);

    const fetchStates = async () => {
        try {
            setLoadingStates(true);
        const states = await fetchStatesApi();

        setStates(states);

        } catch (e) {
            new Error(e);
        } finally {
            setLoadingStates(false);
        }
    };

    const fetchDistricts = async (stateId: number) => {
        try {
            setLoadingDistricts(true);
            const districts = await fetchDistrictsApi(stateId);

            setDistricts(districts);
        } catch (e) {
            new Error(e);
        } finally {
            setLoadingDistricts(false);
        }
    };

    return {
        states,
        districts,
        selectedState,
        selectedDistrict,
        setSelectedState,
        setSelectedDistrict,
        loadingStates,
        loadingDistricts,
    };
};