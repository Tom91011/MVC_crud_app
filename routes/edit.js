const express = require("express");
const { protectRoute } = require("../auth/protect");
const { updateArticle, deleteArticle } = require("../controllers/updateController")
const { logoutUser } = require("../controllers/logoutController")
const router = express.Router();

router.post("/update-article", protectRoute, updateArticle )
router.post("/delete", protectRoute, deleteArticle )
router.post("/edit/log-out", logoutUser)

module.exports = router;