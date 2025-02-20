export const handleSelectDays = (day, days, formData, setFormData, setDropdowns) => {
  const selectedDay = days[day];

  if (formData.role === "student") {
      // Студент може вибирати лише один варіант
      setFormData({
          ...formData,
          day: [selectedDay],
      });

      // Закриваємо всі dropdowns
      setDropdowns(() => ({
          hours: false,
          days: false,
          subjects: false,
      }));
  } else {
      setFormData((prevFormData) => {
          const newDays = prevFormData.day.includes(selectedDay)
              ? prevFormData.day.filter((d) => d !== selectedDay)
              : [...prevFormData.day, selectedDay];

          return {
              ...prevFormData,
              day: newDays,
          };
      });
  }
};
