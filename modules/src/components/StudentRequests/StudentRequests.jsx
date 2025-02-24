import { StudentRequestCard } from "../../shared/layout";
import { LabelledAddUserButton } from "../../shared/ui";

export const StudentRequests = ({ students, groupsGenerated }) => {
    console.log(groupsGenerated);
    const renderedStudents = students
        .filter((student) => !groupsGenerated || (groupsGenerated && !student.studyGroup))
        .map((student) => (
            <StudentRequestCard
                key={student.id}
                name={student.firstName}
                surname={student.lastName}
                languageLevel={student.languageLevel.name}
            />
        ));
    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between">
                <h3 className="text-[20px]">Нові запити</h3>
                <LabelledAddUserButton label={"Додати до групи"}></LabelledAddUserButton>
            </div>
            <ul className="flex gap-3 flex-wrap">
                {students.length === 0 && <p>Запитів немає.</p>}
                {renderedStudents.length > 0 ? renderedStudents : <p>Запитів немає.</p>}
            </ul>
        </div>
    );
};
