const express = require("express");
const { protectRoute } = require("../auth/protect");
const { addArticle } = require("../controllers/newArticleController")
const { composeView } = require("../controllers/composeController")
const router = express.Router();

router.post("/new-article", addArticle);
router.get("/compose", protectRoute, composeView)

module.exports = router;