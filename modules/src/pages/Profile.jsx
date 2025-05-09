import { useCallback, useEffect, useRef, useState } from "react";
//style
import { motion } from "framer-motion";
//constans
import { days, englishLevels, hours } from "../shared/constants/data";
//components
import Input from "../components/Input/Input";
import AddFile from "../components/AddFile/AddFile";
import SelectedDays from "../components/SelectedDays/SelectedDays";
import SelectedHour from "../components/SelectedHour/SelectedHour";
//function
import { renderSelectedLevels } from "../components/renderSelectedLevels/renderSelectedLevels";
import { handleSelectDays } from "../shared/utils/handleSelectDays";
import { handleSelectHour } from "../shared/utils/handleSelectHour";
import { handleChange } from "../shared/utils/handleChange";
//hooks
import useSelectLevel from "../shared/hooks/useSelectLevel";
//api
import { API_ROUTES } from "../shared/api/api-routes";
import api from "../api/api";
import { getDaysAndHoursFromSlots } from "../shared/utils/getDaysAndHoursFromSlots";
import axios from "axios";
import { parseJwt } from "../shared/utils/parseJwt";
import { Loader } from "../shared/ui";
import { filterTimeSlots } from "../shared/utils/filterTimeSlots";
//jwt


export const ProfilePage = () => {
    //useRef for files input
    const fileInputRefs = {
        fotoProfile: useRef(null),
        certificate: useRef(null),
        diploma: useRef(null),
    };
    //use state
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Стан для перевірки, чи була надіслана форма
    const [students, setStudents] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [responseData, setResponseData] = useState([]);
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
        role: "student",
        studyGroupId: null,
        certificate: [],
        diploma: [],
        fotoProfile: "",
        workExperience: "",
        aboutMe: ""

    });
    const [showInput, setShowInput] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState(null);
    //use effect
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = parseJwt(token);
            if (decodedToken && decodedToken.id) {
                setUserId(decodedToken.id);
                setFormData((prev) => ({ ...prev, role: decodedToken.role }));
            } else {
                console.error('Invalid token:', decodedToken);
            }

            if (userId && decodedToken.role === "student") {
                axios.get(`http://localhost:4000${API_ROUTES.students}/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(response => {
                        const mockBackendData = response.data;
                        console.log("mockBackendData", mockBackendData);

                        // Якщо роль студент: обробка даних для студента
                        setFormData(prevData => ({
                            ...prevData,
                            ...Object.keys(mockBackendData).reduce((acc, key) => {
                                if (mockBackendData[key] !== undefined) {
                                    if (key === "timeSlots") {
                                        // Якщо це timeSlots, беремо тільки id з кожного об'єкта
                                        acc.timeSlotIds = mockBackendData[key].map(slot => slot.id); // Зберігаємо тільки id в timeSlotIds
                                    } else if (key === "languageLevelId") {
                                        acc[key] = Array.isArray(mockBackendData[key])
                                            ? mockBackendData[key]
                                            : [mockBackendData[key]]; // Перетворюємо на масив
                                    } else {
                                        acc[key] = mockBackendData[key];
                                    }
                                }
                                return acc;
                            }, {})
                        }));

                        setLoading(false);  // Завантаження завершено, встановлюємо в false

                    })
                    .catch(error => {
                        setLoading(false);  // Якщо сталася помилка, також завершуємо завантаження

                    }
                    )
            } else if (userId && decodedToken.role === "teacher") {
                console.log("teacher", `http://localhost:4000${API_ROUTES.teachers.base}/${userId}}`);

                axios.get(`http://localhost:4000${API_ROUTES.teachers.base}/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(response => {
                        console.log("response");

                        const mockBackendData = response.data;
                        console.log("mockBackendData", mockBackendData);

                        // Якщо роль вчитель: інша логіка для вчителя
                        setFormData(prevData => ({
                            ...prevData,
                            ...Object.keys(mockBackendData).reduce((acc, key) => {
                                if (mockBackendData[key] !== undefined) {
                                    if (key === "timeSlots") {
                                        // Якщо це timeSlots, беремо тільки id з кожного об'єкта
                                        acc.timeSlotIds = mockBackendData[key].map(slot => slot.id); // Зберігаємо тільки id в timeSlotIds
                                    } else if (key === "languageLevels") {
                                        console.log("languageLevels");

                                        // Додаємо тільки id у formData.languageLevelId
                                        acc.languageLevelId = [
                                            ...(prevData.languageLevelId || []), // Залишаємо вже наявні дані
                                            ...mockBackendData.languageLevels.map(level => level.id) // Додаємо нові id
                                        ];

                                        console.log("mockBackendData.languageLevels, formData.languageLevelId", mockBackendData.languageLevels, acc.languageLevelId);
                                    }
                                    else {
                                        acc[key] = mockBackendData[key];
                                    }
                                }
                                return acc;
                            }, {})
                        }));

                        setLoading(false);  // Завантаження завершено, встановлюємо в false

                    })
                    .catch(error => {
                        setLoading(false);  // Якщо сталася помилка, також завершуємо завантаження

                    }
                    )
            }
        }
    }, [userId]);

    useEffect(() => {

        console.log("formData", formData);
    }, [formData])



    useEffect(() => {
        const fetchTimeSlots = async () => {
            try {
                const response = await axios.get(`http://localhost:4000${API_ROUTES.time_slots}`);
                console.log(response.data);

                if (!response.data || response.data.length === 0) {
                    console.log("No time slots found in API response");
                }

                setResponseData(response.data);
            } catch (error) {
                console.error("Error fetching time slots:", error);
            }
        };

        fetchTimeSlots();
    }, []);

    //функція для відкривання випадайки з годинами днями та левелом анг

    useEffect(() => {
        if (formData.fotoProfile instanceof File) {
            const objectUrl = URL.createObjectURL(formData.fotoProfile);
            setImagePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl); // Очищення URL після оновлення
        }
    }, [formData.fotoProfile]);

    //отримання днів та годин з тайм слоту
    useEffect(() => {
        if (responseData.length > 0 && formData.timeSlotIds.length !== 0) {
            console.log("Перевірка часових слотів:", formData.timeSlotIds);
            getDaysAndHoursFromSlots(responseData, formData.timeSlotIds, setFormData, formData);
        }
    }, [responseData, formData.timeSlotIds]); // Викликається, коли responseData або timeSlotIds змінюються

    useEffect(() => {
        if (!responseData.length) return;
        //шукає відповідні тайм слоти
        const newTimeSlotIds = filterTimeSlots(responseData, formData.day, formData.hour);
        console.log("Часові слоти після фільтрації:", newTimeSlotIds);

        // Перевірка чи змінився масив timeSlotIds
        if (JSON.stringify(newTimeSlotIds) !== JSON.stringify(formData.timeSlotIds)) {
            console.log("Оновлення timeSlotIds:", newTimeSlotIds);
            setFormData((prev) => ({
                ...prev,
                timeSlotIds: newTimeSlotIds
            }));
        }
    }, [formData.day, formData.hour, responseData]); // Викликається, коли змінюється день або година




    //enother code


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

    //files
    const handleFileClick = (field) => {
        console.log("formData", formData);

        if (fileInputRefs[field]?.current) {
            fileInputRefs[field].current.click();
        }
    };

    // Обробка зміни файлів
    const handleFileChange = (event, field) => {
        console.log("formData.fotoProfile", formData.fotoProfile);
        // console.log("event", event);

        if (!event.target || !event.target.files) {
            console.error("No files selected or event target is missing");
            return;
        }

        if (field === "fotoProfile") {
            const file = event.target.files[0];
            if (file) {
                setFormData((prev) => ({
                    ...prev,
                    fotoProfile: file, // Зберігаємо сам файл
                }));
            }
            return
        }

        const files = Array.from(event.target.files); // Array of selected files
        console.log(field, "field");

        setFormData(prev => {
            const updatedFormData = {
                ...prev,
                [field]: [...(prev[field] || []), ...files] // Add new files to the field
            };
            return updatedFormData;
        });

    };

    // Функція для видалення файлів
    const removeFile = (index, field) => {
        if (field === "fotoProfile") {
            setFormData(prev => ({
                ...prev,
                [field]: "" // Просто очищаємо фото
            }));
            setImagePreview(""); // Очищаємо прев'ю
            return;
        }
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index) // Видаляємо файл з правильного поля
        }));
    };


    //оновлення даних про студента

    //при натисканні на кнопку зберегти
    const handleSave = () => {
        const { firstName, lastName, email, languageLevelId, timeSlotIds } = formData;
        console.log(timeSlotIds);

        // Викликаємо функцію для оновлення студента
        updateStudent(firstName, lastName, email, languageLevelId, timeSlotIds); // Використовуємо 0 індекс для `languageLevelId`
    };

    const updateStudent = async (firstName, lastName, email, languageLevelId, timeSlotIds) => {

        const languageLevelIds = languageLevelId;
        const languageLevelIdStudent = languageLevelId[0];
        const updatedData = {
            firstName,
            lastName,
            email,
            [formData.role === "teacher" ? "languageLevelIds" : "languageLevelId"]:
                formData.role === "student" ? languageLevelId : languageLevelIds,
            timeSlotIds
        };
        console.log("updatedData", updatedData);

        try {
            // Створюємо об'єкт з даними для оновлення


            console.log("updatedData", updatedData);
            console.log("lalal");



            // Відправка PATCH запиту на сервер
            const authToken = localStorage.getItem('authToken');
            const url = formData.role === "teacher"
                ? `http://localhost:4000${API_ROUTES.teachers.base}/${userId}`
                : `http://localhost:4000${API_ROUTES.students}/${userId}`;


            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`, // Якщо є токен авторизації
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Не вдалося оновити студента");
            }
            const responseData = await response.json(); // тут може бути порожня відповідь
            console.log(responseData); // перевірка відповіді
            console.log("Student updated:", responseData.message);
        } catch (error) {
            console.error("Помилка при оновленні студента:", error);
        }
    };



    return (
        <div className="flex flex-col gap-[40px]">
            <h2 className="text-[40px]">Профіль</h2>
            {loading && <Loader />}
            {!loading && !error && (

                <div className="bg-white w-full py-[60px] px-[184px]">
                    <div className="flex gap-[142px]">

                        <div className="max-w-[171px] w-full">
                            <div
                                className="relative max-w-[171px] w-full h-[214px] rounded-[15px] bg-[#EDEDED] 
                   flex items-center justify-center overflow-hidden group"
                            >
                                {formData.fotoProfile ? (
                                    <>
                                        <img
                                            src={imagePreview}
                                            alt="Profile"
                                            className="w-full h-full object-cover rounded-[15px]"
                                        />
                                        <button
                                            onClick={() => removeFile(0, "fotoProfile")}
                                            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 
                         group-hover:opacity-100 transition-opacity duration-200"
                                        >
                                            ❌
                                        </button>
                                    </>
                                ) : (
                                    <p className="text-gray-500">Фото</p>
                                )}
                            </div>
                            <div>
                                <div onClick={() => handleFileClick("fotoProfile")}>
                                    <AddFile text="додати" className="w-max mx-auto mt-[13px]" />
                                    <input
                                        type="file"
                                        ref={fileInputRefs.fotoProfile}
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, "fotoProfile")}
                                        accept="image/*"
                                    />
                                </div>

                            </div>
                        </div>
                        <div>
                            <div className="gap-[23px] flex w-[367px]">
                                <div className="gap-[14px] flex flex-col items-end">
                                    <label htmlFor="firstName" className="text-[20px] leading-[35px]">імʼя</label>
                                    <label htmlFor="lastName" className="text-[20px] leading-[35px]">прізвище</label>
                                    <label htmlFor="email" className="text-[20px] leading-[35px] whitespace-nowrap">e-mail</label>
                                    <label htmlFor="firstName" className="text-[20px] leading-[35px]">рівень</label>
                                    <label htmlFor="firstName" className="text-[20px] leading-[35px]">обрані дні</label>
                                    <label htmlFor="firstName" className="text-[20px] leading-[35px] whitespace-nowrap">обрані години</label>
                                </div>
                                <div className="gap-[14px] flex flex-col w-[240px] min-w-[240px]">
                                    <Input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={onInputChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ім'я"
                                        error={isFormSubmitted && errors.firstName}
                                        className={"max-h-[35px] !text-[16px] !rounded-[6px]"}
                                    />
                                    <Input
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={onInputChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Прізвище"
                                        className={"max-h-[35px] !text-[16px] !rounded-[6px]"}
                                        error={isFormSubmitted && errors.lastName}
                                    />
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={onInputChange}
                                        onKeyDown={handleKeyDown}
                                        className={"max-h-[35px] !text-[16px] !rounded-[6px]"}
                                        placeholder="Електронна пошта"
                                        error={isFormSubmitted && errors.email}
                                    />
                                    <div className="relative">
                                        <div
                                            className="w-full border-[#36B889] border-[1px] rounded-[6px] text-[16px] pr-[22px] pl-[10px] h-[35px] py-[14px] flex justify-between items-center cursor-pointer"
                                            onClick={() => toggleDropdown("level")}
                                        >
                                            <span>
                                                {renderSelectedLevels(formData, englishLevels)}

                                            </span>

                                            <span className="text-xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
                                                    <path d="M6.66504 8.88916C6.86035 9.08447 7.09473 9.18213 7.36816 9.18213C7.6416 9.18213 7.87598 9.08447 8.07129 8.88916L14.4434 2.53174C14.6387 2.33643 14.7363 2.09961 14.7363 1.82129C14.7363 1.54297 14.6387 1.30615 14.4434 1.11084C14.248 0.915527 14.0112 0.817871 13.7329 0.817871C13.4546 0.817871 13.2178 0.915527 13.0225 1.11084L7.36816 6.77979L1.71387 1.11084C1.51855 0.915527 1.28174 0.817871 1.00342 0.817871C0.725098 0.817871 0.488281 0.915527 0.292969 1.11084C0.0976562 1.30615 0 1.54297 0 1.82129C0 2.09961 0.0976562 2.33643 0.292969 2.53174L6.66504 8.88916ZM6.37207 6.19385V8.18604H8.36426V6.19385H6.37207Z" fill="#5B2BBA" />
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
                                            className="w-full border-[#36B889]  border-[1px] rounded-[6px] text-[16px] pr-[22px] pl-[10px] h-[35px] flex justify-between items-center cursor-pointer"
                                            onClick={() => toggleDropdown("days")}
                                        >
                                            <span>
                                                <SelectedDays formData={formData} days={days} />
                                            </span>

                                            <span className="text-xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
                                                    <path d="M6.66504 8.88916C6.86035 9.08447 7.09473 9.18213 7.36816 9.18213C7.6416 9.18213 7.87598 9.08447 8.07129 8.88916L14.4434 2.53174C14.6387 2.33643 14.7363 2.09961 14.7363 1.82129C14.7363 1.54297 14.6387 1.30615 14.4434 1.11084C14.248 0.915527 14.0112 0.817871 13.7329 0.817871C13.4546 0.817871 13.2178 0.915527 13.0225 1.11084L7.36816 6.77979L1.71387 1.11084C1.51855 0.915527 1.28174 0.817871 1.00342 0.817871C0.725098 0.817871 0.488281 0.915527 0.292969 1.11084C0.0976562 1.30615 0 1.54297 0 1.82129C0 2.09961 0.0976562 2.33643 0.292969 2.53174L6.66504 8.88916ZM6.37207 6.19385V8.18604H8.36426V6.19385H6.37207Z" fill="#5B2BBA" />
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
                                            className="w-full border-[#36B889] overflow-x-auto border-[1px] rounded-[6px] text-[16px] pr-[22px] pl-[10px] h-[35px] flex justify-between items-center cursor-pointer"
                                            onClick={() => toggleDropdown("hours")}
                                        >
                                            <span>
                                                <SelectedHour formData={formData} hours={hours} />
                                            </span>

                                            <span className="text-xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
                                                    <path d="M6.66504 8.88916C6.86035 9.08447 7.09473 9.18213 7.36816 9.18213C7.6416 9.18213 7.87598 9.08447 8.07129 8.88916L14.4434 2.53174C14.6387 2.33643 14.7363 2.09961 14.7363 1.82129C14.7363 1.54297 14.6387 1.30615 14.4434 1.11084C14.248 0.915527 14.0112 0.817871 13.7329 0.817871C13.4546 0.817871 13.2178 0.915527 13.0225 1.11084L7.36816 6.77979L1.71387 1.11084C1.51855 0.915527 1.28174 0.817871 1.00342 0.817871C0.725098 0.817871 0.488281 0.915527 0.292969 1.11084C0.0976562 1.30615 0 1.54297 0 1.82129C0 2.09961 0.0976562 2.33643 0.292969 2.53174L6.66504 8.88916ZM6.37207 6.19385V8.18604H8.36426V6.19385H6.37207Z" fill="#5B2BBA" />
                                                </svg>
                                            </span>
                                        </div>
                                        {dropdowns.hours && (
                                            <div className="absolute w-full h-[150px] overflow-y-scroll bg-white border-[#36B889] border-[1px] rounded-[6px] mt-1 z-10">
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
                                    </div>

                                </div>

                                {isFormSubmitted && errors.hour && <span style={{ color: "red" }}>{errors.hour}</span>}
                            </div>

                        </div>
                    </div>
                    {formData.role === "teacher" &&
                        <div className="mt-[81px]">
                            <h3 className="text-[20px] mb-[10px]">Про себе:</h3>
                            <Input
                                className="rounded-[15px] h-[62px] px-[10px] py-[15px] text-[16px]"
                                placeholder="написати"
                                onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
                            />
                            <div className="mt-[45px] flex flex-col gap-[24px]">
                                <div>
                                    <div onClick={() => handleFileClick("diploma")}>
                                        <h3 className="text-[20px]">Освіта:</h3>
                                        <AddFile text="додати диплом" className="w-max" />
                                        <input
                                            type="file"
                                            ref={fileInputRefs.diploma}
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, "diploma")}
                                            multiple
                                        />
                                    </div>
                                    <ul className="list-none flex flex-col gap-[10px] mt-[15px]">
                                        {formData.diploma?.map((file, index) => (
                                            <li key={index}>
                                                <a
                                                    href={URL.createObjectURL(file)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {file.name}
                                                </a>
                                                <button onClick={() => removeFile(index, "diploma")}>❌</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div onClick={() => setShowInput(prev => !prev)} className="cursor-pointer">
                                    <h3 className="text-[20px]">Досвід:</h3>
                                    <AddFile text="додати досвід" className="w-max" />
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, height: 0 }}
                                        animate={{ opacity: showInput ? 1 : 0, y: showInput ? 0 : 20, height: showInput ? "auto" : 0 }}
                                        exit={{ opacity: 0, y: 20, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >

                                    </motion.div>

                                </div>
                                {showInput && (
                                    <Input
                                        value={formData.experensive}
                                        onChange={(e) => setFormData({ ...formData, experensive: e.target.value })}
                                        placeholder="Введіть ваш досвід..."
                                        className="w-full p-2 border rounded-lg resize-y min-h-[50px]"
                                    />
                                )}
                                <div>
                                    <div onClick={() => handleFileClick("certificate")}>
                                        <h3 className="text-[20px]">Сертифікати:</h3>
                                        <AddFile text="додати сертифікат" className="w-max" />
                                        <input
                                            type="file"
                                            ref={fileInputRefs.certificate}
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, "certificate")}
                                            multiple
                                        />
                                    </div>
                                    <ul className="list-none flex flex-col gap-[10px] mt-[15px]">
                                        {formData.certificate?.map((file, index) => (
                                            <li key={index}>
                                                <a
                                                    href={URL.createObjectURL(file)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {file.name}
                                                </a>
                                                <button onClick={() => removeFile(index, "certificate")}>❌</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }
                    <button type="button" onClick={handleSave} className="mx-auto mt-[44px] w-min flex justify-center align-center text-white text-[20px] bg-[#36B889] rounded-[15px] py-[10px] px-[40.5px]">Зберегти</button>
                </div>
            )}
        </div >
    )
}