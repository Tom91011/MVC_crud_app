const Article = require("../models/Article");

const articleView =  (req, res) => {
    const typedTitle = req.params.id
    Article.find({}, (err, foundItems) => {
        foundItems.forEach((article) => {
            if(article.id === req.params.id ) {
                if(article.status === "public" || req.user._id.valueOf() === article.user.valueOf()) {
                    res.render("article", {
                        userId: req.user.id.valueOf(),
                        authorId: article.user,
                        articleId: article._id,
                        title: article.title,
                        content: article.content,
                        date: article.date
                    })
                } else {
                    res.render("login")
                }                
            } 
        })    
    })    
};
  
module.exports = {
    articleView,
};