// Function to format the date and time
export const formatDateTime = (dateTimeString: string) => {
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
