import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import CalendarModal from "../CalendarModal/CalendarModal";

import "../Calendar/Calendar.css";

const Calendar = (events) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (clickInfo) => {
    const newSelectedEvent = events?.events.find(
      (event) => event.id == clickInfo.event?._def.publicId
    );
    setSelectedEvent(newSelectedEvent);
    setOpenModal(true);
  };

  const handleSaveEvent = (updatedEvent) => {
    // Put/patch request
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    events.setEvents(updatedEvents);
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
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveEvent}
      ></CalendarModal>
    </div>
  );
};

export default Calendar;
