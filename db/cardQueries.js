const pool = require("./index")

async function getCards() {
    const result = await pool.query(`
        SELECT *
        FROM cards
        `)
    return result.rows
}

async function createCard({ userId, lat, lng, spotifyTrackId, caption }) {
  const result = await pool.query(
    `INSERT INTO cards (user_id, lat, lng, spotify_track_id, caption)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, lat, lng, spotifyTrackId, caption ?? null]
  );
  return result.rows[0];
}


module.exports = {getCards, createCard}