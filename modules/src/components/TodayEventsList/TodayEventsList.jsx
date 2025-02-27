import React, { useEffect, useState } from "react";
import { API_ROUTES } from "../../shared/api/api-routes";
import api from "../../api/api";

// const data = [
//   {
//     id: 1,
//     name: "High Five",
//     time: "10:00-11:00",
//   },
//   {
//     id: 2,
//     name: "Smart Minds",
//     time: "12:00-13:00",
//   },
//   {
//     id: 3,
//     name: "Fluent Squad",
//     time: "14:00-15:00",
//   },
//   {
//     id: 4,
//     name: "Lingo Masters",
//     time: "16:00-17:00",
//   },
// ];

const TodayEventsList = () => {
  const date = new Date();
  const [day, month, year] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ].map((num) => num.toString().padStart(2, "0"));

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(API_ROUTES.groups.base);
        setGroups(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex gap-[12px] items-baseline">
        <h2 className="text-[32px]">Сьогодні</h2>
        <p>{`${day}-${month}-${year}`}</p>
      </div>
      <ul className="flex flex-col gap-3 w-[432px] p-[24px] bg-white rounded-xl">
        {groups.map((group) => (
          <li key={group.id} className="flex justify-between">
            <p className="font-bold">{group.name}</p>
            <p>{group.teacher.firstName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodayEventsList;
