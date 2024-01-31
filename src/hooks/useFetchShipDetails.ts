// В useFetchShipDetails.ts
import { useState, useEffect } from "react";
import { fetchShipDetails } from "../services/api";
import { Ship, ApiResponse } from "../types/types";

const useFetchShipDetails = (id: string) => {
  const [shipDetails, setShipDetails] = useState<Ship | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: ApiResponse<Ship> = await fetchShipDetails(id);

        if (response.data) {
          setShipDetails(response.data);
        } else {
          throw new Error(
            "Unexpected response format or missing required data"
          );
        }
      } catch (error) {
        console.error("Error fetching ship details:", error);

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unexpected error format");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { shipDetails, error, loading };
};

export default useFetchShipDetails;
