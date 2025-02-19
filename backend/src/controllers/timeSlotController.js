import { TimeSlot } from "../models/index.js";

export const getTimeSlots = async (req, res, next) => {
    try {
        const timeSlots = await TimeSlot.findAll();

        return res.status(200).json(timeSlots);
    } catch (er) {
        next(er);
    }
};
