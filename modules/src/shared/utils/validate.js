export const validate = (formData, setErrors) => {
  const errors = {};
  if (formData.firstName.length < 2 || formData.firstName.length > 50) errors.firstName = "Ім'я має бути від 2 до 50 символів";
  if (formData.lastName.length < 2 || formData.lastName.length > 50) errors.lastName = "Прізвище має бути від 2 до 50 символів";
  if (!formData.email.includes("@") || formData.email.length > 100) errors.email = "Некоректний email";
  if (formData.languageLevelId.length === 0) errors.languageLevelId = "Оберіть рівень англійської";
  if (formData.day.length === 0) errors.day = "Оберіть дні тижня";
  if (formData.hour.length === 0) errors.hour = "Оберіть години";
  if (formData.password.length < 8) errors.password = "Пароль має бути мінімум 8 символів";

  setErrors(errors);
  return Object.keys(errors).length === 0;
};