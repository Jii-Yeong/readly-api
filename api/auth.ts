import express, { Request, Response } from 'express';
import { generateJwtToken, getGoogleTokenByCode, getGoogleUserInfo } from '../utils/auth';
import { sql } from '@vercel/postgres';
import { isExistRows } from '../utils/sql';

const authRouter = express.Router()

authRouter.post('/login', async (req: Request, res: Response) => {
  const code = req.body.code

  const token = await getGoogleTokenByCode(code)

  if (!token) {
    res.send('login failed')
    return
  }

  const userInfo = await getGoogleUserInfo(token.access_token)

  const accessToken = generateJwtToken({ id: userInfo.id })

  const { rows } = await sql`
  SELECT EXISTS (
    SELECT 1 
    FROM users 
    WHERE id = ${userInfo.id}
  );`

  if (isExistRows(rows)) {
    res.send({ message: 'login success', accessToken })
  }

  await sql`
  INSERT INTO users 
    (id, email, profile_image, nickname) 
  VALUES (${userInfo.id}, ${userInfo.email}, ${userInfo.picture}, ${userInfo.name});`
  res.send({ message: 'regist user', accessToken })
});

export default authRouter
