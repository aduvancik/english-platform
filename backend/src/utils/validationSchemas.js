import { object, string, number, array } from "yup";

export const studentSchema = object({
    firstName: string().max(255).required(),
    lastName: string().max(255).required(),
    email: string().max(255).email().required(),
    password: string().min(8).max(255).required(),
    languageLevelId: number().integer().required(),
    studyGroupId: number().integer().nullable(),
});

export const studyGroupSchema = object({
    name: string().max(255).required(),
    teacherId: number().integer().required(),
    languageLevelId: number().integer().required(),
});

export const teacherSchema = object({
    firstName: string().max(255).required(),
    lastName: string().max(255).required(),
    email: string().max(255).email().required(),
    password: string().min(8).max(255).required(),
    languageLevelIds: array()
        .of(number().integer().required())
        .min(1)
        .max(6)
        .required(),
});
