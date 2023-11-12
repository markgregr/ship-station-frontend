// useFetchBaggageData.ts
import { useState, useEffect } from "react";
import { Baggage } from "../types/types";
import { fetchBaggageList } from "../services/api";

const useFetchBaggageData = (searchCode: string) => {
  const [baggageData, setBaggageData] = useState<Baggage[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBaggageList(searchCode);

        // Проверяем, что data является массивом и он не пустой
        if (data && data.length > 0) {
          setNoResults(false);
          setBaggageData(data);
        } else {
          // Если data не является массивом или он пуст, выводим "Ничего не найдено"
          setNoResults(true);
          setBaggageData([]);
        }
      } catch (error) {
        console.error("Ошибка при получении данных о багаже:", error);
        setNoResults(true);
        setBaggageData([]);
      }
    };

    fetchData();
  }, [searchCode]);

  return { baggageData, noResults };
};

export default useFetchBaggageData;
