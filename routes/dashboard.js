const express = require("express");
const { protectRoute } = require("../auth/protect");
const { addArticle } = require("../controllers/newArticleController")
const { articleView } = require("../controllers/articleController")
const router = express.Router();

router.get("/article/:id", protectRoute, articleView)

module.exports = router;