import express from "express";
import cors from "cors";
import { studentRouter } from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import { studyGroupRouter } from "./routes/studyGroupRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { seedDatabase } from "./utils/seedDb.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { timeSlotRouter } from "./routes/timeSlotRoutes.js";

seedDatabase();

const app = express();
const port = 4000;

app.use(cors({
    origin: `http://localhost:5173`,
    optionsSuccessStatus: 200,
}));

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/students", studentRouter);
app.use("/teachers", teacherRoutes);
app.use("/study-groups", studyGroupRouter);
app.use("/time-slots", timeSlotRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started: port ${port}`);
});
