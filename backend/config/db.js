import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected");
  });
  await mongoose.connect(
    "mongodb://localhost:27017/cake-craft",
  );
};

export default connectDB;
