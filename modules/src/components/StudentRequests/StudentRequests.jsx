import { StudentRequestCard } from "../../shared/layout";
import { LabelledAddUserButton } from "../../shared/ui";

export const StudentRequests = () => {
    return (
        <div className="flex flex-col gap-3 w-[415px]">
            <div className="flex justify-between">
                <h3 className="text-[20px]">Нові запити</h3>
                <LabelledAddUserButton label={"Додати до групи"}></LabelledAddUserButton>
            </div>
            <ul className="flex gap-3">
                <StudentRequestCard />
                <StudentRequestCard />
                <StudentRequestCard />
            </ul>
        </div>
    );
};
