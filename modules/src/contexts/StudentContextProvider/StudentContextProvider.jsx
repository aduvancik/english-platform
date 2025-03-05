import { useState, useEffect, useCallback } from "react";
import { API_ROUTES } from "../../shared/api/api-routes.js";
import api from "../../api/api";
import { StudentContext } from "./StudentContext.js";

export const StudentContextProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groupsGenerated, setGroupsGenerated] = useState(false);

    const fetchStudents = useCallback(async () => {
        try {
            const res = await api.get(API_ROUTES.students);
            setStudents(res.data);
        } catch (err) {
            console.error("Error fetching students:", err);
            setError("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents, groupsGenerated]);

    const updateStudent = async (studentId, studyGroupId = null) => {
        console.log(studentId, studyGroupId);
        try {
            const response = await api.patch(`${API_ROUTES.students}/${studentId}`, {
                studyGroupId,
            });
            console.log("Student updated:", response.data);
        } catch (error) {
            console.error("Error updating student group:", error.response?.data || error.message);
        } finally {
            fetchStudents();
        }
        console.log(`Student ${studentId}, group ${studyGroupId}`);
    };

    const value = {
        students,
        loading,
        error,
        groupsGenerated,
        setGroupsGenerated,
        updateStudent
    };

    return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
};
