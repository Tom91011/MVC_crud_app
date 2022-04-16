const express = require("express");
const {
  registerView,
  loginView,
  registerUser,
  loginUser,
} = require("../controllers/loginController");
const { dashboardView } = require("../controllers/dashboardController");
const { protectRoute } = require("../auth/protect");
const { noCache } = require("../auth/noCache")

const router = express.Router();

router.get("/", protectRoute, dashboardView);
router.get("/register", registerView);
router.get("/login", loginView);
router.get("/dashboard", protectRoute, noCache, dashboardView);

router.post("/register", registerUser, loginUser);
router.post("/login", loginUser);

module.exports = router;