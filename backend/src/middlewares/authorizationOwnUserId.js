export const authorizationOwnUserId = (req, res, next) => {
    try {
        if (req.user.id !== parseInt(req.params.id)) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        next();
    } catch (er) {
        next(er);
    }
};
