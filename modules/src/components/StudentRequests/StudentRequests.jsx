import { StudentRequestCard } from "../../shared/layout";
import { LabelledAddUserButton } from "../../shared/ui";

export const StudentRequests = ({ students }) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between">
                <h3 className="text-[20px]">Нові запити</h3>
                <LabelledAddUserButton label={"Додати до групи"}></LabelledAddUserButton>
            </div>
            <ul className="flex gap-3 flex-wrap">
                {students.map((student) => (
                    <StudentRequestCard
                        key={student.id}
                        name={student.firstName}
                        surname={student.lastName}
                        languageLevel={student.languageLevel.name}
                    />
                ))}
            </ul>
        </div>
    );
};
