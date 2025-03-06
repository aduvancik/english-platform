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
        function createTimeSlotKey(timeSlotIds) {
            return timeSlotIds.sort((a, b) => a - b).join("-");
        }

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

        const studentGroups = {};
        for (const student of students) {
            const studentSlotIds = student.TimeSlots.map(ts => ts.id);
            const key = createTimeSlotKey(studentSlotIds);
            const langLevelId = student.languageLevelId;

            if (!studentGroups[langLevelId]) {
                studentGroups[langLevelId] = {};
            }

            if (!studentGroups[langLevelId][key]) {
                studentGroups[langLevelId][key] = [];
            }

            studentGroups[langLevelId][key].push(student);
        }

        const teacherGroups = {};
        for (const teacher of teachers) {
            const teacherSlotIds = teacher.TimeSlots.map(ts => ts.id);
            const key = createTimeSlotKey(teacherSlotIds);

            for (const langLevelObj of teacher.LanguageLevels) {
                const langLevelId = langLevelObj.id;
                if (!teacherGroups[langLevelId]) {
                    teacherGroups[langLevelId] = {};
                }

                if (!teacherGroups[langLevelId][key]) {
                    teacherGroups[langLevelId][key] = [];
                }

                teacherGroups[langLevelId][key].push(teacher);
            };
        }

        const teacherLoad = new Map();
        for (const teacher of teachers) {
            teacherLoad.set(teacher.id, 0);
        }

        await StudyGroup.destroy({ where: {} });

        let count = 0;

        for (const [langLevelKey, groupsByKey] of Object.entries(studentGroups)) {
            const langLevelId = parseInt(langLevelKey);
            for (const [studentTimeSlotKey, studentsArray] of Object.entries(groupsByKey)) {
                if (studentsArray.length === 0) continue;

                const studentTimeSlotIds = studentTimeSlotKey.split("-").map(slot => parseInt(slot));
                const teacherGroup = teacherGroups[langLevelId] || {};
                let eligibleTeachers = [];

                for (const [key, teachers] of Object.entries(teacherGroup)) {
                    const teacherTimeSlotIds = key.split("-").map(slot => parseInt(slot));
                    if (studentTimeSlotIds.every(slotId => teacherTimeSlotIds.includes(slotId))) {
                        eligibleTeachers = teachers;
                    }
                }

                if (eligibleTeachers.length === 0) continue;

                let selectedTeacher = eligibleTeachers[0];
                let minLoad = teacherLoad.get(selectedTeacher.id);

                for (const teacher of eligibleTeachers) {
                    const load = teacherLoad.get(teacher.id);
                    if (load < minLoad) {
                        minLoad = load;
                        selectedTeacher = teacher;
                    }
                }

                teacherLoad.set(selectedTeacher.id, teacherLoad.get(selectedTeacher.id) + 1);

                const group = await StudyGroup.create({
                    name: `Group ${++count}`,
                    teacherId: selectedTeacher.id,
                    languageLevelId: langLevelId,
                });

                await group.addTimeSlots(studentTimeSlotIds);

                const studentIds = studentsArray.map(s => s.id);
                await Student.update(
                    { studyGroupId: group.id },
                    { where: { id: studentIds } },
                );
            }
        }

        res.status(200).json({ message: "Study groups generated" });
    } catch (er) {
        next(er);
    }
};
