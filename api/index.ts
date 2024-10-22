import express from 'express';
import cors from 'cors';
import authRouter from './auth';

export const router = express.Router();

const corsOptions = {
  origin: process.env.CLIENT_URL
}

router.use(cors(corsOptions))

router.use('/auth', authRouter)

module.exports = router;