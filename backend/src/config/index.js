import dotenv from "dotenv";

dotenv.config();

export const config = {
    secretKey: process.env.SECRET_KEY,
};
