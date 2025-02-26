import { useState } from "react";
import { LabelledAddUserButton, RemoveUserButton } from "../../../shared/ui";
import { ModalButton } from "../../../shared/ui";
import "./custom.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export const GroupInfoModal = ({ openModal, handleCloseModal, group }) => {
    const [showTimeSlots, setShowTimeSlots] = useState(false);
    const toggleTimeSlots = () => {
        setShowTimeSlots((prev) => !prev);
    }

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="group-info-modal absolute top-[50%] left-[50%] w-[450px] max-h-[70%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-5 overflow-auto">
                {group ? (
                    <>
                        <div className="text-center">
                            <h4 className="font-bold text-xl">{group.name}</h4>
                            <p>Рівень {group.languageLevel.name}</p>
                        </div>

                        <div className="text-center my-3">
                            {group.TimeSlots ? (
                                <div>
                                    <ModalButton handleClick={toggleTimeSlots}>{showTimeSlots ? "Заховати" : "Показати"} розклад</ModalButton>
                                    {showTimeSlots && (
                                        <ul>
                                            {group.TimeSlots.map((slot) => (
                                                <li key={slot.id}>
                                                    {slot.dayOfWeek}: {slot.startAt}-{slot.endAt}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                "Розклад відсутній"
                            )}
                        </div>

                        <div className="mt-4">
                            {group.students && group.students.length > 0 ? (
                                <>
                                    <p className="pb-[15px]">Учні</p>
                                    <ul className="text-[15px]">
                                        {group.students.map((student) => (
                                            <div key={student.id}>
                                                <div className="flex justify-between px-4">
                                                    <li key={student.id}>
                                                        {student.firstName} {student.lastName}
                                                    </li>
                                                    <RemoveUserButton />
                                                </div>
                                                <hr className="block mt-1 mb-3" />
                                            </div>
                                        ))}
                                        <LabelledAddUserButton
                                            label="додати учня"
                                            color="#5b2bba"
                                            customStyles="px-4 justify-between font-bold"
                                        />
                                    </ul>

                                    <div className="text-[12px] mt-6">
                                        <p>*мінімальна кількість учнів - 3</p>
                                        <p>*максимальна кількість учнів - 7</p>
                                    </div>
                                </>
                            ) : (
                                <p>Немає учнів</p>
                            )}
                        </div>

                        <div className="pt-10 flex justify-end px-4 gap-3">
                            <ModalButton>Відхилити</ModalButton>
                            <ModalButton>Зберегти</ModalButton>
                        </div>
                    </>
                ) : (
                    <p>Завантаження...</p>
                )}
            </Box>
        </Modal>
    );
};
