import express from 'express';
import { addCustomCake, listCake } from '../controllers/cakeController.js';
import authMiddleware from '../middlewares/auth.js';

const cakeRouter = express.Router();

cakeRouter.post('/custom', authMiddleware, addCustomCake);
cakeRouter.get('/list', listCake);

export default cakeRouter;