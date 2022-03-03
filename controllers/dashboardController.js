const Article = require("../models/Article");

const dashboardView = async (req, res) => {
  try {
    
    const articles = await Article.find({userId:req.user._id})
    let articlesToShow = []
    articles.forEach((article) => {
      if(article.user == req.user._id.valueOf() || article.status == "public") {
        articlesToShow.push(article)
      } 
    })

    res.render("dashboard", {
      userId: req.user._id.valueOf(),
      userName:req.user.name,
      icon: req.user.icon,
      email:req.user.email,
      articlesToShow: articlesToShow,
    });
  } catch (err) {
    console.log(err);
  }  
};
  
module.exports = {
  dashboardView
};

