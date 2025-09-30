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
    res.status(201).json({ message: "Post card"})
}

module.exports = {getCard, createCard}