import mongoose from "mongoose";

// reuse the connection between serverless invocations
let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URL, { bufferCommands: false })
      .catch((error) => {
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connected");
  return cached.conn;
};
