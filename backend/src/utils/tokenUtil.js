import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        config.secretKey,
        { expiresIn: "1h" },
    );
};
