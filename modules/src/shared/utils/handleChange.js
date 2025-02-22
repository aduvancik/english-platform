export const handleChange = (e, formData, setFormData, errors, setErrors, englishLevels, days, hours) => {
    const { name, value } = e.target;
    console.log("lala", formData);

    // Оновлення formData
    const updatedFormData = { ...formData };

    if (name === "languageLevelId") {
        updatedFormData.languageLevelId = englishLevels[value] !== undefined ? [englishLevels[value]] : formData.languageLevelId;
    } else if (name === "day") {
        updatedFormData.day = days[value] !== undefined ? [days[value]] : formData.day;
    } else if (name === "hour") {
        updatedFormData.hours = hours[value] !== undefined ? [hours[value]] : formData.hours;
    } else {
        updatedFormData[name] = value;
    }

    setFormData(updatedFormData);

    // Оновлення errors
    let updatedErrors = { ...errors };

    if (name === "firstName") {
        updatedErrors.firstName = value.length < 2 || value.length > 50 ? "Ім'я має бути від 2 до 50 символів" : undefined;
    }

    if (name === "lastName") {
        updatedErrors.lastName = value.length < 2 || value.length > 50 ? "Прізвище має бути від 2 до 50 символів" : undefined;
    }

    if (name === "email") {
        updatedErrors.email = !value.includes("@") || value.length > 100 ? "Некоректний email (макс. 100 символів)" : undefined;
    }

    if (name === "password") {
        updatedErrors.password = value.length < 6 ? "Пароль має містити щонайменше 6 символів" : undefined;
    }

    if (name === "languageLevelId") {
        updatedErrors.languageLevelId = !value && value !== 0 ? "Оберіть рівень англійської" : undefined;
    }

    // Видаляємо undefined помилки
    Object.keys(updatedErrors).forEach(key => {
        if (updatedErrors[key] === undefined) delete updatedErrors[key];
    });

    setErrors(updatedErrors);
};
