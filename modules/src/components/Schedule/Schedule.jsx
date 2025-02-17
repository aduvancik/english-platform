import React from "react";
import Calendar from "../Calendar/Calendar";
import TodayEventsList from "../TodayEventsList/TodayEventsList";

const Schedule = () => {
  return (
    <div className="flex flex-col gap-[40px]">
      <h2 className="text-[40px]">Розклад</h2>
      <TodayEventsList />
      <Calendar />
    </div>
  );
};

export default Schedule;
