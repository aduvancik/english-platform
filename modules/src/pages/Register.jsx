import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import Input from "../components/Input";

function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        englishLevel: [],
        password: "",
        role: "teacher",
    });

    const [errors, setErrors] = useState({});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Стан для перевірки, чи була надіслана форма
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Стан для контролю відкриття випадаючого списку

    const englishLevels = {
        A1: 0,
        A2: 1,
        B1: 2,
        B2: 3,
        C1: 4,
        C2: 5,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Оновлюємо значення форми
        setFormData({
            ...formData,
            [name]: name === "englishLevel" ? englishLevels[value] : value,
        });

        // Перевірка полів для помилок
        let updatedErrors = { ...errors };

        if (name === "firstName") {
            if (value.length < 2 || value.length > 50) {
                updatedErrors.firstName = "Ім'я має бути від 2 до 50 символів";
            } else {
                delete updatedErrors.firstName;
            }
        }

        if (name === "lastName") {
            if (value.length < 2 || value.length > 50) {
                updatedErrors.lastName = "Прізвище має бути від 2 до 50 символів";
            } else {
                delete updatedErrors.lastName;
            }
        }

        if (name === "email") {
            if (!value.includes("@") || value.length > 100) {
                updatedErrors.email = "Некоректний email (макс. 100 символів)";
            } else {
                delete updatedErrors.email;
            }
        }

        if (name === "password") {
            if (value.length < 6) {
                updatedErrors.password = "Пароль має містити щонайменше 6 символів";
            } else {
                delete updatedErrors.password;
            }
        }

        if (name === "englishLevel") {
            if (!value && value !== 0) {
                updatedErrors.englishLevel = "Оберіть рівень англійської";
            } else {
                delete updatedErrors.englishLevel;
            }
        }

        setErrors(updatedErrors);
    };



    const validate = () => {
        let errors = {};

        if (formData.firstName.length < 2 || formData.firstName.length > 50) {
            errors.firstName = "Ім'я має бути від 2 до 50 символів";
        }
        if (formData.lastName.length < 2 || formData.lastName.length > 50) {
            errors.lastName = "Ім'я має бути від 2 до 50 символів";
        }
        if (!formData.email.includes("@") || formData.email.length > 100) {
            errors.email = "Некоректний email (макс. 100 символів)";
        }
        if (!formData.englishLevel && formData.englishLevel !== 0) {
            errors.englishLevel = "Оберіть рівень англійської";
        }
        if (formData.password.length < 6) {
            errors.password = "Пароль має містити щонайменше 6 символів";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsFormSubmitted(true); // Встановлюємо статус, що форма була надіслана
        console.log(formData, "handleSubmit");


        if (validate()) {
            console.log("Submitted Data:", formData);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.target.closest('.theme-toggle')) {
            e.preventDefault();
            handleSubmit(e); // Викликаємо обробник відправки
        }
    };


    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    //функція для вибору рівня англійської
    const handleSelectLevel = (level) => {
        const selectedLevel = englishLevels[level];

        if (formData.role === "student") {
            // For student, allow only one level
            setFormData({
                ...formData,
                englishLevel: [selectedLevel], // Store the level as an array with one value
            });
        } else {
            // For teacher, allow multiple levels
            setFormData((prevFormData) => {
                const newLevels = prevFormData.englishLevel.includes(selectedLevel)
                    ? prevFormData.englishLevel.filter((lvl) => lvl !== selectedLevel) // Remove if already selected
                    : [...prevFormData.englishLevel, selectedLevel]; // Add the new level

                return {
                    ...prevFormData,
                    englishLevel: newLevels,
                };
            });
        }

        if (formData.role === "student") {
            setIsDropdownOpen(false); // закрити dropdown після вибору рівня
        }
    };


    const renderSelectedLevels = () => {
        if (formData.role === "student") {
            // Display the selected level for students (single selection)
            return formData.englishLevel.length > 0
                ? Object.keys(englishLevels).find(key => englishLevels[key] === formData.englishLevel[0])
                : <span className="text-[#A9A9A9]">Рівень</span>;
        } else {
            // Display multiple selected levels for teachers
            return formData.englishLevel.length > 0
                ? formData.englishLevel.map((level) => (
                    <span key={level} className="text-[#A9A9A9] mr-2">
                        {Object.keys(englishLevels).find(key => englishLevels[key] === level)}
                    </span>
                ))
                : <span className="text-[#A9A9A9]">Рівень</span>;
        }
    };



    const handleRoleChange = (newRole) => {
        setFormData({
            ...formData,
            role: newRole ? "teacher" : "student",
            englishLevel: []
        });
        console.log(formData, "handleRoleChange");

    };



    return (
        <div className="flex items-center h-100vh py-8">
            <form onSubmit={handleSubmit} className="w-full mx-auto rounded-[23px] pt-[50px] max-w-[695px] pb-[95px] bg-[#ffffff] flex flex-col justify-center">
                <h1 className="text-[#141414] font-bold text-[32px] text-center">Реєстрація</h1>
                <ThemeToggle
                    className="mx-auto mt-[45px] mb-[63px]"
                    isTeacher={formData.role === "teacher"} // передаємо статус вчителя/учня
                    onRoleChange={handleRoleChange}
                />
                <div className="pl-[71px] pr-[41px] gap-[25px] flex flex-col">
                    <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Ім'я"
                        error={isFormSubmitted && errors.firstName}
                    />
                    <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Прізвище"
                        error={isFormSubmitted && errors.lastName}
                    />
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Електронна пошта"
                        error={isFormSubmitted && errors.email}
                    />
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Пароль"
                        error={isFormSubmitted && errors.password}
                    />
                    <div className="relative">
                        <div
                            className="w-full border-[#36B889] border-[1px] rounded-[15px] text-[20px] px-[10px] h-[60px] py-[14px] flex justify-between items-center cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            <span>
                                {renderSelectedLevels()}
                            </span>

                            <span className="text-xl">
                                <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.3072 14.4746C11.6385 14.8249 12.0361 15 12.5 15C12.9639 15 13.3615 14.8249 13.6928 14.4746L24.503 3.07356C24.8343 2.72329 25 2.2986 25 1.79947C25 1.30035 24.8343 0.875657 24.503 0.525394C24.1716 0.175131 23.7699 0 23.2977 0C22.8255 0 22.4238 0.175131 22.0924 0.525394L12.5 10.6918L2.90755 0.525394C2.57621 0.175131 2.17445 0 1.70229 0C1.23012 0 0.828363 0.175131 0.497018 0.525394C0.165673 0.875657 0 1.30035 0 1.79947C0 2.2986 0.165673 2.72329 0.497018 3.07356L11.3072 14.4746ZM10.8101 9.64098V13.2137H14.1899V9.64098H10.8101Z" fill={formData.role === "teacher" ? "#5B2BBA" : "#E2379D"} />
                                </svg>
                            </span>
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute w-full h-[150px] overflow-scroll bg-white border-[#36B889] border-[1px] rounded-[15px] mt-1 z-10">
                                {Object.keys(englishLevels).map((level) => (
                                    <div
                                        key={level}
                                        className="px-[10px] py-[14px] cursor-pointer hover:bg-[#f0f0f0]"
                                        onClick={() => handleSelectLevel(level)}
                                    >
                                        {level}
                                    </div>
                                ))}
                            </div>
                        )}
                        {isFormSubmitted && errors.englishLevel && <span style={{ color: "red" }}>{errors.englishLevel}</span>}
                    </div>

                </div>
                <button type="submit" className="mx-auto mt-[44px] w-min flex justify-center align-center text-white text-[20px] bg-[#36B889] rounded-[15px] py-[10px] px-[40.5px]">Зареєструватися</button>
            </form>
        </div>
    );
}

export default Register;
