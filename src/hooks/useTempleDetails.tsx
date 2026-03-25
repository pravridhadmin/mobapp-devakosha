import { useEffect, useState } from "react";

import { TemplePage } from "../types/models";
import { fetchTempleDetail, getTempleDetailUrl } from "../api/cms";

export const useTempleDetails = (itemId: number) => {
  const [temple, setTemple] = useState<TemplePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTempleDetails = async () => {
    try {
      setLoading(true);
      const data = await fetchTempleDetail(itemId);
      setTemple(data);
      setError(null);
    } catch (err) {
      setError("Failed to load temple");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTempleDetails();
  }, [itemId]);

  return { temple, loading, error, refetch: fetchTempleDetails };
};