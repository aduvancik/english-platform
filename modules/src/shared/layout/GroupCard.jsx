import { OptionButton } from "../ui/";
import { StudentsIcon } from "../icons";
import { DefaultBackground } from "./DefaultBackground";

export const GroupCard = ({ group, selectGroup, openModal, studentsAmount }) => {
    return (
        <div
            onClick={() => {
                selectGroup();
                openModal();
            }}
            className="w-[325px] h-[165px] text-white rounded-xl relative flex flex-col justify-between cursor-pointer"
        >
            <DefaultBackground title={group.name} type='group' />
            <div className="w-full h-full text-white rounded-xl relative flex flex-col justify-between z-10">
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
