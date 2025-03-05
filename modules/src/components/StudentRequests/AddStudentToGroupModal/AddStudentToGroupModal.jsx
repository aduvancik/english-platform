import { useContext } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ModalButton } from "../../../shared/ui";

import { GroupContext } from "../../../contexts/GroupContextProvider/GroupContext";
import { StudentContext } from "../../../contexts/StudentContextProvider/StudentContext";

export const AddStudentToGroupModal = ({ openModal, handleCloseModal, student }) => {
    const { usersGroups } = useContext(GroupContext);
    const { updateStudent, groupsGenerated } = useContext(StudentContext);

    const handleUpdateStudentsGroup = (groupId) => {
        updateStudent(student.id, groupId);
        handleCloseModal();
    }


    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="absolute top-[50%] left-[50%] w-[450px] max-h-[70%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl px-5 py-8 overflow-auto">
                {groupsGenerated ? (usersGroups ? (
                    <div>
                        <p className="text-xl text-center pb-3">
                            Виберіть групу для студента {student.firstName} {student.lastName}:{" "}
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {usersGroups.map((group) => (
                                <ModalButton
                                    key={group.id}
                                    handleClick={() => handleUpdateStudentsGroup(group.id)}
                                >
                                    {group.name}
                                </ModalButton>
                            ))}
                        </div>
                    </div>
                ) : (
                    "Групи відсутні"
                )) : <p className="text-center">Перш ніж розпочати, згенеруйте групи.</p>}
                
            </Box>
        </Modal>
    );
};
