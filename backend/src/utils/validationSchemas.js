import { object, string, number, array } from "yup";

export const createStudentSchema = object({
    firstName: string().max(255).required(),
    lastName: string().max(255).required(),
    email: string().max(255).email().required(),
    password: string().min(8).max(255).required(),
    languageLevelId: number().integer().required(),
    studyGroupId: number().integer().nullable(),
    timeSlotIds: array()
        .of(number().integer().required())
        .min(1)
        .required(),
});

export const patchStudentSchema = object({
    firstName: string().max(255).optional(),
    lastName: string().max(255).optional(),
    email: string().max(255).email().optional(),
    password: string().min(8).max(255).optional(),
    languageLevelId: number().integer().optional(),
    studyGroupId: number().integer().nullable().optional(),
    timeSlotIds: array().optional(),
});

export const studyGroupSchema = object({
    name: string().max(255).required(),
    teacherId: number().integer().required(),
    languageLevelId: number().integer().required(),
    timeSlotIds: array()
        .of(number().integer().required())
        .min(1)
        .required(),
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
    timeSlotIds: array()
        .of(number().integer().required())
        .min(1)
        .required(),
});
