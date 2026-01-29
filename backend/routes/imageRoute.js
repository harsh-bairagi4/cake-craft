import express from 'express';
import {generateImage} from '../controllers/imageController.js'
import authMiddleware from '../middlewares/auth.js';

const imageRouter = express.Router();

imageRouter.post("/generate-image", authMiddleware, generateImage);

export default imageRouter;