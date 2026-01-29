import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import imageRouter from './routes/imageRoute.js';
import cors from 'cors';


const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res)=>{
    res.send("Hello");
});

app.listen(port, ()=> console.log(`Server has started at http://localhost:${port}`))