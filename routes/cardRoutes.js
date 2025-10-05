const express = require("express")
const router = express.Router()
const { getAllCards, postCard } = require("../controllers/cardController")

router.route("/").get(getAllCards).post(postCard)

module.exports = router