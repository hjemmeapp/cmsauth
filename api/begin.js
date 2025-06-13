export default async function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI; // e.g. https://your-app.vercel.app/api/complete
  const scope = "repo"; // adjust if needed
  const state = Math.random().toString(36).substring(2, 15); // generate a simple random string

  // Save state to cookie/session if you want to verify later (optional but recommended)

  const params = new URLSearchParams({
    client_id,
    redirect_uri,
    scope,
    state,
  });

  const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  res.redirect(githubAuthUrl);
}
