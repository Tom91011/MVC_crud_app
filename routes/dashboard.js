const express = require("express");
const { protectRoute } = require("../auth/protect");
const { articleView } = require("../controllers/articleController")

const { editView } = require("../controllers/editController")
const router = express.Router();

router.get("/article/:id", protectRoute, articleView)
router.get("/edit/:id", protectRoute, editView)


module.exports = router;