import { AxiosError, AxiosResponse } from "axios";
import { addNotification } from "../redux/additional/additionalSlice";

// Функция для проверки, является ли объект AxiosError
export function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}

export const handleError = (
  error: unknown,
  dispatch: (action: any) => void
): never => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error?: string }>; // Уточняем тип
    dispatch(
      addNotification({
        message: axiosError.response?.data?.error || axiosError.message,
        isError: true,
      })
    );
    console.error(
      "Axios error: ",
      axiosError.response?.data?.error || axiosError.message
    );
  } else {
    console.error("Unexpected error: ", error);
  }
  throw error;
};

export const handleSuccess = (
  response: AxiosResponse,
  dispatch: (action: any) => void
): AxiosResponse => {
  dispatch(
    addNotification({
      message: "Успешно",
      isError: false,
    })
  );

  // Возвращаем оригинальный объект ответа
  return response;
};
