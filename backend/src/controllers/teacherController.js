import { LanguageLevel, StudyGroup, Teacher, TimeSlot } from "../models/index.js";
import { hashSha256 } from "../utils/hashUtil.js";
import { createTeacherSchema, patchTeacherSchema } from "../utils/validationSchemas.js";

export const createTeacher = async (req, res, next) => {
    try {
        console.log(req.body);
        await createTeacherSchema.validate(req.body);

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
        const { fields } = req.query;

        const attributes = fields ? fields.split(",") : undefined;

        const teacher = await Teacher.findByPk(id,
            {
                attributes,
                include: [LanguageLevel, StudyGroup,
                    {
                        model: TimeSlot,
                        through: { attributes: [] },
                    },
                ],
            },
        );

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        return res.status(200).json(teacher);
    } catch (er) {
        next(er);
    }
};

export const getTeacherStudyGroups = async (req, res, next) => {
    try {
        const teacherId = req.user.id;

        const studyGroups = await StudyGroup.findAll(
            {
                attributes: { exclude: ["teacherId", "languageLevelId"] },
                where: { teacherId },
                include: [LanguageLevel,
                    {
                        model: TimeSlot,
                        through: { attributes: [] },
                    },
                ],
            },
        );

        return res.status(200).json(studyGroups);
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

export const patchTeacher = async (req, res, next) => {
    try {
        await patchTeacherSchema.validate(req.body);

        const data = req.body;
        const { id } = req.params;

        await Teacher.update(
            data,
            {
                where: { id },
            },
        );

        let teacher;

        if ("languageLevelIds" in data) {
            teacher = await Teacher.findByPk(id);
            await teacher.setLanguageLevels(data.languageLevelIds);
        }

        if ("timeSlotIds" in data) {
            teacher = teacher || await Teacher.findByPk(id);
            await teacher.setTimeSlots(data.timeSlotIds);
        }

        return res.status(200).json({ message: "Teacher updated" });
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
        const teachers = await Teacher.findAll({
            include: [LanguageLevel, StudyGroup,
                {
                    model: TimeSlot,
                    through: { attributes: [] },
                },
            ],
        });
        return res.status(200).json(teachers);
    } catch (er) {
        next(er);
    }
};
