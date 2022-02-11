const Article = require("../models/Article");

const dashboardView = async (req, res) => {
  try {
    const articles = await Article.find({userId:req.user._id})
    console.log(articles[0].user);
    res.render("dashboard", {
      userId: req.user._id.valueOf(),
      name:req.user.name,
      email:req.user.email,
      articles: articles
    });
  } catch (err) {
    console.log(err);
  }  
};
  
module.exports = {
  dashboardView,
};