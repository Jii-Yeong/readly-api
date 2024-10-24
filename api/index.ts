import express from 'express';
import cors from 'cors';
import authRouter from './auth';
import userRouter from './user';

export const router = express.Router();

const corsOptions = {
  origin: process.env.CLIENT_URL
}

router.use(cors(corsOptions))

router.use('/auth', authRouter)
router.use('/user', userRouter)

module.exports = router;