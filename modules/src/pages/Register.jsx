import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import Input from "../components/Input";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Register() {
    const location = useLocation();
    const roleIsTeacher = location.state?.roleIsTeacher ?? true;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        languageLevelId: [],
        hour: [],
        day: [],
        timeSlotIds: [],
        password: "",
        role: roleIsTeacher ? "teacher" : "student",
        studyGroupId: null
    });

    const [errors, setErrors] = useState({});
    const [responseData, setResponseData] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Стан для перевірки, чи була надіслана форма
    const [dropdowns, setDropdowns] = useState({
        hours: false,
        days: false,
        level: false,
    });

    useEffect(() => {
        const fetchTimeSlots = async () => {
            try {
                const response = await axios.get("http://localhost:4000/time-slots");
                setResponseData(response.data); // зберігаємо отримані тайм слоти в state
            } catch (error) {
                setError("Error fetching time slots"); // обробка помилок

                console.log("Error fetching time slots");
            }
        };

        fetchTimeSlots();
    }, []);
    useEffect(() => {
        if (!responseData.length) return;

        const timeSlotIds = filterTimeSlots(responseData, formData.day, formData.hour);

        setFormData((prev) => ({
            ...prev,
            timeSlotIds
        }));
    }, [responseData, formData.day, formData.hour]);


    const filterTimeSlots = (timeSlots, selectedDays, selectedHours) => {
        return timeSlots
            .filter((slot) => {
                const selectedDaysArray = selectedDays.flatMap(day => day.split(" "));
                const isDayMatch = selectedDaysArray.includes(slot.dayOfWeek);

                const slotStart = slot.startAt.substring(0, 5); // "17:00"
                const slotEnd = slot.endAt.substring(0, 5); // "18:00"

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








    const englishLevels = {
        A1: 1,
        A2: 2,
        B1: 3,
        B2: 4,
        C1: 5,
        C2: 6,
    };

    const days = {
        "понеділок - четвер": "Monday Thursday",
        "вівторок- пятниця": "Tuesday Friday",
        "середа- субота": "Wednesday Saturday",
    };
    const hours = {
        "17:00 - 18:00": "17:00 - 18:00",
        "18:00 - 19:00": "18:00 - 19:00",
        "19:00 - 20:00": "19:00 - 20:00",
        "20:00 - 21:00": "20:00 - 21:00",
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Оновлюємо значення форми
        if (name === "languageLevelId") {
            setFormData({
                ...formData,
                languageLevelId: englishLevels[value] !== undefined ? [englishLevels[value]] : formData.languageLevelId,
            });
        } else if (name === "day") {
            setFormData({
                ...formData,
                day: days[value] !== undefined ? [days[value]] : formData.day,
            });
        } else if (name === "hour") {
            setFormData({
                ...formData,
                hours: days[value] !== undefined ? [hours[value]] : formData.hour,
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
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

        if (name === "languageLevelId") {
            if (!value && value !== 0) {
                updatedErrors.languageLevelId = "Оберіть рівень англійської";
            } else {
                delete updatedErrors.languageLevelId;
            }
        }

        setErrors(updatedErrors);
    };



    const validate = () => {
        const errors = {};
        if (formData.firstName.length < 2 || formData.firstName.length > 50) errors.firstName = "Ім'я має бути від 2 до 50 символів";
        if (formData.lastName.length < 2 || formData.lastName.length > 50) errors.lastName = "Прізвище має бути від 2 до 50 символів";
        if (!formData.email.includes("@") || formData.email.length > 100) errors.email = "Некоректний email";
        if (formData.languageLevelId.length === 0) errors.languageLevelId = "Оберіть рівень англійської";
        if (formData.day.length === 0) errors.day = "Оберіть дні тижня";
        if (formData.hour.length === 0) errors.hour = "Оберіть години";
        if (formData.password.length < 6) errors.password = "Пароль має бути мінімум 6 символів";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        setIsFormSubmitted(true);

        if (!validate()) return;
        console.log("a,", formData.role);

        // Формування payload в залежності від ролі
        const payload = formData.role === "teacher"
            ? {
                role: formData.role,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                languageLevelIds: formData.languageLevelId,
                timeSlotIds: formData.timeSlotIds
            }
            : {
                role: formData.role,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                languageLevelIds: formData.languageLevelId[0],
                password: formData.password,
                studyGroupId: formData.studyGroupId,
                timeSlotIds: formData.timeSlotIds[0],
            };

        console.log("Data being sent:", JSON.stringify(payload)); // Логування відправлених даних

        try {
            // Надсилання запиту на сервер
            const { data } = await axios.post("http://localhost:4000/auth/register", payload);
            console.log("Registration successful:", data);
        } catch (error) {
            console.error("Error sending data:", error.response?.data || error.message);
        }
    };





    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.target.closest('.theme-toggle')) {
            e.preventDefault();
            handleSubmit(e); // Викликаємо обробник відправки
        }
    };


    //закривання відкривання випадаючих списків
    const toggleDropdown = (key) => {
        setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    //функція для вибору рівня англійської
    const handleSelectLevel = (level) => {
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
                    ? prevFormData.languageLevelId.filter((lvl) => lvl !== selectedLevel) // Remove if already selected
                    : [...prevFormData.languageLevelId, selectedLevel]; // Add the new level

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
    };

    //функція для вибору дня тижня
    const handleSelectDays = (day) => {
        const selectedDay = days[day];

        if (formData.role === "student") {
            // студент може вибирати лише один варіант
            setFormData({
                ...formData,
                day: [selectedDay],
            });
        } else {
            setFormData((prevFormData) => {
                const newDays = prevFormData.day.includes(selectedDay)
                    ? prevFormData.languageLevelId.filter((lvl) => lvl !== selectedLevel)
                    : [...prevFormData.day, selectedDay];

                return {
                    ...prevFormData,
                    day: newDays,
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
    };

    //функція для вибору годин
    const handleSelectHour = (hour) => {
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


    //render for level, dey, hour

    const renderSelectedLevels = () => {
        if (formData.role === "student") {
            return formData.languageLevelId.length > 0
                ? Object.keys(englishLevels).find(key => englishLevels[key] === formData.languageLevelId[0])
                : <span className="text-[#A9A9A9]">Обрати рівень</span>;
        } else {
            return formData.languageLevelId.length > 0
                ? formData.languageLevelId.map((level) => (
                    <span key={level} className="text-[#A9A9A9] mr-2">
                        {Object.keys(englishLevels).find(key => englishLevels[key] === level)}
                    </span>
                ))
                : <span className="text-[#A9A9A9]">Обрати рівень</span>;
        }
    };

    const renderSelectedDays = () => {
        if (formData.role === "student") {
            return formData.day.length > 0
                ? Object.keys(days).find(key => days[key] === formData.day[0])
                : <span className="text-[#A9A9A9]">Обрати рівень</span>;
        } else {
            return formData.day.length > 0
                ? formData.day.map((day) => (
                    <span key={day} className="text-[#A9A9A9] mr-2">
                        {Object.keys(days).find(key => days[key] === day)}
                    </span>
                ))
                : <span className="text-[#A9A9A9]">Обрати дні</span>;
        }
    };

    const renderSelectedHour = () => {
        return formData.hour.length > 0
            ? formData.hour.map((hour) => (
                <span key={hour} className="text-[#A9A9A9] mr-2">
                    {Object.keys(hours).find(key => hours[key] === hour)}
                </span>
            ))
            : <span className="text-[#A9A9A9]">Обрати години</span>;
    };

    return (
        <div className="flex items-center h-100vh py-8">
            <form onSubmit={handleSubmit} className="w-full mx-auto rounded-[23px] pt-[50px] max-w-[695px] pb-[95px] bg-[#ffffff] flex flex-col justify-center">
                <h1 className="text-[#141414] font-bold text-[32px] text-center">Реєстрація</h1>
                <ThemeToggle
                    className="mx-auto mt-[45px] mb-[63px]"
                    roleIsTeacher={formData.role === "teacher"} // передаємо статус вчителя/учня
                    onRoleChange={(newRole) =>
                        setFormData((prev) => ({ ...prev, role: newRole ? "teacher" : "student", languageLevelId: [], day: [] }))
                    } />
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
                            onClick={() => toggleDropdown("level")}
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
                                {renderSelectedDays()}
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
                                        onClick={() => handleSelectDays(day)}
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
                                {renderSelectedHour()}
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
                                        onClick={() => handleSelectHour(hour)}
                                    >
                                        {hour}
                                    </div>
                                ))}
                            </div>
                        )}
                        {isFormSubmitted && errors.hour && <span style={{ color: "red" }}>{errors.hour}</span>}
                    </div>

                </div>
                <button type="submit" className="mx-auto mt-[44px] w-min flex justify-center align-center text-white text-[20px] bg-[#36B889] rounded-[15px] py-[10px] px-[40.5px]">Зареєструватися</button>
            </form>
        </div>
    );

};


export default Register;
