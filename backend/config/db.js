import mongoose from "mongoose";
import "dotenv/config";

// 🔴 Runtime errors (network drops, Atlas issues, etc.)
mongoose.connection.on("error", (err) => {
  console.error("MongoDB runtime error:", err);
});

// 🟢 Connected / reconnected
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// 🟡 Disconnected
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
