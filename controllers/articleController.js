const passport = require("passport");
const Article = require("../models/Article");
const session = require("express-session")

const addArticle = (req, res) => {
    const {title, content} = req.body
    const user = req.user._id
    // console.log(req.user.email);
    // console.log(content);
    // console.log(req.user._id)
    const newArticle = new Article ({
        title,
        content,
        user
    })
    newArticle.save()
    res.redirect("/dashboard")
}

module.exports = {
    addArticle
}