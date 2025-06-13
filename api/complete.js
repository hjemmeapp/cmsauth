export default async function handler(req, res) {
  const code = req.query.code;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;
  const redirect_uri = process.env.REDIRECT_URI; // should match exactly the one used in /api/begin

  if (!code) {
    return res.status(400).json({ error: "Missing code parameter" });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ client_id, client_secret, code, redirect_uri }),
  });

  const data = await tokenRes.json();

  if (data.error) {
    return res.status(400).json({ error: data.error_description });
  }

  // Send the token to the CMS window and close this popup
  res.send(`
    <html>
      <body>
        <script>
          window.opener.postMessage(${JSON.stringify(data)}, "*");
          window.close();
        </script>
      </body>
    </html>
  `);
}
