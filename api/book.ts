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

export default bookRouter