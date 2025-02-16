import express from "express";
import {
    createTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    getAllTeachers,
} from "../controllers/teacherController.js";

const router = express.Router();

router.post("/", createTeacher);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);
router.get("/", getAllTeachers);

export default router;
