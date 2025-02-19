import express from "express";
import { getTimeSlots } from "../controllers/timeSlotController.js";

export const timeSlotRouter = express.Router();

timeSlotRouter.get("/", getTimeSlots);
