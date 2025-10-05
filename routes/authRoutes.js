const express = require("express");
const { loginWithSpotify, spotifyCallback } = require("../controllers/authController");
const router = express.Router();

router.get("/spotify/login", loginWithSpotify);
router.get("/spotify/callback", spotifyCallback);

module.exports = router;
