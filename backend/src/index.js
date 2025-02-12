import express from "express";
import { sequelize } from "./models/index.js";

await sequelize.sync({ force: true });

const app = express();
const port = 4000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server started: port ${port}`);
});
