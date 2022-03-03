
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {   
     type: String,    
     default: "Nottingham", 
      },
  date: {
    type: Date,
    default: Date.now,
  },
  icon: {
    type: String,
    required: true
    // default: "https://thumbs2.imgbox.com/89/75/rpfqD6Aj_t.png"
  }
 
});

const User = mongoose.model("User", UserSchema);
module.exports = User;