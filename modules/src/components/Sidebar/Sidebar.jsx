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
                <SidebarButton isActive={true}>Групи та учні</SidebarButton>
                <SidebarButton isActive={false}>Розклад</SidebarButton>
                <SidebarButton isActive={false}>Профіль</SidebarButton>
                <SidebarButton isActive={false}>Підтримка</SidebarButton>
            </div>
        </div>
    );
};
