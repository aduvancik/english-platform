import express from "express";
import {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} from "../controllers/studentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const studentRouter = express.Router();

studentRouter.post("/", createStudent);
studentRouter.get("/", authMiddleware, getStudents);
studentRouter.get("/:id", authMiddleware, getStudentById);
studentRouter.put("/:id", updateStudent);
studentRouter.delete("/:id", deleteStudent);
