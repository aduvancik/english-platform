import React, { useEffect, useState } from "react";

import Calendar from "../Calendar/Calendar";
import TodayEventsList from "../TodayEventsList/TodayEventsList";

import { API_ROUTES } from "../../shared/api/api-routes";
import api from "../../api/api";
import { getRecurringDates } from "../../shared/utils/getRecurringDates";
import { Loader } from "../../shared/ui";

const Schedule = () => {
  const [groups, setGroups] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(API_ROUTES.groups.base);
      setGroups(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const startDate = new Date(2025, 2, 3); // Assuming today is March 3, 2025
    const calendarEvents = groups.flatMap((group) =>
      group.timeSlots.flatMap((slot) => {
        const dates = getRecurringDates(slot.dayOfWeek, startDate);
        return dates.map((date) => ({
          title: group.name,
          start: `${date.toISOString().split("T")[0]}T${slot.startAt}`,
          id: `${group.id}-${slot.id}-${date.toISOString().split("T")[0]}`,
          groupId: group.id,
        }));
      })
    );
    setEvents(calendarEvents);
  }, [groups]);

  return (
    <div className="flex flex-col gap-[40px]">
      <h2 className="text-[40px]">Розклад</h2>
      {events.length !== 0 ? <TodayEventsList events={events} /> : <Loader />}
      <Calendar events={events} setEvents={setEvents} />
    </div>
  );
};

export default Schedule;
