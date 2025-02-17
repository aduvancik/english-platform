import { verifyToken } from "../utils/tokenUtil.js";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization; 

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
};
