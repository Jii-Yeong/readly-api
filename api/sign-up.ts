import { sql } from "@vercel/postgres"
import { SignUpRequest } from "../type/auth"

export const POST = async (request: Request) => {
  await sql`INSERT INTO users (email, profile_image, nickname) VALUES ('example3@email.com', 'https://example.com/profile.jpg', 'nickname1');`
}
