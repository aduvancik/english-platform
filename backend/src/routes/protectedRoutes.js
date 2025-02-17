import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Welcome!", user: req.user });
});

export default router;
