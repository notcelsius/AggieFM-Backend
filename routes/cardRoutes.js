const express = require("express")
const router = express.Router()
const { getCard, createCard } = require("../controllers/cardController")

router.route("/").get(getCard).post(createCard)

module.exports = router