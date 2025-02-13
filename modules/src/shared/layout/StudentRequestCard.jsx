import { AddUserButton } from "../ui/AddUserButton";

export const StudentRequestCard = () => {
    return (
        <div className="w-[130px] h-[170px] bg-white rounded-xl relative">
            <div className="absolute top-1 right-1">
                <AddUserButton />
            </div>
        </div>
    );
};
