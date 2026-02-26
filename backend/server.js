import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import imageRouter from './routes/imageRoute.js';
import cakeRouter from './routes/cakeRoute.js';
import cors from 'cors';
import orderRouter from './routes/orderRoute.js';



const app = express();

const port = process.env.PORT || 8000;

connectDB();
connectCloudinary();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use('/api/cake', cakeRouter);
app.use("/api/image", imageRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res)=>{
    res.send("Hello");
});

app.listen(port, ()=> console.log(`Server has started at http://localhost:${port}`))
