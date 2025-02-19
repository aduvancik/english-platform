import express from "express";
import {
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} from "../controllers/studentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizationStudent } from "../middlewares/authorizationStudent.js";
import { authorizationOwnUserId } from "../middlewares/authorizationOwnUserId.js";

export const studentRouter = express.Router();

studentRouter.get("/", authMiddleware, getStudents);
studentRouter.get("/:id", authMiddleware, getStudentById);
studentRouter.put("/:id", authMiddleware, authorizationStudent, authorizationOwnUserId, updateStudent);
studentRouter.delete("/:id", authMiddleware, authorizationStudent, authorizationOwnUserId, deleteStudent);
