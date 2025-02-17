import { generateToken } from "../utils/tokenUtil.js";
import { Student } from "../models/student.js";
import { Teacher } from "../models/teacher.js";
import { hashSha256 } from "../utils/hashUtil.js";

import { createStudent } from "./studentController.js";
import { createTeacher } from "./teacherController.js";

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, languageLevelId } = req.body;

        if (!["student", "teacher"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        if (role === "student" && !languageLevelId) {
            return res.status(400).json({ message: "Language level is required for students" });
        }

        if (role === "student") {
            return createStudent(req, res);
        } else if (role === "teacher") {
            return createTeacher(req, res);
        }
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error registering user" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await Student.findOne({ where: { email } });
        if (!user) {
            user = await Teacher.findOne({ where: { email } });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordHash = hashSha256(password); 
        if (user.passwordHash !== passwordHash) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return res.status(200).json({ user, token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error logging in user" });
    }
};
