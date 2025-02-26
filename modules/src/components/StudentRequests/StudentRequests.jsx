import { useState } from "react";
import { StudentRequestCard } from "../../shared/layout";
import { LabelledAddUserButton } from "../../shared/ui";
import { StudentInfoModal } from "./StudentInfoModal";

export const StudentRequests = ({ students, groupsGenerated }) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({});
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const renderedStudents = students
        .filter((student) => !groupsGenerated || (groupsGenerated && !student.studyGroup))
        .map((student) => (
            <StudentRequestCard
                key={student.id}
                name={student.firstName}
                surname={student.lastName}
                languageLevel={student.languageLevel.name}
                openModal={handleOpenModal}
                selectStudent={() => setSelectedStudent(student)}
            />
        ));

    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <h3 className="text-[20px]">Нові запити ({renderedStudents.length})</h3>
                    <LabelledAddUserButton label={"Додати до групи"}></LabelledAddUserButton>
                </div>
                <ul className="flex gap-3 flex-wrap">
                    {renderedStudents.length > 0 ? renderedStudents : <p>Запитів немає.</p>}
                </ul>
            </div>
            <div>
                <StudentInfoModal openModal={openModal} handleCloseModal={handleCloseModal} student={selectedStudent}/>
            </div>
        </>
    );
};
