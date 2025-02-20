export const handleSelectHour = (hour, hours, setFormData) => {
  const selectedHour = hours[hour];

  setFormData((prevFormData) => {
      const newHours = prevFormData.hour.includes(selectedHour)
          ? prevFormData.hour.filter((hr) => hr !== selectedHour)
          : [...prevFormData.hour, selectedHour];

      return {
          ...prevFormData,
          hour: newHours,
      };
  });
};
