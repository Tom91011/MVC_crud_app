const express = require("express");
const { newComment } = require("../controllers/articleController")
const { logoutUser } = require("../controllers/logoutController")
const { noCache } = require("../auth/noCache")
const router = express.Router();

router.post("/comment", newComment)
router.post("/article/log-out", noCache, logoutUser)

module.exports = router;