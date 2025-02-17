import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);

  // const handleClick= () => {
  //     setIsEdit(!isEdit);
  // }

  const handleSelect = (selectionInfo) => {
    console.log("one slote choosed");
    const start = selectionInfo.startStr.slice(11, 16); // Витягуємо годину (HH:MM)
    const end = selectionInfo.endStr.slice(11, 16);
    const day = selectionInfo.start.toLocaleDateString("en-US", {
      weekday: "long",
    });
    console.log(start, end, day);

    setSelectedSlots((prev) => [...prev, { day, time: `${start}-${end}` }]);
    console.log(selectedSlots);
  };

  const timeSlots = [
    [
      "12:00-13:00",
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
      "16:00-17:00",
      "17:00-18:00",
    ],
  ];

  //   const filteredSlots = selectedSlots.filter(({ time }) =>
  //     timeSlots[0].includes(time)
  //   );

  return (
    <div>
      <h3 className="text-[32px]">Календар занять</h3>
      {/* 
      <button
        type="button"
        onClick={() => setIsEdit(!isEdit)}
        className={
          "bg-emerald-500 text-white mb-4 rounded-lg px-8 py-2 transition duration-300 ease-in-out hover:bg-emerald-600 shadow-lg shadow-emerald-500/50"
        }
      >
        Редагувати
      </button> */}
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        slotMinTime="12:00:00"
        slotMaxTime="18:00:00"
        slotLabelInterval="01:00"
        slotDuration="01:00"
        viewClassNames="h-[500px] bg-white p-[24px] rounded-xl"
        dayCellClassNames={""}
        slotLaneClassNames={"h-[50px]"}
        // eventClassNames={"bg-pink-400"}
        // moreLinkClassNames={"bg-emerald-400"}

        dayHeaderClassNames={"bg-emerald-400"}
        slotLabelClassNames={"bg-emerald-400 font-[24px]"}
        allDayClassNames="border-emerald-600"
        weekNumberClassNames={"bg-emerald-400"}
        nowIndicatorClassNames={"bg-yellow-400"}
        headerToolbar={{
          left: "prev,next today", // Navigation buttons
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay", // Buttons for views
        }}
        selectable={isEdit}
        select={handleSelect}
        themeSystem="bootstrap5"
      />
    </div>
  );
};

export default Calendar;
// selectedSlots.map(({ day, time }) => ({
//         title: "Вільний слот",
//         start: `2024-02-19T${time.split("-")[0]}:00`,
//         end: `2024-02-19T${time.split("-")[1]}:00`,
//       }))
