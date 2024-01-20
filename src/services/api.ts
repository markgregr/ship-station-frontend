// api.ts
import { ApiResponse, Baggage } from "../types/types";
import { mockBaggageData } from "../mock/mockData";

// Базовый URL API
const API_BASE_URL = "/api";

// Функция для получения деталей багажа по его ID
const fetchBaggageDetails = async (
  id: string
): Promise<ApiResponse<Baggage>> => {
  try {
    // Отправляем запрос на сервер для получения данных багажа по ID
    const response = await fetch(`${API_BASE_URL}/baggage/${id}`);
    const data = await response.json();

    // Проверяем успешность ответа и наличие данных в ответе
    if (!response.ok || !data) {
      // В случае ошибки выбрасываем исключение
      throw new Error("Ошибка при получении деталей багажа");
    }

    // Возвращаем данные в формате ApiResponse
    return { data: data.baggage };
  } catch (error) {
    // В случае ошибки выводим сообщение в консоль и возвращаем моковые данные
    console.error("Ошибка при получении деталей багажа:", error);
    return { data: mockBaggageData[0] };
  }
};

// Функция для получения списка багажей по коду поиска
const fetchBaggageList = async (searchCode: string): Promise<Baggage[]> => {
  try {
    // Отправляем запрос на сервер для получения списка багажей по коду поиска
    const response = await fetch(
      `${API_BASE_URL}/baggage/?searchCode=${encodeURIComponent(searchCode)}`
    );

    // Проверяем успешность ответа
    if (!response.ok) {
      // В случае ошибки выбрасываем исключение
      throw new Error("Ошибка при получении списка багажей");
    }

    // Получаем данные из ответа
    const responseData = await response.json();
    console.log(responseData.baggages.baggages);
    // Проверяем наличие свойства 'baggages' в ответе
    if (!responseData.baggages || responseData.baggages.baggages === null) {
      console.warn("Багаж не найден");
      // Возвращаем пустой массив, чтобы указать, что багаж не найден
      return [];
    }

    // Получаем список багажей
    const baggages: Baggage[] = responseData.baggages.baggages;

    // Проверяем, что 'baggages' - это массив и он не пустой
    if (!Array.isArray(baggages) || baggages.length === 0) {
      console.warn("Багаж не найден");
      // Возвращаем пустой массив, чтобы указать, что багаж не найден
      return [];
    }

    // Возвращаем список багажей
    return baggages;
  } catch (error) {
    // В случае ошибки выводим сообщение в консоль и возвращаем моковые данные
    console.error("Ошибка при получении списка багажей:", error);

    // Преобразуем поисковый код в нижний регистр
    const searchCodeLowerCase = searchCode.toLowerCase();

    // Фильтруем моковые данные независимо от регистра
    const filteredMockData = mockBaggageData.filter((mockBaggage) =>
      mockBaggage.baggage_code.toLowerCase().startsWith(searchCodeLowerCase)
    );

    // Возвращаем отфильтрованные моковые данные
    console.log(filteredMockData);
    return filteredMockData;
  }
};

export { fetchBaggageDetails, fetchBaggageList };
