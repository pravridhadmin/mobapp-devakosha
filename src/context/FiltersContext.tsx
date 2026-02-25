import React, { createContext, useContext, useState } from "react";
import { District, State } from "../types/models";

type FiltersType = {
  state: State | null;
  district: District | null;
  search: string;
};

type FiltersContextType = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  resetFilters: () => void;
};

const defaultFilters: FiltersType = {
  state: null,
  district: null,
  search: "",
};

const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined
);

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<FiltersType>(defaultFilters);

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used inside FiltersProvider");
  }
  return context;
};