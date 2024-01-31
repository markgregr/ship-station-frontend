// useFetchShipData.ts
import { useState, useEffect } from "react";
import { Ship } from "../types/types";
import { fetchShipList } from "../services/api";

const useFetchShipData = (shipName: string) => {
  const [shipData, setShipData] = useState<Ship[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShipList(shipName);

        if (data && data.length > 0) {
          setNoResults(false);
          setShipData(data);
        } else {
          setNoResults(true);
          setShipData([]);
        }
      } catch (error) {
        console.error("Ошибка при получении данных о багаже:", error);
        setNoResults(true);
        setShipData([]);
      }
    };

    fetchData();
  }, [shipName]);

  return { shipData, noResults };
};

export default useFetchShipData;
