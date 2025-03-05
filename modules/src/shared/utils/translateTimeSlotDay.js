export const translateTimeSlotDay = (day) => {
    const daysMap = {
        Monday: "Понеділок",
        Tuesday: "Вівторок",
        Wednesday: "Середа",
        Thursday: "Четвер",
        Friday: "П'ятниця",
        Saturday: "Субота",
        Sunday: "Неділя",
    };

    return daysMap[day] || day; 
};
