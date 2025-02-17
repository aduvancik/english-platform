import { useState, useEffect } from "react";
import axios from "axios";
import { StudentRequests } from "../StudentRequests/StudentRequests";
import { TeachingGroups } from "../TeachingGroups";
import { API } from "../../shared/api";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const getGroups = (students) => {
    const groups = [];

    for (const student of students) {
        if (!groups.some((group) => group.id === student.StudyGroup.id)) {
            groups.push(student.StudyGroup);
        }
    }

    return groups;
};

const getAdditionalGroupsInfo = (groups, students) => {
    const groupsInfo = [];

    let currentGroup = {};

    for (const group of groups) {
        currentGroup.id = group.id;
        currentGroup.group = group;
        currentGroup.students = [];
        for (const student of students) {
            if (student.StudyGroupId === group.id) {
                currentGroup.students.push(student);
            }
        }

        groupsInfo.push(currentGroup);
        currentGroup = {};
    }

    console.log(groupsInfo);
    return groupsInfo;
};

export const StudentsList = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState({});
    const handleOpenModal = () => {
        const group = groupsInfo.find((group) => group.id === selectedGroupId);
        setSelectedGroup(group);
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);

    const [groupsInfo, setGroupsInfo] = useState([]);

    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get(`http://localhost:4000${API.students}`);
                setStudents(res.data);
            } catch (err) {
                console.error("Error fetching students:", err);
                setError("Failed to fetch students");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    useEffect(() => {
        if (students.length > 0) {
            setGroups(getGroups(students));
        }
    }, [students]);

    useEffect(() => {
        if (groups && students) {
            setGroupsInfo(getAdditionalGroupsInfo(groups, students));
        }
    }, [groups, students]);

    useEffect(() => {
        if (selectedGroupId && groupsInfo.length > 0) {
            const group = groupsInfo.find((group) => group.id === selectedGroupId);
            setSelectedGroup(group);
        }
    }, [selectedGroupId, groupsInfo]);

    return (
        <>
            <div className="flex flex-col gap-[40px]">
                <h2 className="text-[40px]">Групи та учні</h2>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && groups && (
                    <>
                        <StudentRequests students={students} />
                        <TeachingGroups
                            groups={groups}
                            selectGroup={setSelectedGroupId}
                            openModal={handleOpenModal}
                        />
                    </>
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
                        {selectedGroup && selectedGroup.group ? (
                            <>
                                <div className="text-center">
                                    <h2 className="font-raleway font-bold">
                                        {selectedGroup.group.name}
                                    </h2>
                                    <p>Рівень {selectedGroup.group.id}</p>
                                </div>
                                <div className="mt-4">
                                    <p className="pb-3">Учні</p>
                                    <ul>
                                        {selectedGroup.students &&
                                        selectedGroup.students.length > 0 ? (
                                            selectedGroup.students.map((student) => (
                                                <li key={student.id}>{student.firstName} {student.lastName}</li>
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
