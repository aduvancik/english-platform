import express from "express";
import cors from "cors";
import { studentRouter } from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import { studyGroupRouter } from "./routes/studyGroupRoutes.js";
import { seedDatabase } from "./utils/seedDb.js";
import { errorHandler } from "./middlewares/errorHandler.js";

seedDatabase();

const app = express();
const port = 4000;

app.use(cors({
    origin: `http://localhost:${port}`,
    optionsSuccessStatus: 200,
}));

app.use(express.json());

app.use("/students", studentRouter);
app.use("/teachers", teacherRoutes);
app.use("/study-groups", studyGroupRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started: port ${port}`);
});
