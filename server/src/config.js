import { config } from "dotenv";
config();
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;