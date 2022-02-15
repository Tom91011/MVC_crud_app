const Article = require("../models/Article");

const articleView =  (req, res) => {
    const typedTitle = req.params.id
    console.log(typedTitle);
    Article.find({}, (err, foundItems) => {
        foundItems.forEach((article) => {
            if(article.id === req.params.id ) {
                if(article.status === "public" || req.user._id.valueOf() === article.user.valueOf()) {
                    console.log("success");
                    res.render("article", {
                        userId: article.user,
                        title: article.title,
                        content: article.content,
                        date: article.date
                    })
                } else {
                    res.render("login")
                }                
            } else {
                console.log("fail");   
            }   
        })    
    })    
};
  
module.exports = {
    articleView,
};