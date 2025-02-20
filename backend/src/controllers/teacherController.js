import { Teacher } from "../models/index.js";
import { hashSha256 } from "../utils/hashUtil.js";
import { teacherSchema } from "../utils/validationSchemas.js";

export const createTeacher = async (req, res, next) => {
    try {
        await teacherSchema.validate(req.body);

        const { firstName, lastName, email, password, languageLevelIds, timeSlotIds } = req.body;

        const passwordHash = hashSha256(password);

        const teacher = await Teacher.create({
            firstName,
            lastName,
            email,
            passwordHash,
        });
        await teacher.addLanguageLevels(languageLevelIds);
        await teacher.addTimeSlots(timeSlotIds);

        return res.status(201).json({ message: "Teacher created" });
    } catch (er) {
        next(er);
    }
};

export const getTeacherById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findByPk(id);

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        return res.status(200).json(teacher);
    } catch (er) {
        next(er);
    }
};

export const deleteTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findByPk(id);

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        await teacher.destroy();
        return res.status(200).json({ message: "Teacher deleted" });
    } catch (er) {
        next(er);
    }
};

export const updateTeacher = async (req, res, next) => {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;

    try {
        const teacher = await Teacher.findByPk(id);

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        teacher.firstName = firstName || teacher.firstName;
        teacher.lastName = lastName || teacher.lastName;
        teacher.email = email || teacher.email;

        if (password) {
            teacher.passwordHash = hashSha256(password);
        }

        await teacher.save();
        return res.status(200).json({ message: "Teacher updated" });
    } catch (er) {
        next(er);
    }
};

export const getAllTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.findAll();
        return res.status(200).json(teachers);
    } catch (er) {
        next(er);
    }
};
