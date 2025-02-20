import express from "express";
import {
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    getAllTeachers,
} from "../controllers/teacherController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizationTeacher } from "../middlewares/authorizationTeacher.js";
import { authorizationOwnUserId } from "../middlewares/authorizationOwnUserId.js";

const router = express.Router();

router.get("/", authMiddleware, getAllTeachers);
router.get("/:id", authMiddleware, getTeacherById);
router.put("/:id", authMiddleware, authorizationTeacher, authorizationOwnUserId, updateTeacher);
router.delete("/:id", authMiddleware, authorizationTeacher, authorizationOwnUserId, deleteTeacher);

export default router;
