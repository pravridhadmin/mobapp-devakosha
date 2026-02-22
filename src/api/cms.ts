import { District, DistrictResponse, State, StateResponse } from "../types/models";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

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