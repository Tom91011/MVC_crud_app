const express = require('express');
const app = express();
const Article = require("../models/Article");
// var moment = require('moment');
// app.locals.moment = require('moment');

let availableArticles = []
let initialArticlesToShow = []
let articlesInDb 
let articleIdsArray = []
const dashboardView = async (req, res) => {
  try {    
    articlesInDb = await Article.find({userId:req.user._id})
    articlesInDb = articlesInDb.reverse()
    articleIdsArray = []
    availableArticles = []
    initialArticlesToShow = [] //This set back to a blank array so on a page refresh the following loop doesn't add onto an existing array
    
    // Loops through all articles and checks if each article is either their own or public and adds to a new availableArticles array
    articlesInDb.forEach((article) => {
      if(article.user == req.user._id.valueOf() || article.status == "public") {
        availableArticles.push(article)
      } 
    })

    articlesInDb.forEach((article) => {      
        articleIdsArray.push(article._id.valueOf())      
    })

    //  loops through available articles for a user and pushes the first few to the initial screen render
    let count = 1
    availableArticles.every(article => {
      if(count > 3) {
        return false
      }
      initialArticlesToShow.push(article)
      count += 1
      return true
    })

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

// This creates an array of all users IDs and pairs them with thier own unique Socket.io ID
let userIdSocketIdPairArray = []
const pairUserIdWithSocketId = (socketId, userId) => {
  userIdSocketIdPairArray.push({
    socketId: socketId,
    userId: userId
  })
  console.table(userIdSocketIdPairArray);
}

const getNextArticle = (previousArticleId, userId, socketId) => {

  const previousArticleArrayPosition = articleIdsArray.findIndex(articleId => articleId == previousArticleId.articleId)

  // returns an object containing the userID relating to the socketId
  const findUser = (userObject) => {
    return userObject.socketId === socketId
  }

  const user = userIdSocketIdPairArray.find(findUser)

  // Checks if the corresponding userId taken from the socketId matches the userId sent by the client
  const doesUserIdMatchSocketId = user => {return userId == user.userId}
  //  If there is a match then it sends on the next available article (i.e has to be either their own or another users public article)
  if(doesUserIdMatchSocketId(user)) {
      if(previousArticleArrayPosition !== articleIdsArray.length - 1 ) {
        console.log(`position of the previous article ${previousArticleId.articleId} was: ${previousArticleArrayPosition}`);
        const nextArticleArrayPostion = previousArticleArrayPosition + 1        
        
        const nextArticleIndex = articlesInDb.findIndex((article, index) => (article.user.valueOf() == userId || article.status == "public") && index > previousArticleArrayPosition);
      
        const nextArticle = articlesInDb[nextArticleIndex]

        if(nextArticleIndex != -1)
        console.log(`position of the next article ${nextArticle._id} is: ${nextArticleIndex}`); 

        return(nextArticle)         
    } 
  } 
}

// Finds the socket.io ID in the array and deletes it when the client exits or refreshes the browser
const deleteUserIdWithSocketId = (socketId) => {
  console.log(socketId + " has disconnected");
  const userArrayPosition = userIdSocketIdPairArray.findIndex(user => user.socketId == socketId)
  userIdSocketIdPairArray.splice(userArrayPosition,1)
  console.table(userIdSocketIdPairArray)
}

module.exports = {
  dashboardView,
  getNextArticle,
  pairUserIdWithSocketId,
  deleteUserIdWithSocketId
};

