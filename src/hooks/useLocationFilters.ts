import { useEffect, useState } from "react";

export const useLocationFilters = (getStatesUrl, getDistrictsUrl) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
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
      console.log("States error", e);
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
      console.log("Districts error", e);
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