import { days, hours } from "../constants/data";

export const getDaysAndHoursFromSlots = (timeSlots, selectedSlotIds, setFormData, formData) => {
  const selectedSlots = timeSlots.filter(slot => selectedSlotIds.includes(slot.id - 1));

  const selectedDays = [...new Set(selectedSlots.map(slot => slot.dayOfWeek))];
  const selectedHours = [...new Set(selectedSlots.map(slot => `${slot.startAt.substring(0, 5)} - ${slot.endAt.substring(0, 5)}`))];

  // Знаходимо індекси днів у `days`
  // Отримуємо значення днів, які містяться в `selectedDays`
  const selectedDaysValues = Object.values(days)
    .filter(day => selectedDays.some(selectedDay => day.includes(selectedDay)));  // Перевіряємо, чи міститься день у значеннях

  // Отримуємо значення годин, які включаються в `selectedHours`
  const selectedHoursValues = Object.values(hours)
    .filter(hour => selectedHours.includes(hour));  // Перевіряємо, чи входить година в `selectedHours`


  setFormData((prev) => ({
    ...prev,
    day: selectedDaysValues,
    hour: selectedHoursValues
  }));

  return { selectedDaysValues, selectedHoursValues };
};
