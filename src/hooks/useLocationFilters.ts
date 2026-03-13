import { useEffect, useState } from "react";
import { getDistrictsUrl, getStatesUrl } from "../api/cms";


export const useLocationFilters = (fitlers: any ) => {
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedState, setSelectedState] = useState<any>(fitlers?.state);
    const [selectedDistrict, setSelectedDistrict] = useState<any>(fitlers?.district);
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
            const response = await fetch(getStatesUrl());
            const data = await response.json();
            setStates(data.items || []);
        } catch (e) {
            new Error(e);
        } finally {
            setLoadingStates(false);
        }
    };

    const fetchDistricts = async (stateId: number) => {
        try {
            setLoadingDistricts(true);
            const response = await fetch(getDistrictsUrl(stateId));
            const data = await response.json();
            setDistricts(data.items || []);
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