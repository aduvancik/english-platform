import { StudentRequests } from "../StudentRequests/StudentRequests";
import { TeachingGroups } from "../TeachingGroups";

export const StudentsList = () => {
    return (
        <div className="flex flex-col gap-[40px]">
            <h2 className="text-[40px]">Групи та учні</h2>
            <StudentRequests />
            <TeachingGroups />
        </div>
    );
};
