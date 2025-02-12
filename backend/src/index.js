import express from "express";
import { studentRouter } from "./routes/studentRoutes.js";
import { seedDatabase } from "./utils/seedDb.js";
// import { resetDatabase } from "./utils/seedDb.js";

import teacherRoutes from "./routes/teacherRoutes.js"; 

// resetDatabase();
seedDatabase();

const app = express();
const port = 4000;

app.use(express.json());

app.use("/students", studentRouter);
app.use("/teachers", teacherRoutes);

app.listen(port, () => {
    console.log(`Server started: port ${port}`);
});