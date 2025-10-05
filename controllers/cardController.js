const asyncHandler = require("express-async-handler")
const {getCards, createCard, userPostedToday} = require("../db/cardQueries")

//@desc Get all cards
//@route GET /api/cards
//@access public
const getAllCards = asyncHandler(async (req, res) => {
    const cards = await getCards()
    res.status(200).json({cards})
})

//@desc Create new card
//@route POST /api/cards
//@access public
const postCard = asyncHandler(async (req, res) => {
    const userId = 1    // mock user for now
    const {lat, lng, spotifyTrackId, caption} = req.body
    if (!lat || !lng || !spotifyTrackId) {
        res.status(400)
        throw new Error("lat, lng, and spotifyTrackId are required")
    }
    if (await userPostedToday(userId)) {
        return res.status(409).json({ error: "daily_quota_reached" });
    }
    const card = await createCard({userId, lat, lng, spotifyTrackId, caption})
    res.status(201).json(card)
})

module.exports = {getAllCards, postCard}