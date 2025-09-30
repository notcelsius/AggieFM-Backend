//@desc Get all cards
//@route GET /api/cards
//@access public
const getCard = (req, res) => {
    res.status(200).json({ message: "Get card"})
}

//@desc Create new card
//@route POST /api/cards
//@access public
const createCard = (req, res) => {
    const {lat, lng, spotifyTrackID, caption} = req.body
    if (!lat || !lng || !spotifyTrackID || !caption) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    res.status(201).json({ message: "Post card"})
}

module.exports = {getCard, createCard}