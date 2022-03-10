const Article = require("../models/Article");

let availableArticles = []
let initialArticlesToShow = []
let articlesInQueue 

const dashboardView = async (req, res) => {
  try {
    
    const articles = await Article.find({userId:req.user._id})
    
    availableArticles = []
    initialArticlesToShow = [] //This set back to a blank array so on a page refresh the following loop doesn't add onto an existing array
    articles.forEach((article) => {
      if(article.user == req.user._id.valueOf() || article.status == "public") {
        availableArticles.push(article)
      } 
    })

    articlesInQueue = availableArticles
    //  lops through available articles for a user and pushes the first few to the initial screen render
    let count = 1
    availableArticles.every(article => {
      if(count > 3) {
        return false
      }
      initialArticlesToShow.push(article)
      articlesInQueue.shift()
      console.log("article shifted " + count);
      count += 1
      return true
    })

    console.log(initialArticlesToShow.length);
    res.render("dashboard", {
      userId: req.user._id.valueOf(),
      userName:req.user.name,
      icon: req.user.icon,
      email:req.user.email,
      articlesToShow: initialArticlesToShow,
    });
  } catch (err) {
    console.log(err);
  }  
};

let count = 0

const getNextArticle = () => {
  const nextArticle = articlesInQueue[0]
  articlesInQueue.shift()
  count += 1
  return(nextArticle)  
}
  
module.exports = {
  dashboardView,
  getNextArticle
};

