export const getTimeSlot = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "час не вказано";
  }

  // Отримуємо години та хвилини
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Створюємо час закінчення (додаємо 1 годину)
  const endDate = new Date(date);
  endDate.setHours(date.getHours() + 1);
  const endHours = endDate.getHours().toString().padStart(2, "0");
  const endMinutes = endDate.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}-${endHours}:${endMinutes}`;
};

export const getWeekday = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "День не вказано";
  }

  const weekdayOptions = { weekday: "long", timeZone: "Europe/Kyiv" };
  const weekday = date.toLocaleDateString("uk-UA", weekdayOptions);
  return weekday.charAt(0).toUpperCase() + weekday.slice(1);
};
