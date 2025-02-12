import { Teacher } from "../models/index.js";
import { hashSha256 } from "../utils/hashUtil.js";
import { ValidationError } from "yup";

export const createTeacher = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = hashSha256(password);

    try {
        const newTeacher = await Teacher.create({
            firstName,
            lastName,
            email,
            passwordHash,
        });

        return res.status(201).json(newTeacher);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: "Validation error" });
        }
        return res.status(500).json({ message: "Error creating teacher", error });
    }
};

export const getTeacherById = async (req, res) => {
    const { id } = req.params;

    try {
        const teacher = await Teacher.findByPk(id);

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        return res.status(200).json(teacher);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving teacher", error });
    }
};

export const deleteTeacher = async (req, res) => {
    const { id } = req.params;

    try {
        const teacher = await Teacher.findByPk(id);

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        await teacher.destroy();
        return res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting teacher", error });
    }
};


export const updateTeacher = async (req, res) => {
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
        return res.status(200).json(teacher);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: "Validation error" });
        }
        return res.status(500).json({ message: "Error updating teacher", error });
    }
};


export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        return res.status(200).json(teachers);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving teachers", error });
    }
};
