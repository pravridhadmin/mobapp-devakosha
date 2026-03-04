// context/HomeContext.tsx

import React, { createContext, useContext, useState } from "react";

type HomeData = {
  featuredTemple: any | null;
  recentTemples: any[];
  lastFetched: number | null;
};

type HomeContextType = {
  homeData: HomeData;
  setHomeData: React.Dispatch<React.SetStateAction<HomeData>>;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider = ({ children }: { children: React.ReactNode }) => {
  const [homeData, setHomeData] = useState<HomeData>({
    featuredTemple: null,
    recentTemples: [],
    lastFetched: null,
  });

  return (
    <HomeContext.Provider value={{ homeData, setHomeData }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within HomeProvider");
  }
  return context;
};