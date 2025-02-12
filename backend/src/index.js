import express from "express";
import { seedDatabase } from "./utils/seedDb.js";

seedDatabase();

const app = express();
const port = 4000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server started: port ${port}`);
});
