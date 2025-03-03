// import { Sequelize } from "sequelize";
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

        const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        function sortHelperTimeSlots(a, b) {
            const timeComparison = a.startAt.localeCompare(b.startAt);
            if (timeComparison !== 0) {
                return timeComparison;
            }

            return dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek);
        }

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

            const teacherTimeSlots = teacher.TimeSlots.sort(sortHelperTimeSlots);

            const totalSlots = teacherTimeSlots.length;
            const totalTeacherGroups = teacherGroups.length;

            for (let i = 0; i < totalSlots; ++i) {
                const groupIndex = i % totalTeacherGroups;
                await teacherGroups[groupIndex].addTimeSlots([teacherTimeSlots[i].id]);
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

            let finalGroup = candidateGroups[0];
            for (const group of candidateGroups) {
                const groupStudentCount = await Student.count({
                    where: {
                        studyGroupId: group.id,
                    },
                });
                const finalGroupStudentCount = await Student.count({
                    where: {
                        studyGroupId: finalGroup.id,
                    },
                });

                if (groupStudentCount < 3) {
                    finalGroup = group;
                    break;
                }

                if (groupStudentCount < finalGroupStudentCount) {
                    finalGroup = group;
                }
            }

            await student.update({ studyGroupId: finalGroup.id });
        }

        // Divide groups into smaller ones
        const maxGroupSize = 7;

        for (const group of groups) {
            const studentGroupCount = await Student.count({
                where: { studyGroupId: group.id },
            });

            if (studentGroupCount < 8) {
                continue;
            }

            const newSubGroups = [];
            const totalSubGroups = Math.ceil(studentGroupCount / maxGroupSize);

            for (let i = 0; i < totalSubGroups; ++i) {
                const subGroup = await StudyGroup.create({
                    name: `${group.name} - Subgroup ${i + 1}`,
                    teacherId: group.teacherId,
                    languageLevelId: group.languageLevelId,
                });
                newSubGroups.push(subGroup);
            }

            const studyGroupTimeSlots = group.TimeSlots.sort(sortHelperTimeSlots);
            const totalSlots = studyGroupTimeSlots.length;

            for (let i = 0; i < totalSlots; ++i) {
                const subGroupIndex = i % totalSubGroups;
                await newSubGroups[subGroupIndex].addTimeSlots([studyGroupTimeSlots[i].id]);
            }

            const students = await Student.findAll({
                where: {
                    studyGroupId: group.id,
                },
                include: [TimeSlot],
            });

            for (const student of students) {
                for (let i = 0; i < newSubGroups.length; ++i) {
                    const subGroup = await StudyGroup.findByPk(newSubGroups[i].id, {
                        include: [TimeSlot],
                    });

                    const studentSubGroupCount = await Student.count({
                        where: { studyGroupId: subGroup.id },
                    });

                    const studentTimeSlotIds = student.TimeSlots.map(slot => slot.id);
                    const subGroupTimeSlotIds = subGroup.TimeSlots.map(slot => slot.id);

                    const isSubset = studentTimeSlotIds.every(slot => subGroupTimeSlotIds.includes(slot));

                    if (isSubset && studentSubGroupCount < maxGroupSize) {
                        await student.update({ studyGroupId: subGroup.id });
                    }
                }
            }

            await group.destroy();
        }

        return res.status(200).json({ message: "Study groups generated" });
    } catch (er) {
        next(er);
    }
};
