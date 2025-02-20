import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// import { API } from "../../shared/api";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../Calendar/Calendar.css";
import { API_ROUTES } from "../../shared/api/api-routes";

const Calendar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([
    { id: "1", title: "High Five", start: "2025-02-17T12:00:00+02:00" },
    { id: "2", title: "Golden Eagles", start: "2025-02-17T17:00:00" },
    { id: "3", title: "Crazy Frogs", start: "2025-02-18T14:00:00" },
    { id: "5", title: "Bright Stars", start: "2025-02-19T16:00:00" },
    { id: "6", title: "Happy Pandas", start: "2025-02-19T11:00:00" },
    { id: "7", title: "High Five", start: "2025-02-20T12:00:00" },
    { id: "8", title: "Golden Eagles", start: "2025-02-20T17:00:00" },
    { id: "9", title: "Crazy Frogs", start: "2025-02-21T14:00:00" },
    { id: "11", title: "Bright Stars", start: "2025-02-22T16:00:00" },
    { id: "12", title: "Happy Pandas", start: "2025-02-22T11:00:00" },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:4000${API_ROUTES.students}`);
      setStudents(data);
      console.log(data);
    };
    fetchData();
  }, []);

  // Обробка кліку на подію
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setOpenModal(true);
  };
  // Обробка перетягування подій
  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) =>
      event.id === info.event.id
        ? { ...event, start: info.event.startStr }
        : event
    );
    setEvents(updatedEvents);
  };

  const handleCloseModal = () => setOpenModal(false);

  const formatDate = (date) => {
    if (date) {
      const options = { hour: "2-digit", minute: "2-digit" };
      return date.toLocaleTimeString("uk-UA", options);
    }
    return "час не вказано";
  };

  return (
    <div className="">
      <h3 className="text-[32px]">Календар занять</h3>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        viewClassNames="h-[582px] p-[24px] bg-white shadow-lg rounded-xl"
        slotMinTime="12:00:00"
        slotMaxTime="18:00:00"
        slotDuration="00:20"
        slotLabelInterval="01:00"
        editable={true} // Дозволяє змінювати події
        droppable={true} // Дозволяє перетягування
        eventDrop={handleEventDrop} // Викликається після перетягування
        events={events} // Передаємо масив подій
        eventClick={handleEventClick} // Викликається після click
        nowIndicatorClassNames="bg-emerald-400 text-pink-500"
        headerToolbar={{
          left: "prev today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay next",
        }}
      />
      <div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] w-[350px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-5 ">
            <h3 className="text-center text-[24px] mb-[10px]">
              Деталі заняття
            </h3>
            <h4 className="text-[18px]">
              Назва групи:{" "}
              <span className="text-violet-800 font-bold">
                {selectedEvent?._def?.title}
              </span>
            </h4>
            <p className="text-gray-500 mb-[8px]">
              Час виділений на урок:{" "}
              <span>
                {formatDate(selectedEvent?._instance?.range?.start)} -{" "}
                {formatDate(selectedEvent?._instance?.range?.end)}{" "}
              </span>
            </p>
            <h4 className="text-violet-800 m-auto w-fit mb-[8px]">Учасники</h4>
            <ul className="flex flex-col gap-[6px]">
              {students.map((student) => (
                <li key={student.id} className="">
                  <p>
                    {student.firstName} {student.lastName}
                  </p>
                  <span className="block h-[1px] bg-gray-300" />
                </li>
              ))}
            </ul>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Calendar;
