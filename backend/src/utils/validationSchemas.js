import { object, string, number } from "yup";

export const studentSchema = object({
    firstName: string().max(255).required(),
    lastName: string().max(255).required(),
    email: string().max(255).email().required(),
    password: string().min(8).max(255).required(),
    languageLevel: object({
        name: string().max(255).required(),
    }).required(),
    studyGroup: object({
        name: string().max(255).required(),
    }).required(),
});

export const studyGroupSchema = object({
    name: string().max(255).required(),
    teacher: object({
        id: number().integer().required(),
    }).required(),
    languageLevel: object({
        name: string().max(255).required(),
    }).required(),
});
