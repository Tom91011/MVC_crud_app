const express = require("express");
const { protectRoute } = require("../auth/protect");
const { updateArticle } = require("../controllers/updateController")
const router = express.Router();

router.post("/update-article", protectRoute, updateArticle )

module.exports = router;