const colorMap = {
    group: "bg-[#2e165d] text-[#ad95dc]",
    student: "bg-[#154634] text-[#37725c]",
    teacher: "bg-[#4c0026] text-[#98004c]",
};

export const DefaultBackground = ({ title, type }) => {
    const colors = colorMap[type] || "bg-black text-white";
    let initials =
        title
            .split(" ")
            .map((word) => word.match(/[A-Za-z]/g)?.[0] || "")
            .join("")
            .toUpperCase() + (title.match(/\d+/g)?.join("") || "");
    initials = type === "group" ? initials.slice(0, 3) : initials.slice(0, 2);

    return (
        <div
            className={`select-none top-0 left-0 absolute w-full h-full z-0 rounded-xl flex justify-center items-center text-6xl ${colors}`}
        >
            {initials}
        </div>
    );
};
