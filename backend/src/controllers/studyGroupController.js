import { Teacher, LanguageLevel, StudyGroup, Student, TimeSlot } from "../models/index.js";
import { studyGroupSchema } from "../utils/validationSchemas.js";

export const createStudyGroup = async (req, res, next) => {
    try {
        await studyGroupSchema.validate(req.body);

        const { name, teacherId, languageLevelId, timeSlotIds } = req.body;

        const studyGroup = await StudyGroup.create({
            name,
            teacherId,
            languageLevelId,
        });
        await studyGroup.addTimeSlots(timeSlotIds);

        return res.status(201).json({ message: "Study group created" });
    } catch (er) {
        next(er);
    }
};

export const getStudyGroupById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const studyGroup = await StudyGroup.findByPk(id, {
            include: [Teacher, LanguageLevel,
                {
                    model: TimeSlot,
                    through: { attributes: [] },
                },
            ],
        });

        if (!studyGroup) {
            return res.status(404).json({ message: "Study group not found" });
        }

        return res.status(200).json(studyGroup);
    } catch (er) {
        next(er);
    }
};

export const getStudyGroups = async (req, res, next) => {
    try {
        const studyGroups = await StudyGroup.findAll({
            include: [Teacher, LanguageLevel,
                {
                    model: TimeSlot,
                    through: { attributes: [] },
                },
            ],
        });

        return res.status(200).json(studyGroups);
    } catch (er) {
        next(er);
    }
};

export const updateStudyGroup = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const [updatedCount] = await StudyGroup.update(
            { name },
            {
                where: {
                    id,
                },
            },
        );

        if (!updatedCount) {
            return res.status(404).json({ message: "Study group not found" });
        }

        return res.status(200).json({ message: "Study group updated" });
    } catch (er) {
        next(er);
    }
};

export const deleteStudyGroup = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedCount = await StudyGroup.destroy({
            where: {
                id,
            },
        });

        if (!deletedCount) {
            return res.status(404).json({ message: "Study group not found" });
        }

        return res.status(200).json({ message: "Study group deleted" });
    } catch (er) {
        next(er);
    }
};

export const generateStudyGroups = async (req, res, next) => {
    try {
        const students = await Student.findAll({
            include: [LanguageLevel,
                {
                    model: TimeSlot,
                    through: { attributes: [] },
                },
            ],
        });
        const teachers = await Teacher.findAll({
            include: [LanguageLevel, {
                model: TimeSlot,
                through: { attributes: [] },
            }],
        });

        await StudyGroup.destroy({ where: {} });

        let count = 0;
        for (const teacher of teachers) {
            const teacherGroups = [];

            for (const languageLevel of teacher.LanguageLevels) {
                const group = await StudyGroup.create({
                    name: `Group ${count++}`,
                    teacherId: teacher.id,
                    languageLevelId: languageLevel.id,
                });
                teacherGroups.push(group);
            }

            const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            const sortedTeacherSlots = teacher.TimeSlots.sort((a, b) => {
                const timeComparison = a.startAt.localeCompare(b.startAt);
                if (timeComparison !== 0) {
                    return timeComparison;
                }
                return dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek);
            });

            const totalSlots = sortedTeacherSlots.length;
            const totalTeacherGroups = teacherGroups.length;

            for (let i = 0; i < totalSlots; ++i) {
                const groupIndex = i % totalTeacherGroups;
                await teacherGroups[groupIndex].addTimeSlots([sortedTeacherSlots[i].id]);
            }
        }

        const groups = await StudyGroup.findAll({
            include: [LanguageLevel, TimeSlot],
        });
        let candidateGroups = [];

        for (const student of students) {
            function isSubset(group) {
                const studentTimeSlotIds = student.TimeSlots.map(slot => slot.id);
                const groupTimeSlotIds = group.TimeSlots.map(slot => slot.id);

                return studentTimeSlotIds.every(slot => groupTimeSlotIds.includes(slot));
            }

            candidateGroups = groups
                .filter(group => group.languageLevelId === student.languageLevelId)
                .filter(isSubset);

            if (candidateGroups.length === 0) {
                continue;
            }

            let targetGroup = candidateGroups[0];
            for (const group of candidateGroups) {
                const groupStudentCount = await Student.count({
                    where: {
                        studyGroupId: group.id,
                    },
                });
                const targetGroupStudentCount = await Student.count({
                    where: {
                        studyGroupId: targetGroup.id,
                    },
                });

                if (groupStudentCount < 3) {
                    targetGroup = group;
                    break;
                }

                if (groupStudentCount < targetGroupStudentCount) {
                    targetGroup = group;
                }
            }

            await student.update({ studyGroupId: targetGroup.id });
        }

        return res.status(200).json({ message: "Study groups generated" });
    } catch (er) {
        next(er);
    }
};
