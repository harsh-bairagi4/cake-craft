import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/userRoute.js';


const app = express();

const port = process.env.PORT || 4000;

connectDB();

app.use("/api/user", userRouter);

app.get("/", (req, res)=>{
    res.send("Hello");
});

app.listen(port, ()=> console.log(`Server has started at http://localhost:${port}`))