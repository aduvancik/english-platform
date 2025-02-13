import { LanguageLevel, Student, StudyGroup } from "../models/index.js";
import { hashSha256 } from "../utils/hashUtil.js";
import { studentSchema } from "../utils/validationSchemas.js";
import { ValidationError } from "yup";

export const createStudent = async (req, res) => {
    try {
        await studentSchema.validate(req.body);

        const {
            firstName,
            lastName,
            email,
            password,
            languageLevel: { name: languageLevelName },
            studyGroup: { name: studyGroupName },
        } = req.body;
        const passwordHash = hashSha256(password);

        const languageLevel = await LanguageLevel.findOne({
            where: {
                name: languageLevelName,
            },
        });
        if (!languageLevel) {
            return res.status(400).json({ message: `Language level ${languageLevelName} not found` });
        }

        const studyGroup = await StudyGroup.findOne({
            where: {
                name: studyGroupName,
            },
        });
        if (!studyGroup) {
            return res.status(400).json({ message: `Study group ${studyGroupName} not found` });
        }

        await Student.create({
            firstName,
            lastName,
            email,
            passwordHash,
            LanguageLevelId: languageLevel.id,
            StudyGroupId: studyGroup.id,
        });

        return res.status(201).json({ message: "Student created" });
    } catch (er) {
        if (er instanceof ValidationError) {
            return res.status(400).json({ message: "Validation error" });
        }
        return res.status(500).json({ messsage: er.message });
    }
};

export const getStudentById = async (req, res) => {
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
        return res.status(500).json({ message: er.message });
    }
};

export const getStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            include: [LanguageLevel, StudyGroup],
        });

        return res.status(200).json(students);
    } catch (er) {
        return res.status(500).json({ message: er.message });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const { firstName, lastName, email, password } = req.body;
        const passwordHash = hashSha256(password);

        const [updatedCount] = await Student.update(
            { firstName, lastName, email, passwordHash },
            {
                where: {
                    id,
                },
            },
        );

        if (!updatedCount) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({ message: "Student updated" });
    } catch (er) {
        return res.status(500).json({ message: er.message });
    }
};

export const deleteStudent = async (req, res) => {
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
        return res.status(500).json({ message: er.message });
    }
};
