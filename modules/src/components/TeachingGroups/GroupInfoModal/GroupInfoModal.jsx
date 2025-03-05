import { useState, useContext } from "react";
import { LabelledAddUserButton, RemoveUserButton } from "../../../shared/ui";
import { ModalButton, TimeSlot } from "../../../shared/ui";
import { StudentContext } from "../../../contexts/StudentContextProvider/StudentContext";
import { Loader } from "../../../shared/ui";

import "./custom.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export const GroupInfoModal = ({
    loading,
    error,
    openModal,
    scrollToRequests,
    handleCloseModal,
    group,
}) => {
    const { updateStudent } = useContext(StudentContext);
    const [showTimeSlots, setShowTimeSlots] = useState(false);
    const [removedStudentsList, setRemovedStudentsList] = useState([]);

    const onModalClose = () => {
        setShowTimeSlots(false);
        handleCloseModal();
        setRemovedStudentsList([]);
    };

    const handleSaveGroup = () => {
        removedStudentsList.forEach((student) => {
            updateStudent(student.id);
        });
        onModalClose();
    };

    const handleAddStudent = () => {
        onModalClose();
        scrollToRequests();
    };

    const handleRemoveUser = (student) => {
        setRemovedStudentsList((prev) => [...prev, student]);
    };

    const toggleTimeSlots = () => {
        setShowTimeSlots((prev) => !prev);
    };

    return (
        <Modal
            open={openModal}
            onClose={onModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="group-info-modal absolute top-[50%] left-[50%] w-[450px] max-h-[70%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-5 overflow-auto">
                {loading && <Loader />}
                {error && <p>{error.message || "An unexpected error occurred"}</p>}
                {!loading && !error && group ? (
                    <>
                        <div className="text-center">
                            <h4 className="font-bold text-xl">{group?.name || ""}</h4>
                            <p>Рівень {group?.languageLevel?.name || "не вказано"}</p>
                        </div>

                        <div className="text-center my-3">
                            {group.timeSlots ? (
                                <div>
                                    <ModalButton handleClick={toggleTimeSlots}>
                                        {showTimeSlots ? "Заховати" : "Показати"} розклад
                                    </ModalButton>
                                    {showTimeSlots && (
                                        <ul className="flex flex-wrap justify-center items-center gap-3 p-5">
                                            {group.timeSlots.map((slot) => (
                                                <li key={slot.id}>
                                                    {/* {slot.dayOfWeek}: {slot.startAt}-{slot.endAt} */}
                                                    <TimeSlot day={slot.dayOfWeek} startTime={slot.startAt} />
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
                                                    {!removedStudentsList.includes(student) ? (
                                                        <>
                                                            <li key={student.id}>
                                                                {student.firstName}{" "}
                                                                {student.lastName}
                                                            </li>
                                                            <RemoveUserButton
                                                                onClick={() => {
                                                                    handleRemoveUser(student);
                                                                }}
                                                            />
                                                        </>
                                                    ) : (
                                                        <li
                                                            key={student.id}
                                                            className="text-red-500 line-through"
                                                        >
                                                            {student.firstName} {student.lastName}
                                                        </li>
                                                    )}
                                                </div>
                                                <hr className="block mt-1 mb-3" />
                                            </div>
                                        ))}
                                        <LabelledAddUserButton
                                            onClick={handleAddStudent}
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
                                <>
                                    <p className="text-center">Учнів немає</p>
                                    <LabelledAddUserButton
                                        onClick={handleAddStudent}
                                        label="додати учня"
                                        color="#5b2bba"
                                        customStyles="px-4 justify-between font-bold"
                                    />
                                </>
                            )}
                        </div>

                        <div className="pt-10 flex justify-end px-4 gap-3">
                            <ModalButton handleClick={onModalClose}>Відхилити</ModalButton>
                            <ModalButton handleClick={handleSaveGroup}>Зберегти</ModalButton>
                        </div>
                    </>
                ) : (
                    <p>Завантаження...</p>
                )}
            </Box>
        </Modal>
    );
};
