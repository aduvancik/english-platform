import express from "express";
import {
    getStudents,
    getStudentById,
    patchStudent,
    updateStudent,
    deleteStudent,
} from "../controllers/studentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizationStudent } from "../middlewares/authorizationStudent.js";
import { authorizationOwnUserId } from "../middlewares/authorizationOwnUserId.js";

export const studentRouter = express.Router();

studentRouter.get("/", authMiddleware, getStudents);
studentRouter.get("/:id", authMiddleware, getStudentById);
studentRouter.patch("/:id", authMiddleware, patchStudent);
studentRouter.put("/:id", authMiddleware, updateStudent);
studentRouter.delete("/:id", authMiddleware, authorizationStudent, authorizationOwnUserId, deleteStudent);
