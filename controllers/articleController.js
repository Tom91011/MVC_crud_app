const passport = require("passport");
const User = require("../models/User");
const session = require("express-session")

console.log(session);

const addArticle = (req, res) => {
    console.log(req.user._id);
    console.log(req.body);
    res.redirect("/dashboard")
}

module.exports = {
    addArticle
}