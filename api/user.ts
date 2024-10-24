import express, { Request, Response } from 'express';
import { decodeJwtToken } from '../utils/auth';
import { sql } from '@vercel/postgres';

const userRouter = express.Router()

userRouter.get('/info', async (req: Request, res: Response) => {
  const userToken = req.headers["authorization"]?.split(" ")[1];

  if (!userToken) {
    res.status(401).send('You entered via the wrong route.')
    return
  }

  const decodedInfo = decodeJwtToken(userToken)

  const { rows } = await sql`
  SELECT *
    FROM users
    WHERE id = ${decodedInfo.id};`

  const row = rows[0]

  if (!row) {
    res.json(null)
    return
  }

  delete row.id

  res.json(row)
})

export default userRouter
