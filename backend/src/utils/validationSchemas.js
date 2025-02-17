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
    }).nullable(),
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

export const teacherSchema = object({
    firstName: string().min(2, "First name must be at least 2 characters long").max(255).required(),
    lastName: string().min(2, "Last name must be at least 2 characters long").max(255).required(),
    email: string().max(255).email("Invalid email format").required(),
    password: string()
        .min(8, "Password must be at least 8 characters long")
        .max(255)
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .required(),
});
