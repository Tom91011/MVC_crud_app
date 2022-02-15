const Article = require("../models/Article");

const editView =  (req, res) => {
    const typedTitle = req.params.id
    Article.find({}, (err, foundItems) => {
        foundItems.forEach((article) => {
            if(article.id === req.params.id ) {
                if(article.status === "public" || req.user._id.valueOf() === article.user.valueOf()) {
                    
                    let checkBoxStatus = "checked"

                    if(article.status == "private")
                    checkBoxStatus = ""

                    res.render("edit", {
                        userId: article.user,
                        title: article.title,
                        content: article.content,
                        id: article._id,
                        date: article.date,
                        checkBoxStatus: checkBoxStatus
                    })
                } else {
                    res.render("login")
                }                
            } 
        })    
    })    
};
  
module.exports = {
    editView,
};