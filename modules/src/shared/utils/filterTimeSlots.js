export const filterTimeSlots = (timeSlots, selectedDays, selectedHours) => {
    console.log("selectedDays", selectedDays);
    console.log("timeSlots", timeSlots);
    console.log("selectedHours", selectedHours);
    
  return timeSlots
      .filter((slot) => {
          const selectedDaysArray = selectedDays.flatMap(day => day.split(" "));
          const isDayMatch = selectedDaysArray.includes(slot.dayOfWeek);

          const slotStart = slot.startAt.substring(0, 5);
          const slotEnd = slot.endAt.substring(0, 5); 

          const isHourMatch = selectedHours.some((hourRange) => {
              const [expectedStart, expectedEnd] = hourRange.split(" - ").map(h => h.trim());
              return slotStart === expectedStart && slotEnd === expectedEnd;
          });

          return isDayMatch && isHourMatch;
      })
      .map(slot => {
          const correctSlot = timeSlots.find(s => s.startAt === slot.startAt && s.dayOfWeek === slot.dayOfWeek);
          return correctSlot?.id - 1;
      });
};
