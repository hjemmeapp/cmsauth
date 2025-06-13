export default async function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI;
  const state = Math.random().toString(36).substring(2); // Optional: store to prevent CSRF

  const githubAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${client_id}` +
    `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
    `&scope=repo` +
    `&state=${state}`;

  res.writeHead(302, { Location: githubAuthUrl });
  res.end();
}
