import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import CalendarModal from "../CalendarModal/CalendarModal";
import { API_ROUTES } from "../../shared/api/api-routes";
import api from "../../api/api";

import "../Calendar/Calendar.css";

import schedule from "./groups.json";

const Calendar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: studentsData } = await api.get(API_ROUTES.students);
      setStudents(studentsData);
      const { data } = await api.get(API_ROUTES.groups);
      setGroups(data);
      console.log(studentsData, data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const calendarEvents = schedule.flatMap((group) =>
      group.schedule.map((schedule) => ({
        title: group.name,
        start: schedule.date,
        id: group.id,
      }))
    );
    setEvents(calendarEvents);
  }, []);

  const handleEventClick = (clickInfo) => {
    const localTime = new Date(clickInfo.event.start).toLocaleString();
    console.log("Локальний час:", localTime);
    setSelectedEvent(clickInfo.event);
    const lesson = schedule.find(
      (group) => group.id == clickInfo.event?._def.publicId
    );
    setCurrentLesson(lesson);
    setOpenModal(true);
    console.log(lesson);
  };

  const handleSaveEvent = (updatedEvent) => {
    // Оновлення івенту в стані events
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    setSelectedEvent(null);
  };

  return (
    <div className="">
      <h3 className="text-[32px]">Календар занять</h3>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        timeZone="local"
        viewClassNames="h-[582px] p-[24px] bg-white shadow-lg rounded-xl"
        slotMinTime="12:00:00"
        slotMaxTime="18:00:00"
        slotDuration="00:20"
        slotLabelInterval="01:00"
        droppable={false}
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
        lesson={currentLesson}
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveEvent}
      ></CalendarModal>
    </div>
  );
};

export default Calendar;
