import { Teacher, LanguageLevel, StudyGroup } from "../models/index.js";

export const createStudyGroup = async (req, res, next) => {
    try {
        const {
            name,
            teacher: {
                id: teacherId,
            },
            languageLevel: {
                name: languageLevelName,
            },
        } = req.body;

        const teacher = await Teacher.findOne({
            where: {
                id: teacherId,
            },
        });
        if (!teacher) {
            return res.status(400).json({ message: `Teacher with id ${teacherId} not found` });
        }

        const languageLevel = await LanguageLevel.findOne({
            where: {
                name: languageLevelName,
            },
        });
        if (!languageLevel) {
            return res.status(400).json({ message: `Language level ${languageLevelName} not found` });
        }

        await StudyGroup.create({
            name,
            TeacherId: teacherId,
            LanguageLevelId: languageLevel.id,
        });

        return res.status(201).json({ message: "Study group created" });
    } catch (er) {
        next(er);
    }
};

export const getStudyGroupById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const studyGroup = await StudyGroup.findByPk(id, {
            include: [Teacher, LanguageLevel],
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
            include: [Teacher, LanguageLevel],
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

        const deletedCount = StudyGroup.destroy({
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
