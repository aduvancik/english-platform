import { useCallback } from "react";

const useSelectLevel = (formData, setFormData, setDropdowns, englishLevels) => {
  return useCallback((level) => {
    const selectedLevel = englishLevels[level];

    if (formData.role === "student") {
      // студент може вибирати лише один варіант
      setFormData({
        ...formData,
        languageLevelId: [selectedLevel],
      });
    } else {
      setFormData((prevFormData) => {
        const newLevels = prevFormData.languageLevelId.includes(selectedLevel)
          ? prevFormData.languageLevelId.filter((lvl) => lvl !== selectedLevel) // Видалення, якщо вибрано повторно
          : [...prevFormData.languageLevelId, selectedLevel]; // Додавання нового рівня

        return {
          ...prevFormData,
          languageLevelId: newLevels,
        };
      });
    }

    if (formData.role === "student") {
      setDropdowns(() => ({
        hours: false,
        days: false,
        subjects: false,
      }));
    }
  }, [formData, setFormData, setDropdowns, englishLevels]);
};

export default useSelectLevel;
