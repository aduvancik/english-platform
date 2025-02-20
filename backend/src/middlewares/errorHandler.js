import { ValidationError as YupValidationError } from "yup";
import { ValidationError as SequelilzeValidationError } from "sequelize";
import { UniqueConstraintError } from "sequelize";

export const errorHandler = (er, req, res, next) => {
    console.error(er);
    if (er instanceof UniqueConstraintError) {
        return res.status(400).json({ message: "Unique constraint violated" });
    }
    if (er instanceof YupValidationError || er instanceof SequelilzeValidationError) {
        return res.status(400).json({ message: "Validation error" });
    }
    return res.status(500).json({ message: er.message });
};
