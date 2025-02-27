import { useState, useEffect, useCallback, useRef } from "react";

import { GroupCard } from "../../shared/layout";
import { API_ROUTES } from "../../shared/api/api-routes.js";
import { GroupInfoModal } from "./GroupInfoModal";
import { BasicButton } from "../../shared/ui/BasicButton.jsx";
import { Loader } from "../../shared/ui/Loader.jsx";
import api from "../../api/api";

const getGroupsWithStudents = (students, groups) => {
    return groups.map((group) => ({
        ...group,
        students: students.filter((student) => student.studyGroupId === group.id),
    }));
};

function groupByTeacher(groups) {
    const grouped = groups.reduce((acc, group) => {
        const teacherId = group.teacherId;

        if (!acc[teacherId]) {
            acc[teacherId] = {
                teacher: group.teacher,
                groups: [],
            };
        }

        acc[teacherId].groups.push(group);
        return acc;
    }, {});

    return Object.values(grouped);
}

export const TeachingGroups = ({ students, setGroupsGenerated }) => {
    const [groups, setGroups] = useState([]);
    const [sortedGroups, setSortedGroups] = useState([]);
    const [allGroupsDisplayed, setAllGroupsDisplayed] = useState(true);
    const [usersGroups, setUsersGroups] = useState([]);
    // const [groupedByTeachersGroups, setGroupedByTeachersGroups] = useState([]);
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
                setGroupsGenerated(true);
            }
        } catch (err) {
            console.error("Error fetching groups: ", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [setGroupsGenerated]);
    const counter = useRef(0);
    counter.current += 1; 
    console.log(counter.current);

    const fetchTeachersGroups = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get(API_ROUTES.teachers.groups);
            setUsersGroups(getGroupsWithStudents(students, res.data));
        } catch (err) {
            console.error("Error fetching teacher's groups: ", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [students]);
    
    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);
    
    useEffect(() => {
        fetchTeachersGroups();
    }, [fetchTeachersGroups]);

    useEffect(() => {
        if (originalGroups && students) {
            const groupsWithStudents = getGroupsWithStudents(students, originalGroups);
            setGroups(groupsWithStudents);
            setSortedGroups(groupByTeacher(groupsWithStudents));
        }
    }, [students, originalGroups]);

    useEffect(() => {
        const group = groups.find((group) => group.id === selectedGroupId);
        setSelectedGroup(group);
    }, [groups, selectedGroupId]);

    const generateGroups = async () => {
        setLoading(true);
        console.log("Generating groups...");
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
            fetchTeachersGroups();
        }
    };

    return (
        <div>
            {loading && <Loader />}
            {error && <p>{error.message || "An unexpected error occurred"}</p>}
            {!loading && !error && (
                <>
                    <div>
                        <div className="flex gap-5">
                            <BasicButton
                                isActive={allGroupsDisplayed}
                                handleClick={() => {
                                    setAllGroupsDisplayed(true);
                                }}
                            >
                                All groups ({groups ? groups.length : 0})
                            </BasicButton>
                            <BasicButton
                                isActive={!allGroupsDisplayed}
                                handleClick={() => {
                                    setAllGroupsDisplayed(false);
                                }}
                            >
                                My groups ({usersGroups ? usersGroups.length : 0})
                            </BasicButton>
                        </div>
                        <ul className="flex flex-wrap gap-3 mt-[15px]">
                            {!loading &&
                                groups &&
                                sortedGroups &&
                                (groups.length === 0 ? (
                                    <div className="flex w-full gap-10 items-center justify-center flex-wrap">
                                        <p>Групи не створено. Бажаєте зробити це зараз?</p>
                                        <BasicButton handleClick={generateGroups}>
                                            Згенерувати групи
                                        </BasicButton>
                                    </div>
                                ) : allGroupsDisplayed ? (
                                    <div className="flex flex-col w-full gap-10">
                                        {sortedGroups.map((studyGroup) => (
                                            <div key={studyGroup.teacher.id}>
                                                <h4 className="font-bold text-2xl p-3">
                                                    {studyGroup.teacher.firstName}{" "}
                                                    {studyGroup.teacher.lastName}
                                                </h4>
                                                <div className="flex gap-5 flex-wrap">
                                                    {studyGroup.groups.map((group) => (
                                                        <GroupCard
                                                            key={group.id}
                                                            group={group}
                                                            selectGroup={setSelectedGroupId}
                                                            openModal={handleOpenModal}
                                                            studentsAmount={
                                                                group.students
                                                                    ? group.students.length
                                                                    : 0
                                                            }
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    usersGroups.map((group) => (
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
