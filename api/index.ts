import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRouter from './auth';
import userRouter from './user';
import bookRouter from './book';

export const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/book', bookRouter)

module.exports = app;