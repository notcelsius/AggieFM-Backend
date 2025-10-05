const asyncHandler = require("express-async-handler")
const {getCards, createCard} = require("../db/cardQueries")

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
    const userId = 1
    const {lat, lng, spotifyTrackId, caption} = req.body
    if (!lat || !lng || !spotifyTrackId) {
        res.status(400)
        throw new Error("lat, lng, and spotifyTrackId are required")
    }
    const card = await createCard(userId, lat, lng, spotifyTrackId, caption)
    res.status(201).json({ message: "Post card"})
})

module.exports = {getAllCards, postCard}