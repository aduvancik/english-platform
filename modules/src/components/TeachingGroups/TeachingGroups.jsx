import { useState, useEffect } from "react";

import { GroupCard } from "../../shared/layout";
import { API_ROUTES } from "../../shared/api/api-routes.js";
import { GroupInfoModal } from "./GroupInfoModal.jsx";
import api from "../../api/api";

const getGroupsWithStudents = (students, groups) => {
    return groups.map((group) => ({
        ...group,
        students: students.filter((student) => student.studyGroupId === group.id),
    }));
};

export const TeachingGroups = ({ students }) => {
    const [groups, setGroups] = useState([]);
    const [originalGroups, setOriginalGroups] = useState([]);
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
                setOriginalGroups(res.data);
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
        if (originalGroups && students) {
            setGroups(getGroupsWithStudents(students, originalGroups));
        }
    }, [students, originalGroups]);

    useEffect(() => {
        const group = groups.find((group) => group.id === selectedGroupId);
        setSelectedGroup(group);
    }, [groups, selectedGroupId]);

    return (
        <>
            {loading && <p>Завантаження...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                    <div>
                        <h3 className="text-[20px]">Moї групи</h3>
                        <ul className="flex flex-wrap gap-3 mt-[15px]">
                            {!loading && groups &&
                                groups.map((group) => (
                                    <GroupCard
                                        key={group.id}
                                        group={group}
                                        selectGroup={setSelectedGroupId}
                                        openModal={handleOpenModal}
                                        studentsAmount={group.students ? group.students.length : 0}
                                    />
                                ))}
                        </ul>
                    </div>
                    <div>
                        <GroupInfoModal
                            openModal={openModal}
                            handleCloseModal={handleCloseModal}
                            group={selectedGroup}
                        />
                    </div>
                </>
            )}
        </>
    );
};
