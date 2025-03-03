import React, { useEffect, useState } from "react";

const TodayEventsList = ({ events }) => {
  const [todayEvents, setTodayEvents] = useState([]);
  const date = new Date();
  const [day, month, year] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ].map((num) => num.toString().padStart(2, "0"));
  const todayStr = `${year}-${month}-${day}`;

  useEffect(() => {
    const filteredEvents = events.filter((event) => {
      const inputDateStr = event.start.split("T")[0];
      return inputDateStr === todayStr;
    });
    setTodayEvents(filteredEvents);
  }, []);

  return (
    <div>
      <div className="flex gap-[12px] items-baseline">
        <h2 className="text-[32px]">Сьогодні</h2>
        <p>{`${day}-${month}-${year}`}</p>
      </div>
      <ul className="flex flex-col gap-3 w-[432px] p-[24px] bg-white rounded-xl">
        {todayEvents.slice(0, 5).map((event) => (
          <li key={event.id} className="flex justify-between">
            <p className="font-bold">{event.title}</p>
            <p>{event.start.split("T")[1].slice(0, 5)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodayEventsList;
