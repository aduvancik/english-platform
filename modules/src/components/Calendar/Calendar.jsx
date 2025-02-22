import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import CalendarModal from "../CalendarModal/CalendarModal";
import { API_ROUTES } from "../../shared/api/api-routes";

import "../Calendar/Calendar.css";

const Calendar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([
    { id: "1", title: "High Five", start: "2025-02-17T12:00:00+02:00" },
    { id: "2", title: "Golden Eagles", start: "2025-02-17T17:00:00" },
    { id: "3", title: "Crazy Frogs", start: "2025-02-18T14:00:00" },
    { id: "5", title: "Bright Stars", start: "2025-02-19T16:00:00" },
    { id: "7", title: "High Five", start: "2025-02-20T12:00:00" },
    { id: "8", title: "Golden Eagles", start: "2025-02-20T17:00:00" },
    { id: "9", title: "Crazy Frogs", start: "2025-02-21T14:00:00" },
    { id: "11", title: "Bright Stars", start: "2025-02-22T16:00:00" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: studentsData } = await axios.get(
        `http://localhost:4000${API_ROUTES.students}`
      );
      setStudents(studentsData);
      const { data } = await axios.get(
        `http://localhost:4000${API_ROUTES.groups}`
      );
      setGroups(data);
      console.log(studentsData, data);
    };
    fetchData();
  }, []);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setOpenModal(true);
    // console.log(clickInfo.event);
  };

  const handleCloseModal = () => setOpenModal(false);

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
        editable={true}
        events={events}
        eventClick={handleEventClick}
        nowIndicatorClassNames="bg-emerald-400 text-pink-500"
        headerToolbar={{
          left: "prev today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay next",
        }}
      />
      <CalendarModal
        selectedEvent={selectedEvent}
        openModal={openModal}
        onClose={handleCloseModal}
      ></CalendarModal>
    </div>
  );
};

export default Calendar;
