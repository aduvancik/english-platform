import express from "express";
import {
    createStudyGroup,
    getStudyGroups,
    getStudyGroupById,
    updateStudyGroup,
    deleteStudyGroup,
    generateStudyGroupsV2,
} from "../controllers/studyGroupController.js";
import { authorizationTeacher } from "../middlewares/authorizationTeacher.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const studyGroupRouter = express.Router();

studyGroupRouter.post("/", authMiddleware, authorizationTeacher, createStudyGroup);
studyGroupRouter.get("/", getStudyGroups);
studyGroupRouter.post("/generate", authMiddleware, authorizationTeacher, generateStudyGroupsV2);
studyGroupRouter.get("/:id", getStudyGroupById);
studyGroupRouter.put("/:id", authMiddleware, authorizationTeacher, updateStudyGroup);
studyGroupRouter.delete("/:id", authMiddleware, authorizationTeacher, deleteStudyGroup);
