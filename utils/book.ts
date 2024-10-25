import { BookSearchParameterType } from "../model/book"

export const searchBookList = async (query: BookSearchParameterType) => {
  const queryString = new URLSearchParams(query).toString()
  const apiUrl = `https://openapi.naver.com/v1/search/book.json?${queryString}`

  const data = await fetch(apiUrl, {
    headers: {
      'X-Naver-Client-Id': String(process.env.NAVER_CLIENT_ID),
      'X-Naver-Client-Secret': String(process.env.NAVER_CLIENT_SECRET)
    }
  })

  return data.json()
}