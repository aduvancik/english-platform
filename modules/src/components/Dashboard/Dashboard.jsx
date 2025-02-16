import { Sidebar } from "../SideBar";

export const Dashboard = ({ children }) => {
    return (
        <div className="flex px-5 pt-5">
            <Sidebar />
            <div className="w-[75%] ml-[80px]">{children}</div>
        </div>
    );
};
