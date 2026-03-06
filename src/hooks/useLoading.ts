import { useState } from "react";

export const useLoading = (initialState: boolean = false) => {
  const [loading, setLoading] = useState<boolean>(initialState);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return {
    loading,
    setLoading,
    startLoading,
    stopLoading,
  };
};