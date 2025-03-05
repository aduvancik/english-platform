import { useState, useContext } from "react";
import { StudentRequestCard } from "../../shared/layout";
import { LabelledAddUserButton } from "../../shared/ui";
import { StudentInfoModal } from "./StudentInfoModal";
import { AddStudentToGroupModal } from "./AddStudentToGroupModal";
import { StudentContext } from "../../contexts/StudentContextProvider/StudentContext";

export const StudentRequests = ({ ref }) => {
    const { students, groupsGenerated } = useContext(StudentContext);

    const [selectedStudent, setSelectedStudent] = useState({});

    const [openStudentInfoModal, setOpenStudentInfoModal] = useState(false);
    const handleOpenStudentInfoModal = () => setOpenStudentInfoModal(true);
    const handleCloseStudentInfoModal = () => setOpenStudentInfoModal(false);

    const [openAddStudentModal, setOpenAddStudentModal] = useState(false);
    const handleOpenAddStudentModal = () => setOpenAddStudentModal(true);
    const handleCloseAddStudentModal = () => setOpenAddStudentModal(false);

    const renderedStudents = students
        .filter((student) => !groupsGenerated || (groupsGenerated && !student.studyGroup))
        .map((student) => (
            <StudentRequestCard
                key={student.id}
                id={student.id}
                name={student.firstName}
                surname={student.lastName}
                languageLevel={student.languageLevel.name}
                openStudentInfoModal={handleOpenStudentInfoModal}
                openAddStudentModal={handleOpenAddStudentModal}
                selectStudent={() => setSelectedStudent(student)}
            />
        ));

    return (
        <>
            <div className="flex flex-col gap-3" ref={ref}>
                <div className="flex justify-between">
                    <h3 className="text-[20px]">Нові запити ({renderedStudents.length})</h3>
                    <LabelledAddUserButton label={"Додати до групи"}></LabelledAddUserButton>
                </div>
                <ul className="flex gap-3 flex-wrap">
                    {renderedStudents.length > 0 ? renderedStudents : <p>Запитів немає.</p>}
                </ul>
            </div>
            <div>
                <StudentInfoModal
                    openModal={openStudentInfoModal}
                    handleCloseModal={handleCloseStudentInfoModal}
                    student={selectedStudent}
                />
            </div>
            <div>
                <AddStudentToGroupModal
                    openModal={openAddStudentModal}
                    handleCloseModal={handleCloseAddStudentModal}
                    student={selectedStudent}
                />
            </div>
        </>
    );
};
