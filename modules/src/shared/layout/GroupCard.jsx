import { OptionButton } from "../ui/";
import { StudentsIcon } from "../icons";

export const GroupCard = ({ group, selectGroup, openModal, studentsAmount }) => {
    const initials = group.name.split(' ').map((word) => word[0]).join('').toUpperCase();
    return (
        <div
            onClick={() => {
                selectGroup(group.id);
                openModal();
            }}
            className="w-[325px] h-[165px] bg-black text-white rounded-xl relative flex flex-col justify-between cursor-pointer"
        >
            <div className="top-0 left-0 absolute w-full h-full z-0 rounded-xl flex justify-center items-center text-6xl">{initials}</div>
            <div className="w-full h-full bg-[rgba(91,43,186,0.5)] text-white rounded-xl relative flex flex-col justify-between z-10">
                <div className="absolute top-2 right-1">
                    <OptionButton />
                </div>

                <div></div>
                <div className="w-full flex items-center justify-between pb-3 px-4">
                    <div className="text-[16px] text-white flex flex-col">
                        <p className="font-bold w-56">{group.name}</p>
                        <p>рівень {group.languageLevel.name}</p>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <p>{studentsAmount}</p>
                        <StudentsIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};
