import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Fitness-11-DB";

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected to:", mongoose.connection.db.databaseName);
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }
}