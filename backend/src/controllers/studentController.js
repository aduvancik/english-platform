import { LanguageLevel, Student, StudyGroup } from "../models/index.js";
import { hashSha256 } from "../utils/hashUtil.js";
import { studentSchema } from "../utils/validationSchemas.js";

export const createStudent = async (req, res, next) => {
    try {
        await studentSchema.validate(req.body);

        const {
            firstName,
            lastName,
            email,
            password,
            languageLevelId,
            studyGroupId,
        } = req.body;
        const passwordHash = hashSha256(password);

        await Student.create({
            firstName,
            lastName,
            email,
            passwordHash,
            languageLevelId,
            studyGroupId,
        });

        return res.status(201).json({ message: "Student created" });
    } catch (er) {
        next (er);
    }
};

export const getStudentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk(id, {
            include: [LanguageLevel, StudyGroup],
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json(student);
    } catch (er) {
        next(er);
    }
};

export const getStudents = async (req, res, next) => {
    try {
        const students = await Student.findAll({
            include: [LanguageLevel, StudyGroup],
        });

        return res.status(200).json(students);
    } catch (er) {
        next(er);
    }
};

export const updateStudent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { firstName, lastName, email, password } = req.body;
        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        student.firstName = firstName || student.firstName;
        student.lastName = lastName || student.lastName;
        student.email = email || student.email;

        if (password) {
            student.passwordHash = hashSha256(password);
        }

        await student.save();
        return res.status(200).json({ message: "Student updated" });
    } catch (er) {
        next(er);
    }
};

export const deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedCount = await Student.destroy({
            where: {
                id,
            },
        });

        if (!deletedCount) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({ message: "Student deleted" });
    } catch (er) {
        next(er);
    }
};
