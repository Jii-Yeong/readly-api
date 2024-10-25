export type BookSearchParameterType = {
  query: string;
  display?: string;
  start?: string;
  sort?: 'sim' | 'date'
}