import dotenv from "dotenv";

dotenv.config();

export const { PORT, NODE_ENV, HOST, DATABASE_URL, FRONT_URL } = process.env;
