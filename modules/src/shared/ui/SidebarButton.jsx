export const SidebarButton = ({children, isActive}) => {
    return <button className={`h-[40px] w-full rounded-xl py-[5px] px-[20px] font-[400] text-left text-[20px] ${isActive ? "bg-[#36b889]" : "bg-transparent"}`}>{children}</button>
}