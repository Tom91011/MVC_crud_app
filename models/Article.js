const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  teaser: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sourceContent: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: 'private',
    enum: ['public', 'private']
  },
  user: {   
     type: mongoose.Schema.Types.ObjectId,    
     required: true,
  },
  userName: {   //Author
    type: String,    
    required: true,
  },
  userIcon: {   //Author
    type: String,    
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: 
    [{
      commentPoster: mongoose.Schema.Types.ObjectId, 
      commentPosterName: String,
      content: String,
      date: {
        type: Date,
        default: Date.now,
      },
    }]   
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;