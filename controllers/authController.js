const asyncHandler = require("express-async-handler");

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} = process.env;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REDIRECT_URI) {
  console.error("Missing Spotify env vars. Check your .env and dotenv loading.");
}

const SCOPES = ["user-read-email", "user-read-private"].join(" ");

const loginWithSpotify = asyncHandler(async (req, res) => {
  console.log("🔍 SPOTIFY_REDIRECT_URI in use ->", SPOTIFY_REDIRECT_URI);

  const state = Math.random().toString(36).slice(2);
  res.cookie("spotify_oauth_state", state, { httpOnly: true, sameSite: "lax" });

  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: SCOPES,
    state,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

const spotifyCallback = asyncHandler(async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  // // optional state check
  // const savedState = req.cookies?.spotify_oauth_state;
  // if (!state || !savedState || state !== savedState) {
  //   return res.status(400).json({ error: "State mismatch" });
  // }
  // clear the cookie
  res.clearCookie("spotify_oauth_state");

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }),
  });

  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok) {
    console.error("Token exchange failed:", tokenData);
    return res.status(400).json({ error: "Token exchange failed", details: tokenData });
  }

  const profileResponse = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const profileData = await profileResponse.json();
  if (!profileResponse.ok) {
    console.error("Failed to fetch Spotify profile:", profileData);
    return res.status(400).json({ error: "Failed to fetch Spotify profile", details: profileData });
  }

  // success - return for now (later: create session/JWT, redirect to frontend, etc.)
  res.status(200).json({
    message: "Spotify login successful",
    tokens: tokenData,
    profile: profileData,
  });
});

module.exports = { loginWithSpotify, spotifyCallback };
