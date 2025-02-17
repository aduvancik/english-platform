import { Outlet } from "react-router-dom";
import { Sidebar } from "../SideBar";

export const Dashboard = ({ children }) => {
  return (
    <div className="flex mx-5 mt-5">
      <Sidebar />
      <div className="w-[75%] ml-[80px]">
        {children}
        <Outlet />
      </div>
    </div>
  );
};
