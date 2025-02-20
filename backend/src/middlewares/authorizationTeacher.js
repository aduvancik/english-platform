export const authorizationTeacher = (req, res, next) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        next();
    } catch (er) {
        next(er);
    }
};
