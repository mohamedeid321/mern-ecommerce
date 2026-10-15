import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongo db:", conn.connection.host);
  } catch (error) {
    console.log("failed to connect to mongo db:", error.message);
    // stop the program as no important of the app without db
    process.exit(1);
  }
};
export default connectDB;
