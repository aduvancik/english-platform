import { useEffect, useState } from "react";
import Input from "../components/Input/Input";
import SelectedDays from "../components/SelectedDays/SelectedDays";
import SelectedHour from "../components/SelectedHour/SelectedHour";
import useSelectLevel from "../shared/hooks/useSelectLevel";
import { handleSelectDays } from "../shared/utils/handleSelectDays";
import { handleSelectHour } from "../shared/utils/handleSelectHour";
import { days, englishLevels, hours } from "../shared/constants/data";
import { handleChange } from "../shared/utils/handleChange";
import { renderSelectedLevels } from "../components/renderSelectedLevels/renderSelectedLevels";

export const ProfilePage = () => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Стан для перевірки, чи була надіслана форма
    const [dropdowns, setDropdowns] = useState({
        hours: false,
        days: false,
        level: false,
    });
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        languageLevelId: [],
        hour: [],
        day: [],
        timeSlotIds: [],
        password: "",
        role: "teacher",
        studyGroupId: null
    });
    const toggleDropdown = (key) => {
        setDropdowns((prev) => {
            const isCurrentlyOpen = prev[key];
            return {
                hours: false,
                days: false,
                level: false,
                [key]: !isCurrentlyOpen, // Закриває, якщо натиснуто повторно
            };
        });
    };

    useEffect(() => {
        // Simulating receiving data from the backend
        const mockBackendData = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            role: "teacher",
            languageLevelId: [1, 2, 3],
            hour: ["17:00 - 18:00"],
            day: ["Monday Thursday"],
            timeSlotIds: [1],
            studyGroupId: 1,
        };

        setFormData(mockBackendData); // Simulate setting the data received from the backend
    }, []);


    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.target.closest('.theme-toggle')) {
            e.preventDefault();
            handleSubmit(e); // Викликаємо обробник відправки
        }
    };

    //функція при зміні даних в інпуті
    const onInputChange = (e) => handleChange(e, formData, setFormData, errors, setErrors, englishLevels, days, hours);

    //функція для вибору рівня англійської
    const handleSelectLevel = useSelectLevel(formData, setFormData, setDropdowns, englishLevels);

    //функція для вибору дня тижня
    const onSelectDay = (day) => handleSelectDays(day, days, formData, setFormData, setDropdowns);


    //функція для вибору годин
    const onSelectHour = (hour) => handleSelectHour(hour, hours, setFormData);

    return (
        <div className="flex flex-col gap-[40px]">
            <h2 className="text-[40px]">Профіль</h2>
            <div className="bg-white w-full py-[60px] px-[184px] flex">
                <div className="max-w-[171px] w-full">
                    <div className="max-w-[171px] w-full h-[214px] rounded-[15px] bg-[#EDEDED]"></div>
                    <button className="flex gap-[8px] mt-[13px] items-center justify-center mx-auto">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.49992 3.1875C8.69552 3.1875 8.85409 3.34607 8.85409 3.54167V13.4583C8.85409 13.6539 8.69552 13.8125 8.49992 13.8125C8.30432 13.8125 8.14575 13.6539 8.14575 13.4583V3.54167C8.14575 3.34607 8.30432 3.1875 8.49992 3.1875Z" fill="#5B2BBA" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.1875 8.49992C3.1875 8.30432 3.34607 8.14575 3.54167 8.14575H13.4583C13.6539 8.14575 13.8125 8.30432 13.8125 8.49992C13.8125 8.69552 13.6539 8.85409 13.4583 8.85409H3.54167C3.34607 8.85409 3.1875 8.69552 3.1875 8.49992Z" fill="#5B2BBA" />
                            <circle cx="8.5" cy="8.5" r="8" stroke="#5B2BBA" />
                        </svg>
                        <p>додати</p>
                    </button>
                </div>
                <div>
                    <div className="pl-[71px] pr-[41px] gap-[25px] flex flex-col">
                        <Input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={onInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Ім'я"
                            error={isFormSubmitted && errors.firstName}
                        />
                        <Input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={onInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Прізвище"
                            error={isFormSubmitted && errors.lastName}
                        />
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Електронна пошта"
                            error={isFormSubmitted && errors.email}
                        />
                        <div className="relative">
                            <div
                                className="w-full border-[#36B889] border-[1px] rounded-[15px] text-[20px] px-[10px] h-[60px] py-[14px] flex justify-between items-center cursor-pointer"
                                onClick={() => toggleDropdown("level")}
                            >
                                <span>
                                    {renderSelectedLevels(formData, englishLevels)}

                                </span>

                                <span className="text-xl">
                                    <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3072 14.4746C11.6385 14.8249 12.0361 15 12.5 15C12.9639 15 13.3615 14.8249 13.6928 14.4746L24.503 3.07356C24.8343 2.72329 25 2.2986 25 1.79947C25 1.30035 24.8343 0.875657 24.503 0.525394C24.1716 0.175131 23.7699 0 23.2977 0C22.8255 0 22.4238 0.175131 22.0924 0.525394L12.5 10.6918L2.90755 0.525394C2.57621 0.175131 2.17445 0 1.70229 0C1.23012 0 0.828363 0.175131 0.497018 0.525394C0.165673 0.875657 0 1.30035 0 1.79947C0 2.2986 0.165673 2.72329 0.497018 3.07356L11.3072 14.4746ZM10.8101 9.64098V13.2137H14.1899V9.64098H10.8101Z" fill={formData.role === "teacher" ? "#5B2BBA" : "#E2379D"} />
                                    </svg>
                                </span>
                            </div>
                            {dropdowns.level && (
                                <div className="absolute w-full h-[150px] overflow-y-scroll bg-white border-[#36B889] border-[1px] rounded-[15px] mt-1 z-10">
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
                            {isFormSubmitted && errors.languageLevelId && <span style={{ color: "red" }}>{errors.languageLevelId}</span>}
                        </div>
                        <div className="relative">
                            <div
                                className="w-full border-[#36B889] border-[1px] rounded-[15px] text-[20px] px-[10px] h-[60px] py-[14px] flex justify-between items-center cursor-pointer"
                                onClick={() => toggleDropdown("days")}
                            >
                                <span>
                                    <SelectedDays formData={formData} days={days} />
                                </span>

                                <span className="text-xl">
                                    <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3072 14.4746C11.6385 14.8249 12.0361 15 12.5 15C12.9639 15 13.3615 14.8249 13.6928 14.4746L24.503 3.07356C24.8343 2.72329 25 2.2986 25 1.79947C25 1.30035 24.8343 0.875657 24.503 0.525394C24.1716 0.175131 23.7699 0 23.2977 0C22.8255 0 22.4238 0.175131 22.0924 0.525394L12.5 10.6918L2.90755 0.525394C2.57621 0.175131 2.17445 0 1.70229 0C1.23012 0 0.828363 0.175131 0.497018 0.525394C0.165673 0.875657 0 1.30035 0 1.79947C0 2.2986 0.165673 2.72329 0.497018 3.07356L11.3072 14.4746ZM10.8101 9.64098V13.2137H14.1899V9.64098H10.8101Z" fill={formData.role === "teacher" ? "#5B2BBA" : "#E2379D"} />
                                    </svg>
                                </span>
                            </div>
                            {dropdowns.days && (
                                <div className="absolute w-full h-[150px] overflow-y-scroll bg-white border-[#36B889] border-[1px] rounded-[15px] mt-1 z-10">
                                    {Object.keys(days).map((day) => (
                                        <div
                                            key={day}
                                            className="px-[10px] py-[14px] cursor-pointer hover:bg-[#f0f0f0]"
                                            onClick={() => onSelectDay(day)}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {isFormSubmitted && errors.day && <span style={{ color: "red" }}>{errors.day}</span>}
                        </div>
                        <div className="relative">
                            <div
                                className="w-full border-[#36B889] border-[1px] rounded-[15px] text-[20px] px-[10px] h-[60px] py-[14px] flex justify-between items-center cursor-pointer"
                                onClick={() => toggleDropdown("hours")}
                            >
                                <span>
                                    <SelectedHour formData={formData} hours={hours} />
                                </span>

                                <span className="text-xl">
                                    <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3072 14.4746C11.6385 14.8249 12.0361 15 12.5 15C12.9639 15 13.3615 14.8249 13.6928 14.4746L24.503 3.07356C24.8343 2.72329 25 2.2986 25 1.79947C25 1.30035 24.8343 0.875657 24.503 0.525394C24.1716 0.175131 23.7699 0 23.2977 0C22.8255 0 22.4238 0.175131 22.0924 0.525394L12.5 10.6918L2.90755 0.525394C2.57621 0.175131 2.17445 0 1.70229 0C1.23012 0 0.828363 0.175131 0.497018 0.525394C0.165673 0.875657 0 1.30035 0 1.79947C0 2.2986 0.165673 2.72329 0.497018 3.07356L11.3072 14.4746ZM10.8101 9.64098V13.2137H14.1899V9.64098H10.8101Z" fill={formData.role === "teacher" ? "#5B2BBA" : "#E2379D"} />
                                    </svg>
                                </span>
                            </div>
                            {dropdowns.hours && (
                                <div className="absolute w-full h-[150px] overflow-y-scroll bg-white border-[#36B889] border-[1px] rounded-[15px] mt-1 z-10">
                                    {Object.keys(hours).map((hour) => (
                                        <div
                                            key={hour}
                                            className="px-[10px] py-[14px] cursor-pointer hover:bg-[#f0f0f0]"
                                            onClick={() => onSelectHour(hour)}
                                        >
                                            {hour}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {isFormSubmitted && errors.hour && <span style={{ color: "red" }}>{errors.hour}</span>}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}