const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  commentPoster: {   
     type: mongoose.Schema.Types.ObjectId,    
     required: true,
      },
  articleId: {   
  type: mongoose.Schema.Types.ObjectId,    
  required: true,
      },
  date: {
    type: Date,
    default: Date.now,
  }, 
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;