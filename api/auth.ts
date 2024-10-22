import { sql } from '@vercel/postgres';
import express, { Request, Response } from 'express';
import { isExistRows } from '../utils/sql';
import { getGoogleUserInfo } from '../utils/auth';

const authRouter = express.Router()

authRouter.post('/login', async (req: Request, res: Response) => {
  const accessToken = req.body.accessToken
  const userInfo = await getGoogleUserInfo(accessToken)

  const { rows } = await sql`
  SELECT EXISTS (
    SELECT 1 
    FROM users 
    WHERE id = ${userInfo.id}
  );`

  if (isExistRows(rows)) {
    res.send('login success')
  }


  await sql`
  INSERT INTO users 
    (id, email, profile_image, nickname) 
  VALUES (${userInfo.id}, ${userInfo.email}, ${userInfo.picture}, ${userInfo.name});`
  res.send('regist user')
});

export default authRouter
