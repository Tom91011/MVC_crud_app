const passport = require("passport");
const Article = require("../models/Article");
const session = require("express-session")
const marked = require('marked')

const updateArticle = (req, res) => {
    const idToBeUpdated = req.body.articleId
    let status = "private"
    if(req.body.checkbox)
    status = "public"
    Article.findByIdAndUpdate(idToBeUpdated, {
        title: req.body.title,
        teaser: req.body.teaser,
        image: req.body.image,
        content: marked.parse(req.body.content),
        sourceContent: req.body.content,
        status: status,
        userIcon: req.user.icon
    },
    (err, docs) => {
        if (err){
            console.log(err)
        }
        else {
            console.log(`Update article ID: ${req.body.articleId}`);
        }
      })   
    res.redirect("/dashboard")
}

const deleteArticle = (req, res) => {
    const idToBedeleted = req.body.articleId
    console.log("Deleted");
    Article.findByIdAndDelete(idToBedeleted, (err, docs) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Deleted : ", docs);
        }
    })
    res.redirect("/dashboard")
}

module.exports = {
    updateArticle,
    deleteArticle
}