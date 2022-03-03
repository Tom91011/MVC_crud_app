const express = require("express");
const { protectRoute } = require("../auth/protect");
const { articleView } = require("../controllers/articleController")
const { addUserIcon } = require("../controllers/addUserIconController")
const { editView } = require("../controllers/editController")
const router = express.Router();

router.post("/add-user-icon", addUserIcon);
router.get("/article/:id", protectRoute, articleView)
router.get("/edit/:id", protectRoute, editView)


module.exports = router;