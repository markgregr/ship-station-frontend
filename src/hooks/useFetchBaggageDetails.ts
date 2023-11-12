// В useFetchBaggageDetails.ts
import { useState, useEffect } from "react";
import { fetchBaggageDetails } from "../services/api";
import { Baggage, ApiResponse } from "../types/types";

const useFetchBaggageDetails = (id: string) => {
  const [baggageDetails, setBaggageDetails] = useState<Baggage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: ApiResponse<Baggage> = await fetchBaggageDetails(id);

        console.log("Response in fetchData:", response);

        if (response.data) {
          setBaggageDetails(response.data);
        } else {
          throw new Error(
            "Unexpected response format or missing required data"
          );
        }
      } catch (error) {
        console.error("Error fetching baggage details:", error);

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

  return { baggageDetails, error, loading };
};

export default useFetchBaggageDetails;
