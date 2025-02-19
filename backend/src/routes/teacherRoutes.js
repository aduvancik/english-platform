import express from "express";
import {
    createTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    getAllTeachers,
} from "../controllers/teacherController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createTeacher);
router.get("/", authMiddleware, getAllTeachers);
router.get("/:id", authMiddleware, getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
