const passport = require("passport");
const Article = require("../models/Article");
const session = require("express-session")

const updateArticle = (req, res) => {
    const idToBeUpdated = req.body.articleId
    let status = "private"
    console.log(req.body);
    if(req.body.checkbox)
    status = "public"
    Article.findByIdAndUpdate(idToBeUpdated, {
        title: req.body.title,
        content: req.body.content,
        status: status
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

module.exports = {
    updateArticle
}