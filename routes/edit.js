const express = require("express");
const { protectRoute } = require("../auth/protect");
const { updateArticle, deleteArticle } = require("../controllers/updateController")
const router = express.Router();

router.post("/update-article", protectRoute, updateArticle )
router.post("/delete", protectRoute, deleteArticle )

module.exports = router;