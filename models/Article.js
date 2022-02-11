const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private']
  },
  user: {   
     type: mongoose.Schema.Types.ObjectId,    
     required: true,
      },
  date: {
    type: Date,
    default: Date.now,
  },
 
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;