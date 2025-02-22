import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../Calendar/Calendar.css";

const names = [
  { id: 1, firstName: "Anna", lastName: "Kovalchuk" },
  { id: 2, firstName: "Dmytro", lastName: "Shevchenko" },
  { id: 3, firstName: "Oksana", lastName: "Ivanenko" },
  { id: 4, firstName: "Yurii", lastName: "Petryk" },
  { id: 5, firstName: "Sofia", lastName: "Tkachenko" },
  { id: 6, firstName: "Oleksandr", lastName: "Bondarenko" },
  { id: 7, firstName: "Natalia", lastName: "Hrytsenko" },
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const timeSlots = [
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
];

const CalendarModal = ({ selectedEvent, openModal, onClose }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  useEffect(() => {
    if (selectedEvent) {
      setSelectedDay(getWeekday(selectedEvent._instance?.range.start));
      setSelectedTimeSlot(
        selectedEvent._instance?.range
          ? getTimeSlot(
              selectedEvent._instance.range.start,
              selectedEvent._instance.range.end
            )
          : ""
      );
      console.log(selectedEvent);
    }
  }, [selectedEvent]);

  const getTimeSlot = (start, end) => {
    if (start && end) {
      const options = { hour: "2-digit", minute: "2-digit" };
      return `${start.toLocaleTimeString(
        "uk-UA",
        options
      )}-${end.toLocaleTimeString("uk-UA", options)}`;
    }
    return "час не вказано";
  };

  const getWeekday = (date) => {
    if (date) {
      return date.toLocaleDateString("uk-UA", { weekday: "long" });
    }
    return "день не вказано";
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
              <h4 className="text-[18px]">
                Назва групи:{" "}
                <span className="text-violet-800 font-bold">
                  {selectedEvent?._def?.title}
                </span>
              </h4>
              <p className="text-gray-500">Рівень: А1</p>
            </div>
            <div className="flex justify-center gap-[24px]">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="bg-violet-800 text-white px-[4px] py-[8px] rounded-md"
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day} className="bg-white text-black">
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
            <div>
              <h4 className="text-violet-800 m-auto w-fit mb-[8px]">
                Учасники
              </h4>
              <ul className="flex flex-col gap-[6px]">
                {names.map((student) => (
                  <li key={student.id} className="">
                    <p>
                      {student.firstName} {student.lastName}
                    </p>
                    <span className="block h-[1px] bg-gray-300" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-[4px] justify-end">
              <button className="px-[12px] py-[8px] bg-emerald-500 text-white rounded-md">
                Відхилити
              </button>
              <button className="px-[12px] py-[8px] bg-emerald-500 text-white rounded-md">
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
