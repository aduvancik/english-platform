import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, config.secretKey);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;
        next();
    } catch (er) {
        next(er);
    }
};
