import { NavLink } from "react-router-dom";
import { BackButton, SidebarButton } from "../../shared/ui";
import Logo from "../Logo/Logo";

export const Sidebar = () => {
    return (
        <div className="w-[20%] pt-3 bg-white h-full fixed flex flex-col">
            <div className="flex items-center justify-around mb-10">
                <Logo />
                <BackButton />
            </div>
            <div className="flex flex-col gap-1">
                <NavLink to="/dashboard/groups">
                    {({ isActive }) => (
                        <SidebarButton isActive={isActive} className={isActive ? "bg-gray-200" : ""}>
                            Групи та учні
                        </SidebarButton>
                    )}
                </NavLink>
                <NavLink to="/dashboard/schedule">
                    {({ isActive }) => (
                        <SidebarButton isActive={isActive} className={isActive ? "bg-gray-200" : ""}>
                            Розклад
                        </SidebarButton>
                    )}
                </NavLink>
                <NavLink to="/dashboard/profile">
                    {({ isActive }) => (
                        <SidebarButton isActive={isActive} className={isActive ? "bg-gray-200" : ""}>
                            Профіль
                        </SidebarButton>
                    )}
                </NavLink>
                <NavLink to="/dashboard/support">
                    {({ isActive }) => (
                        <SidebarButton isActive={isActive} className={isActive ? "bg-gray-200" : ""}>
                            Підтримка
                        </SidebarButton>
                    )}
                </NavLink>
            </div>
        </div>
    );
};
