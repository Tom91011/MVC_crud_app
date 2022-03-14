const express = require("express");
const { protectRoute } = require("../auth/protect");
const { articleView } = require("../controllers/articleController")
const { addUserIcon } = require("../controllers/addUserIconController")
const { editView } = require("../controllers/editController")
const { logoutUser } = require("../controllers/logoutController")
const router = express.Router();

router.post("/add-user-icon", addUserIcon);
router.post("/log-out", logoutUser)
router.get("/article/:id", protectRoute, articleView)
router.get("/edit/:id", protectRoute, editView)


module.exports = router;