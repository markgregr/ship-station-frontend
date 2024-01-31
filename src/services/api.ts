import { ApiResponse, Ship } from "../types/types";
import { mockShipData } from "../mock/mockData";

const API_BASE_URL = "/api";

const fetchShipDetails = async (id: string): Promise<ApiResponse<Ship>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ship/${id}`);
    const data = await response.json();

    if (!response.ok || !data) {
      throw new Error("Ошибка при получении информации о судне");
    }
    console.log(data);
    return { data: data.ship };
  } catch (error) {
    console.error("Ошибка при получении деталей багажа:", error);
    return { data: mockShipData[0] };
  }
};

const fetchShipList = async (shipName: string): Promise<Ship[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/ship/?shipName=${encodeURIComponent(shipName)}`
    );
    if (!response.ok) {
      throw new Error("Ошибка при получении списка судов");
    }

    const responseData = await response.json();
    console.log(responseData);
    if (responseData === null) {
      console.warn("Судно не найден");
      return [];
    }
    const ships: Ship[] = responseData.ships;

    if (!Array.isArray(ships) || ships.length === 0) {
      console.warn("Багаж не найден");
      return [];
    }

    return ships;
  } catch (error) {
    console.error("Ошибка при получении списка судов:", error);

    const shipNameLowerCase = shipName.toLowerCase();

    // Фильтруем моковые данные независимо от регистра
    const filteredMockData = mockShipData.filter((mockShip) =>
      mockShip.ship_name.toLowerCase().startsWith(shipNameLowerCase)
    );

    // Возвращаем отфильтрованные моковые данные
    console.log(filteredMockData);
    return filteredMockData;
  }
};

export { fetchShipDetails, fetchShipList };
