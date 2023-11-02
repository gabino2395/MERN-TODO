import mongoose from "mongoose";
import { DB_URL } from "../config.js";
export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB conncected");
  } catch (error) {
    console.log(error);
  }
};
