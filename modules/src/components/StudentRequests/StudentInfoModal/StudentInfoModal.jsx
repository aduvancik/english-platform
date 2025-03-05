// import { LabelledAddUserButton, RemoveUserButton } from "../../../shared/ui";
// import { ModalButton } from "../../../shared/ui";

import { translateTimeSlotDay } from "../../../shared/utils/translateTimeSlotDay";
import { formatTime } from "../../../shared/utils/formatTime";

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
                    <div>
                        <h4 className="text-[20px] font-[600] text-center pb-5">
                            {student.firstName} {student.lastName}
                        </h4>
                        <div className="flex justify-center gap-[20px]">
                            <div className="text-right flex flex-col gap-[15px]">
                                <p>Рівень: </p>
                                <p>Група: </p>
                                <p>Обрані дні:</p>
                                <p>Обрані години:</p>
                            </div>
                            <div className="flex flex-col gap-[15px] text-[#36B889] font-[600]">
                                <p>{student.languageLevel ? student.languageLevel.name : "-"}</p>
                                <p>{student.studyGroup ? student.studyGroup.name : "відсутня"}</p>
                                <>
                                    {student.timeSlots ? (
                                        <>
                                            {student.timeSlots.map((slot) => (
                                                <span
                                                    key={slot.id}
                                                    className="text-[#36B889] font-[600]"
                                                >
                                                    {translateTimeSlotDay(slot.dayOfWeek)}
                                                </span>
                                            ))}

                                            {student.timeSlots.map((slot) => (
                                                <span
                                                    key={slot.id}
                                                    className="text-[#36B889] font-[600]"
                                                >
                                                    {formatTime(slot.startAt)}
                                                </span>
                                            ))}
                                        </>
                                    ) : (
                                        <p>Немає розкладу</p>
                                    )}
                                </>
                            </div>
                        </div>
                    </div>
                )}
            </Box>
        </Modal>
    );
};
