import { daysOfWeekInEnglish } from "../constants/data";

export const getRecurringDates = (dayOfWeek, startDate, weeks = 8) => {
  let dates = [];
  let targetDayIndex = daysOfWeekInEnglish.indexOf(dayOfWeek);

  let date = new Date(startDate);
  while (date.getDay() !== targetDayIndex) {
    date.setDate(date.getDate() + 1);
  }

  for (let i = 0; i < weeks; i++) {
    let newDate = new Date(date);
    newDate.setDate(date.getDate() + i * 7);
    dates.push(newDate);
  }

  return dates;
};
