import { useState, useEffect } from "react";
import axios from "axios";
import { StudentRequests } from "../StudentRequests/StudentRequests";
import { TeachingGroups } from "../TeachingGroups";
import { API } from "../../shared/api";

export const StudentsList = () => {
    const [students, setStudents] = useState([]);
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
    
    return (
        <div className="flex flex-col gap-[40px]">
            <h2 className="text-[40px]">Групи та учні</h2>
            <StudentRequests students={students}/>
            <TeachingGroups />
        </div>
    );
};