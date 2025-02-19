import { useState, useEffect } from "react";

import { GroupCard } from "../../shared/layout";
import { API_ROUTES } from "../../shared/api/api-routes.js";
import api from "../../api/api";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const getGroupsWithStudents = (students, groups) => {
    const groupsWithStudents = groups;

    for (const groupKey in groups) {
        const studentsInGroup = [];
        for (const student of students) {
            if (student.studyGroupId === groups[groupKey].id) {
                studentsInGroup.push(student);
            }
        }
        groups[groupKey].students = studentsInGroup;
    }

    console.log(groupsWithStudents);
    return groupsWithStudents;
};

export const TeachingGroups = ({ students }) => {
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState({});
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await api.get(API_ROUTES.groups);
                console.log(res.data);
                setGroups(res.data);
            } catch (err) {
                console.error("Error fetching groups: ", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    useEffect(() => {
        if (groups && students) {
            setGroups(getGroupsWithStudents(students, groups));
        }
    }, [students, groups]);

    useEffect(() => {
        const group = groups.find((group) => group.id === selectedGroupId);
        setSelectedGroup(group);
    }, [groups, selectedGroupId])
    
    console.log(selectedGroupId);
    console.log(selectedGroup);
    return (
        <>
            <div>
                <h3 className="text-[20px]">Moї групи</h3>
                {loading && <p>Завантаження...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <ul className="flex flex-wrap gap-3 mt-[15px]">
                        {!loading &&
                            groups.map((group) => (
                                <GroupCard
                                    key={group.id}
                                    group={group}
                                    selectGroup={setSelectedGroupId}
                                    openModal={handleOpenModal}
                                />
                            ))}
                    </ul>
                )}
            </div>
            <div>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="absolute top-[50%] left-[50%] w-[450px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-5">
                        {selectedGroup ? (
                            <>
                                <div className="text-center">
                                    <h2 className="font-raleway font-bold">
                                        {selectedGroup.name}
                                    </h2>
                                    <p>Рівень {selectedGroup.id}</p>
                                </div>
                                <div className="mt-4">
                                    <p className="pb-3">Учні</p>
                                    <ul>
                                        {selectedGroup.students &&
                                        selectedGroup.students.length > 0 ? (
                                            selectedGroup.students.map((student) => (
                                                <li key={student.id}>
                                                    {student.firstName} {student.lastName}
                                                </li>
                                            ))
                                        ) : (
                                            <p>Немає учнів</p>
                                        )}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <p>Завантаження...</p>
                        )}
                    </Box>
                </Modal>
            </div>
        </>
    );
};
