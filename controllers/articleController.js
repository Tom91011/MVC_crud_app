const Article = require("../models/Article")

const articleView = (req, res) => {
    const typedTitle = req.params.id
   
    function findArticle() {    
        Article.find({}, (err, foundItems) => {  
            
            foundItems.forEach( (article) => {
                if(article.id === typedTitle ) {
                    console.log(article);
                    if(
                        article.status === "public" 
                        || req.user._id.valueOf() === article.user.valueOf()
                    ) {         
                        function renderArticle () {
                            res.render("article", {
                                userId: req.user.id.valueOf(),
                                authorId: article.userName,
                                articleId: article._id,
                                title: article.title,
                                content: article.content,
                                date: article.date,
                                comments: article.comments
                            })
                        }  
                       renderArticle()
                    } else {
                        res.render("login")
                    }                
                } 
            })           
        })    
    }      
    findArticle()
};

const newComment = (req, res) => {
    let {content, articleId} = req.body
    const commentPoster = req.user._id
    const commentPosterName = req.user.name
    const commentArticleId = req.body.articleId
    const comment = req.body.content
    const date = req.body.date
    Article.findByIdAndUpdate(commentArticleId, {
        $push: {
            comments: {
                commentPoster: commentPoster,
                commentPosterName: commentPosterName, 
                content: comment,
                date: date
            }
        }
    },
    (err, docs) => {
        if (err){
            console.log(err)
        }
        else {
            console.log(`Update article ID: ${req.body.articleId}`);
        }
      })
    res.redirect("/article/"+commentArticleId)
  }
  
module.exports = {
    articleView,
    newComment
};