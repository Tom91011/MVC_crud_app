const express = require("express");
const { newComment } = require("../controllers/articleController")
const router = express.Router();

router.post("/comment", newComment)

module.exports = router;