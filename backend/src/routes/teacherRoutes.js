import express from "express";
import {
    createTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    getAllTeachers,
} from "../controllers/teacherController.js";

const router = express.Router();

//teacher
router.post("/add-teacher", createTeacher);
router.get("/search-teacher/:id", getTeacherById);
router.put("/update-teacher/:id", updateTeacher);
router.delete("/delete-teacher/:id", deleteTeacher);
router.get("/teachers", getAllTeachers);

export default router;
