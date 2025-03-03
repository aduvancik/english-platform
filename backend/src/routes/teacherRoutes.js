import express from "express";
import {
    getTeacherById,
    getTeacherStudyGroups,
    patchTeacher,
    updateTeacher,
    deleteTeacher,
    getAllTeachers,
} from "../controllers/teacherController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizationTeacher } from "../middlewares/authorizationTeacher.js";
import { authorizationOwnUserId } from "../middlewares/authorizationOwnUserId.js";

const router = express.Router();

router.get("/", authMiddleware, getAllTeachers);
router.get("/study-groups", authMiddleware, authorizationTeacher, getTeacherStudyGroups);
router.get("/:id", authMiddleware, getTeacherById);
router.patch("/:id", authMiddleware, authorizationTeacher, patchTeacher);
router.put("/:id", authMiddleware, authorizationTeacher, authorizationOwnUserId, updateTeacher);
router.delete("/:id", authMiddleware, authorizationTeacher, authorizationOwnUserId, deleteTeacher);

export default router;
