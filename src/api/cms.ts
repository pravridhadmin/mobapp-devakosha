import { State, StateResponse } from "../types/models";

export const getStates = async (): Promise<State[]> => {
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  try {
    const response = await fetch(`${BASE_URL}/districts`);

    if (!response.ok) {
      throw new Error("Failed to fetch states");
    }

    const data: StateResponse = await response.json();

    return data.items; 
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};