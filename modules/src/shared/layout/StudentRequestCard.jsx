import { AddUserButton } from "../ui/AddUserButton";

export const StudentRequestCard = ({ name, surname, languageLevel }) => {
    const initials = (name[0] + surname[0]).toUpperCase();
    return (
        <div className="w-[130px] h-[170px] rounded-xl relative bg-black">
            <div className="top-0 left-0 absolute w-full h-full z-0 rounded-xl bg-[rgba(39,132,99,0.84)] text-[#5ab896f0] flex justify-center items-center text-6xl">{initials}</div>
            <div className="w-full h-full rounded-xl relative bg-[rgba(0,0,0,0.37)] z-10">
                <div className="absolute top-1 right-1">
                    <AddUserButton color="#ffffff" />
                </div>
                <div className="text-[16px] h-full text-white flex flex-col justify-end pb-3 pl-3">
                    <p className="font-bold text-center w-3.5">
                        {name} {surname}
                    </p>
                    <p>рівень {languageLevel}</p>
                </div>
            </div>
        </div>
    );
};
