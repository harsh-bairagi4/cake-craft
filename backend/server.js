import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';


const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

connectDB();

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res)=>{
    res.send("Hello");
});

app.listen(port, ()=> console.log(`Server has started at http://localhost:${port}`))