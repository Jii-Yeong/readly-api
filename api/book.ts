import express, { Request, Response } from 'express'
import { searchBookList } from '../utils/book'
import { decodeJwtToken } from '../utils/auth'
import { sql } from '@vercel/postgres'


const bookRouter = express.Router()

bookRouter.post('/search', async (req: Request, res: Response) => {
  const query = req.body?.query || ''
  const display = req.body?.display || 10
  const start = req.body?.start || 1
  const sort = req.body?.sort || 'sim'
  const searchResult = await searchBookList({ query, display, start, sort })

  res.json(searchResult)
})

bookRouter.post('/summary/create', async (req: Request, res: Response) => {
  const userToken = req.headers["authorization"]?.split(" ")[1];

  if (!userToken) {
    res.status(401).send('You entered via the wrong route.')
    return
  }

  const decodedInfo = decodeJwtToken(userToken)

  const content = req.body?.content
  const bookInfo = req.body?.bookInfo

  if (!content || !bookInfo) {
    res.status(401).send('A required parameter is missing.')
    return
  }

  await sql`
  INSERT INTO summaries (contents, book_title, book_author, book_publisher, book_pubdate, book_image, book_link, user_id)
  VALUES (
    ${content},
    ${bookInfo.title},
    ${bookInfo.author},
    ${bookInfo.publisher},
    ${bookInfo.pubdate},
    ${bookInfo.image},
    ${bookInfo.link},
    ${decodedInfo.id}
    );`

  res.send('success created')
})

bookRouter.get('/summary', async (req: Request, res: Response) => {
  const id = req.query?.id

  if (!id) {
    res.status(401).send('A required parameter is missing.')
    return
  }

  const { rows } = await sql`
  SELECT * 
  FROM summaries 
  WHERE id = ${String(id)};`

  const row = rows[0]

  if (!row) {
    res.status(401).send('Summary does not exist.')
    return
  }

  res.json(row)
})

bookRouter.delete('/summary/delete', async (req: Request, res: Response) => {
  const id = req.body?.id

  if (!id) {
    res.status(401).send('A required parameter is missing.')
  }

  const { rowCount } = await sql`
  DELETE 
  FROM summaries 
  WHERE id = ${String(id)};`

  if (!rowCount || rowCount <= 0) {
    res.status(401).send('Summary does not exist.')
    return
  }

  res.send('Success deleted.')
})

bookRouter.get('/summary/list', async (req: Request, res: Response) => {
  const { rows, rowCount } = await sql`
  SELECT * 
  FROM summaries`

  if (!rowCount || rowCount <= 0) {
    res.json([])
    return
  }

  res.json(rows)
})


export default bookRouter