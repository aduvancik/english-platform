import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import './custom.css'

export const Dashboard = () => {
    return (
        <div className="dashboard flex px-5 pt-5 font-raleway custom-dashboard h-screen">
            <Sidebar />
            <div className="ml-[25%] w-[75%]"><Outlet /></div>
        </div>
    );
};
 