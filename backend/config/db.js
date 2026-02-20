import mongoose from "mongoose";
import "dotenv/config";

mongoose.connection.on("error", (err) => {
  console.error("MongoDB runtime error:", err);
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
