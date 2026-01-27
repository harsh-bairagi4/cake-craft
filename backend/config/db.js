import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async () =>{
    mongoose.connection.on("connected", () =>{
        console.log("DB Connected");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/cakecraft`)
}

export default connectDB;
