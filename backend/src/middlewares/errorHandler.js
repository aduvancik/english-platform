import { ValidationError } from "yup";

export const errorHandler = (er, req, res, next) => {
    console.error(er);
    if (er instanceof ValidationError) {
        return res.status(400).json({ message: "Validation error" });
    }
    return res.status(500).json({ message: er.message });
};
