export const authorizationStudent = (req, res, next) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        next();
    } catch (er) {
        next(er);
    }
};
