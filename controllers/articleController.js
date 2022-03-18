const Article = require("../models/Article")

const articleView = async (req, res) => {
    const typedTitle = req.params.id
   
    function findArticle() {    
        Article.find({}, (err, foundItems) => {  
            
            foundItems.forEach( (article) => {
                if(article.id === typedTitle ) {
                    if(
                        article.status === "public" 
                        || req.user._id.valueOf() === article.user.valueOf()
                    ) {         
                        function renderArticle () {
                            res.render("article", {
                                userId: req.user.id.valueOf(),
                                userName:req.user.name,
                                icon:req.user.icon,
                                authorId: article.user,
                                authorName: article.userName,
                                articleId: article._id,
                                title: article.title,
                                content: article.content,
                                date: article.date,
                                authorIcon: article.userIcon,
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
    const commentPosterIcon = req.user.icon
    // console.log(req.user);
    const commentArticleId = req.body.articleId
    const comment = req.body.content
    const date = req.body.date
    Article.findByIdAndUpdate(commentArticleId, {
        $push: {
            comments: {
                commentPoster: commentPoster,
                commentPosterName: commentPosterName, 
                commentPosterIcon: commentPosterIcon,
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