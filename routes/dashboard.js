const express = require("express");
const { addArticle } = require("../controllers/articleController")
const router = express.Router();

router.post("/new-article", addArticle);

module.exports = router;