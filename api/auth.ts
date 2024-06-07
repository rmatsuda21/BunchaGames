import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const code = (req.query?.code as string) || "";

  if (!code) {
    return res.redirect(302, "/");
  }

  const data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.START_GG_OAUTH_SECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "https://buncha-games.vercel.app/api/auth",
    scope: "user.identity",
  };

  const headers = {
    "Content-Type": "application/json",
  };

  console.log(data);

  const _res = await fetch("https://api.start.gg/oauth/access_token", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  const json = await _res.json();

  res.setHeader("set-cookie", `test=abc; HttpOnly;`);
  return res.status(200).json({ code, json, data });
}
