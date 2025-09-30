const express = require("express")
const router = express.Router()
const { getCard, createCard } = require("../controllers/cardController")

router.route("/").get(getCard)

router.route("/").post(createCard)

module.exports = router