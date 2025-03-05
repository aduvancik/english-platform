import { AddUserButton } from "../ui/AddUserButton";
import { DefaultBackground } from "./DefaultBackground";

export const StudentRequestCard = ({
    id,
    name,
    surname,
    languageLevel,
    selectStudent,
    openStudentInfoModal,
    openAddStudentModal,
}) => {
    return (
        <div
            className="w-[130px] h-[170px] rounded-xl relative cursor-pointer"
            onClick={() => {
                selectStudent();
                openStudentInfoModal();
            }}
        >
            <DefaultBackground type="student" title={name + " " + surname} />
            <div className="w-full h-full rounded-xl relative z-10">
                <div className="absolute top-1 right-1">
                    <AddUserButton
                        color="#ffffff"
                        onClick={() => {
                            selectStudent();
                            openAddStudentModal();
                        }}
                    />
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
