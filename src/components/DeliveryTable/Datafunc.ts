// Function to format the date and time
export const formatDateTime = (dateTimeString: string) => {
  const defaultDate = "0001-01-01T03:00:00+03:00";

  // Проверяем, является ли дата "0001-01-01 00:00:00+00"
  if (dateTimeString === defaultDate) {
    return "Отсутствует";
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  } as const;

  return new Date(dateTimeString).toLocaleDateString("ru-US", options);
};
