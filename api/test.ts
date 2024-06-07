import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  response: VercelResponse
) {
  const query = req.query;

  return response.status(200).json({ message: "Hello World", query });
}
