import { days, hours } from "../constants/data";

export const getDaysAndHoursFromSlots = (timeSlots, selectedSlotIds, setFormData, formData) => {
  const selectedSlots = timeSlots.filter(slot => selectedSlotIds.includes(slot.id - 1));
  console.log(formData.timeSlots);

  const selectedDays = [...new Set(selectedSlots.map(slot => slot.dayOfWeek))];
  const selectedHours = [...new Set(selectedSlots.map(slot => `${slot.startAt.substring(0, 5)} - ${slot.endAt.substring(0, 5)}`))];

  // Знаходимо індекси днів у `days`
  const selectedDayIndexes = Object.values(days)
    .map((value, index) => (selectedDays.every(day => value.includes(day)) ? index : -1))
    .filter(index => index !== -1);

  // Знаходимо індекси годин у `hours`
  const selectedHourIndexes = Object.values(hours)
    .map((value, index) => (selectedHours.includes(value) ? index : -1))
    .filter(index => index !== -1);

  setFormData((prev) => ({
    ...prev,
    day: selectedDayIndexes,
    hour: selectedHourIndexes
  }));

  return { selectedDayIndexes, selectedHourIndexes };
};
