//react
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//constans
import { englishLevels, days, hours } from "../shared/constants/data";
//utils function
import { filterTimeSlots } from "../shared/utils/filterTimeSlots";
import { validate } from "../shared/utils/validate";
import { handleChange } from "../shared/utils/handleChange";
import { handleSelectDays } from "../shared/utils/handleSelectDays";
import { handleSelectHour } from "../shared/utils/handleSelectHour";
//hooks
import useSelectLevel from "../shared/hooks/useSelectLevel";
//components
import SelectedDays from "../components/SelectedDays/SelectedDays";
import SelectedHour from "../components/SelectedHour/SelectedHour";
import { renderSelectedLevels } from "../components/renderSelectedLevels/renderSelectedLevels";
import Input from "../components/Input/Input";
import NotificationMessage from "../components/NotificationMessage/NotificationMessage";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
//api
import { API_ROUTES } from "../shared/api/api-routes";
import axios from "axios";

function Register() {
    const location = useLocation();
    const roleIsTeacher = location.state?.roleIsTeacher ?? true;
    const navigate = useNavigate();

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
    const [notification, setNotification] = useState({
        boolean: true,
        message: ""
    });
    const [error, setError] = useState({});
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
                const response = await axios.get(`http://localhost:4000/time-slots`);
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
        console.log("timeSlotIds", filterTimeSlots(responseData, formData.day, formData.hour));


        setFormData((prev) => ({
            ...prev,
            timeSlotIds
        }));
    }, [responseData, formData.day, formData.hour]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsFormSubmitted(true);

        if (!validate(formData, setErrors)) return;

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
                timeSlotIds: formData.timeSlotIds,
            };

        console.log("Data being sent:", JSON.stringify(payload));

        try {
            const { data } = await axios.post(`http://localhost:4000${API_ROUTES.auth.register}`, payload);

            setNotification(prev => ({
                boolean: true,
                message: "Registration successful!"
            }));

            // Можливо, ви хочете перенаправити користувача на іншу сторінку після реєстрації
            navigate("/dashboard");

        } catch (error) {
            console.error("Error sending data:", error.response?.data || error.message);
            setNotification({
                boolean: false,
                message: String(error.response?.data || error.message)
            });
        }
    };


    // Використання у компоненті
    const onInputChange = (e) => handleChange(e, formData, setFormData, errors, setErrors, englishLevels, days, hours);


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
    const handleSelectLevel = useSelectLevel(formData, setFormData, setDropdowns, englishLevels);

    //функція для вибору дня тижня
    const onSelectDay = (day) => handleSelectDays(day, days, formData, setFormData, setDropdowns);


    //функція для вибору годин
    const onSelectHour = (hour) => handleSelectHour(hour, hours, setFormData);

    return (
        <div className="flex items-center h-100vh py-8">
            <NotificationMessage message={notification.message} boolean={notification.boolean} />
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
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={onInputChange}
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
                <button type="submit" className="mx-auto mt-[44px] w-min flex justify-center align-center text-white text-[20px] bg-[#36B889] rounded-[15px] py-[10px] px-[40.5px]">Зареєструватися</button>
            </form>
        </div>
    );

};


export default Register;
