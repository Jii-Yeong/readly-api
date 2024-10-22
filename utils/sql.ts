import { QueryResultRow } from "@vercel/postgres"

export const isExistRows = (rows: QueryResultRow[]) => {
  return rows.find(item => item.exists)
}