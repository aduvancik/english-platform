import { useState, useEffect, useCallback, useContext } from "react";
import { API_ROUTES } from "../../shared/api/api-routes.js";
import api from "../../api/api";
import { GroupContext } from "./GroupContext.js";
import { StudentContext } from "../StudentContextProvider/StudentContext.js";

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

export const GroupContextProvider = ({ children }) => {
    const { students, setGroupsGenerated } = useContext(StudentContext);
    const [groups, setGroups] = useState([]);
    const [sortedGroups, setSortedGroups] = useState([]);
    const [usersGroups, setUsersGroups] = useState([]);
    const [originalGroups, setOriginalGroups] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const value = {
        groups,
        sortedGroups,
        usersGroups,
        error,
        loading,
        generateGroups        
    };

    return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>;
};
