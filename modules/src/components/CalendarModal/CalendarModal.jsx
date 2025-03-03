import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

import api from "../../api/api";
import { API_ROUTES } from "../../shared/api/api-routes";
import { getTimeSlot, getWeekday } from "../../shared/utils/dateFormatting";
import { daysOfWeek, timeSlots } from "../../shared/constants/data";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../Calendar/Calendar.css";

const CalendarModal = ({ selectedEvent, openModal, onClose, onSave }) => {
  const [currentGroup, setCurrentGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedEvent?.groupId) {
        setStudents([]);
        setCurrentGroup(null);
        return;
      }

      try {
        const groupResponse = await api.get(
          `${API_ROUTES.groups.base}/${selectedEvent.groupId}`
        );
        setCurrentGroup(groupResponse.data);

        const studentsResponse = await api.get(API_ROUTES.students);
        const groupStudents = studentsResponse.data.filter(
          (student) => student.studyGroupId === selectedEvent.groupId
        );
        setStudents(groupStudents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedEvent]);

  useEffect(() => {
    if (selectedEvent) {
      setSelectedDay(getWeekday(selectedEvent.start));
      setSelectedTimeSlot(getTimeSlot(selectedEvent.start));
      setIsEditing(false);
    }
  }, [selectedEvent]);

  const handleSave = () => {
    if (selectedEvent) {
      const today = new Date();

      const dayMapping = {
        Неділя: 0,
        Понеділок: 1,
        Вівторок: 2,
        Середа: 3,
        Четвер: 4,
        "П’ятниця": 5,
        Субота: 6,
      };

      const selectedWeekday = dayMapping[selectedDay];
      if (selectedWeekday === undefined) return;

      // Знайдемо найближчу дату, яка відповідає вибраному дню тижня
      const daysUntilEvent = (selectedWeekday - today.getDay() + 7) % 7;
      const eventDate = new Date(today);
      eventDate.setDate(today.getDate() + daysUntilEvent);

      // Розбираємо часовий слот ("12:00-13:00") і додаємо час до eventDate
      const [startTimeStr, _] = selectedTimeSlot.split(" - ");
      const [hours, minutes] = startTimeStr.split(":").map(Number);

      eventDate.setHours(hours, minutes, 0, 0); // Встановлюємо години та хвилини

      // Форматуємо у "YYYY-MM-DDTHH:mm:ss"
      const formattedStart = eventDate.toISOString().split(".")[0]; // Видаляємо мілісекунди

      const updatedEvent = {
        ...selectedEvent,
        start: formattedStart,
      };

      onSave(updatedEvent); // Виклик функції для збереження змін
      onClose(); // Закриття модального вікна
    }
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-[50%] left-[50%] w-[350px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-5 ">
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-center text-[24px]">Деталі заняття</h3>
            <div>
              <h4 className="text-[18px] font-bold">
                Назва групи:{" "}
                <span className="text-violet-800 ">{currentGroup?.name}</span>
              </h4>
              <h4>
                <span className="font-bold">Викладач:</span>{" "}
                {currentGroup?.teacher.firstName}{" "}
                {currentGroup?.teacher.lastName}
              </h4>
              <p className="text-gray-500">
                <span className="font-bold">Рівень:</span>{" "}
                {currentGroup?.languageLevel.name}
              </p>

              <div className="flex justify-between">
                <p>
                  <span className="font-bold">Час уроку:</span>{" "}
                  {getWeekday(selectedEvent?.start)},{" "}
                  {getTimeSlot(selectedEvent?.start)}
                </p>
                <button
                  onClick={() => {
                    setIsEditing(!isEditing);
                  }}
                >
                  <MdOutlineEdit className="fill-violet-600" size="20px" />
                </button>
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-center gap-[24px]">
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="bg-violet-800 text-white px-[4px] py-[8px] rounded-md"
                >
                  {daysOfWeek.map((day) => (
                    <option
                      key={day}
                      value={day}
                      className="bg-white text-black"
                    >
                      {day}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="bg-violet-800 text-white px-[4px] py-[8px] rounded-md"
                >
                  {timeSlots.map((time) => (
                    <option
                      key={time}
                      value={time}
                      className="bg-white text-black"
                    >
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <h4 className="text-violet-800 m-auto w-fit mb-[8px]">
                Учасники
              </h4>
              <ul className="flex flex-col gap-[8px]">
                {students.length > 0 ? (
                  students?.map((student) => (
                    <li key={student.id} className="">
                      <p>
                        {student.firstName} {student.lastName}
                      </p>
                      <span className="block h-[1px] bg-gray-300" />
                    </li>
                  ))
                ) : (
                  <p>В цій группі поки немає студентів</p>
                )}
              </ul>
            </div>

            <div className="flex gap-[4px] justify-end">
              <button
                onClick={onClose}
                className="px-[12px] py-[8px] bg-emerald-500 text-white rounded-md"
              >
                Відхилити
              </button>
              <button
                onClick={() => {
                  handleSave(selectedEvent?.start);
                }}
                className="px-[12px] py-[8px] bg-emerald-500 text-white rounded-md"
              >
                Зберегти
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CalendarModal;
