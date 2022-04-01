const express = require("express");
const { protectRoute } = require("../auth/protect");
const { addArticle } = require("../controllers/newArticleController")
const { composeView } = require("../controllers/composeController")
const { noCache } = require("../auth/noCache")
const router = express.Router();

router.post("/new-article", addArticle);
router.get("/compose", protectRoute, noCache, composeView)

module.exports = router;