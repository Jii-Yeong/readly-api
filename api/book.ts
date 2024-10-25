import express, { Request, Response } from 'express'
import { searchBookList } from '../utils/book'


const bookRouter = express.Router()

bookRouter.post('/search', async (req: Request, res: Response) => {
  const query = req.body?.query || ''
  const display = req.body?.display || 10
  const start = req.body?.start || 1
  const sort = req.body?.sort || 'sim'
  const searchResult = await searchBookList({ query, display, start, sort })

  res.json(searchResult)
})

export default bookRouter