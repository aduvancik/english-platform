import { generateToken } from "../utils/tokenUtil.js";
import { Student } from "../models/student.js";
import { Teacher } from "../models/teacher.js";
import { hashSha256 } from "../utils/hashUtil.js";

import { createStudent } from "./studentController.js";
import { createTeacher } from "./teacherController.js";

export const registerUser = async (req, res, next) => {
    try {
        const { role } = req.body;

        if (!["student", "teacher"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        if (role === "student") {
            return createStudent(req, res, next);
        } else if (role === "teacher") {
            return createTeacher(req, res, next);
        }
    } catch (er) {
        next(er);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        let user;

        if (!["student", "teacher"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        if (role === "student") {
            user = await Student.findOne({ where: { email } });
        } else if (role === "teacher") {
            user = await Teacher.findOne({ where: { email } });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordHash = hashSha256(password);
        if (user.passwordHash !== passwordHash) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken({
            id: user.id,
            role,
        });

        return res.status(200).json({ token });
    } catch (er) {
        next(er);
    }
};
