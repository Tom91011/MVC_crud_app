const passport = require("passport");
const Article = require("../models/Article");
const session = require("express-session")
const marked = require('marked')

const addArticle = (req, res) => {
    let {title, content, status, checkbox} = req.body
    if(checkbox) 
    status = "public"
    
    const user = req.user._id
    const userName = req.user.name
    content = marked.parse(content)
    const newArticle = new Article ({
        title,
        content,
        status,
        user,
        userName
    })
    newArticle.save()
    res.redirect("/dashboard")
}

module.exports = {
    addArticle
}