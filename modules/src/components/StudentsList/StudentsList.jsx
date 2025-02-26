import { useState, useEffect, useCallback } from "react";
import { StudentRequests } from "../StudentRequests/StudentRequests";
import { TeachingGroups } from "../TeachingGroups";
import { API_ROUTES } from "../../shared/api/api-routes.js";
import { Loader } from "../../shared/ui";
import api from "../../api/api";

export const StudentsList = () => {
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

    return (
        <div className="flex flex-col gap-[40px]">
            <h2 className="text-[40px]">Групи та учні</h2>
            {loading && <Loader />}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                    <TeachingGroups students={students} setGroupsGenerated={setGroupsGenerated} />
                    <StudentRequests students={students} groupsGenerated={groupsGenerated} />
                </>
            )}
        </div>
    );
};
