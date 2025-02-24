import { useState, useEffect, useCallback } from "react";

import { GroupCard } from "../../shared/layout";
import { API_ROUTES } from "../../shared/api/api-routes.js";
import { GroupInfoModal } from "./GroupInfoModal.jsx";
import { BasicButton } from "../../shared/ui/BasicButton.jsx";
import { Loader } from "../../shared/ui/Loader.jsx";
import api from "../../api/api";

const getGroupsWithStudents = (students, groups) => {
    return groups.map((group) => ({
        ...group,
        students: students.filter((student) => student.studyGroupId === group.id),
    }));
};

export const TeachingGroups = ({ students, setGroupsGenerated }) => {
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

    const fetchGroups = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get(API_ROUTES.groups.base); 
            setOriginalGroups(res.data);
            if (res.data && res.data.length > 0) {
                console.log('set true');
                setGroupsGenerated(true);
            }
        } catch (err) {
            console.error("Error fetching groups: ", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [setGroupsGenerated]);
    
    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    useEffect(() => {
        if (originalGroups && students) {
            setGroups(getGroupsWithStudents(students, originalGroups));
        }
    }, [students, originalGroups]);

    useEffect(() => {
        const group = groups.find((group) => group.id === selectedGroupId);
        setSelectedGroup(group);
    }, [groups, selectedGroupId]);

    const generateGroups = async () => {
        setLoading(true);
        console.log("Generating...");
        try {
            const res = await api.post(API_ROUTES.groups.generate);
            if (res.status === 200) {
                console.log(res.data.message);
            }
        } catch (err) {
            console.error("Error generating groups: ", err);
            setError(err);
        } finally {
            fetchGroups();
        }
    };

    // console.log("groups");
    // console.log(groups.length === 0);

    return (
        <div>
            <h3 className="text-[20px]">Moї групи</h3>
            {loading && <Loader />}
            {error && <p>{error.message || "An unexpected error occurred"}</p>}
            {!loading && !error && (
                <>
                    <div>
                        <ul className="flex flex-wrap gap-3 mt-[15px]">
                            {!loading &&
                                groups &&
                                (groups.length === 0 ? (
                                    <div className="flex w-full gap-10 items-center justify-center flex-wrap">
                                        <p>Групи не створено. Бажаєте зробити це зараз?</p>
                                        <BasicButton handleClick={generateGroups}>
                                            Згенерувати групи
                                        </BasicButton>
                                    </div>
                                ) : (
                                    groups.map((group) => (
                                        <GroupCard
                                            key={group.id}
                                            group={group}
                                            selectGroup={setSelectedGroupId}
                                            openModal={handleOpenModal}
                                            studentsAmount={
                                                group.students ? group.students.length : 0
                                            }
                                        />
                                    ))
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
        </div>
    );
};
