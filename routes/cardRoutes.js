const express = require("express")
const router = express.Router()

router.route("/").get((req, res) => {
    res.status(200).json({ message: "Get card"})
})

router.route("/").post((req, res) => {
    res.status(200).json({ message: "Post card"})
})

module.exports = router