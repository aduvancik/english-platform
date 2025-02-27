// import { LabelledAddUserButton, RemoveUserButton } from "../../../shared/ui";
// import { ModalButton } from "../../../shared/ui";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export const StudentInfoModal = ({ openModal, handleCloseModal, student }) => {
    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="absolute top-[50%] left-[50%] w-[450px] max-h-[70%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl px-5 py-8 overflow-auto">
                {student && (
                    <div className="flex flex-col gap-3 text-center">
                        <h4 className="text-[18px] font-bold">
                            Студент {student.firstName} {student.lastName}
                        </h4>
                        <p>
                            <span className="font-bold">Email:</span> {student.email}
                        </p>
                        <p>
                            <span className="font-bold">Рівень мови: </span>
                            {student.languageLevel ? student.languageLevel.name : "-"}
                        </p>
                        {student.studyGroup ? (
                            <p>
                                <span className="font-bold">Група:</span>{" "}
                                {student.studyGroup.name}
                            </p>
                        ) : (
                            <p className="font-bold">Група відсутня</p>
                        )}
                        <div>
                            {student.timeSlots ? (
                                <div>
                                    <span className="font-bold">Розклад:</span>
                                    <ul>
                                        {student.timeSlots &&
                                            student.timeSlots.map((slot) => (
                                                <li key={slot.id}>
                                                    {slot.dayOfWeek}: {slot.startAt}-{slot.endAt}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>No timeslots</p>
                            )}
                        </div>
                    </div>
                )}
            </Box>
        </Modal>
    );
};
