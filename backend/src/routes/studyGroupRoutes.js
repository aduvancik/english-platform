import express from "express";
import {
    createStudyGroup,
    getStudyGroups,
    getStudyGroupById,
    updateStudyGroup,
    deleteStudyGroup,
} from "../controllers/studyGroupController.js";
import { authorizationTeacher } from "../middlewares/authorizationTeacher.js";

export const studyGroupRouter = express.Router();

studyGroupRouter.post("/", createStudyGroup);
studyGroupRouter.get("/", getStudyGroups);
studyGroupRouter.get("/:id", getStudyGroupById);
studyGroupRouter.put("/:id", authorizationTeacher, updateStudyGroup);
studyGroupRouter.delete("/:id", authorizationTeacher, deleteStudyGroup);
