import { LanguageLevel, Student, StudyGroup, TimeSlot } from "../models/index.js";
import { hashSha256 } from "../utils/hashUtil.js";
import { createStudentSchema, patchStudentSchema } from "../utils/validationSchemas.js";

export const createStudent = async (req, res, next) => {
    try {
        await createStudentSchema.validate(req.body);

        const {
            firstName,
            lastName,
            email,
            password,
            languageLevelId,
            studyGroupId,
            timeSlotIds,
        } = req.body;
        const passwordHash = hashSha256(password);

        const student = await Student.create({
            firstName,
            lastName,
            email,
            passwordHash,
            languageLevelId,
            studyGroupId,
        });
        await student.addTimeSlots(timeSlotIds);

        return res.status(201).json({ message: "Student created" });
    } catch (er) {
        next(er);
    }
};

export const getStudentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { fields } = req.query;

        const attributes = fields ? fields.split(",") : undefined;

        const student = await Student.findByPk(id,
            {
                attributes,
                include: [LanguageLevel, StudyGroup],
            },
        );

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
            include: [LanguageLevel, StudyGroup,
                {
                    model: TimeSlot,
                    through: { attributes: [] },
                },
            ],
        });

        return res.status(200).json(students);
    } catch (er) {
        next(er);
    }
};

export const patchStudent = async (req, res, next) => {
    try {
        await patchStudentSchema.validate(req.body);

        const { id } = req.params;

        const [updatedCount] = await Student.update(
            req.body,
            {
                where: { id },
            },
        );

        if (!updatedCount) {
            return res.status(204).json({ message: "No students were updated" });
        }

        return res.status(200).json({ message: "Student updated" });
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
            return res.status(404).json({ message: "Student not found" });
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
