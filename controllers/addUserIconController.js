const User = require("../models/User");

const addUserIcon = (req, res) => {
   const idToBeUpdated =  req.user._id
   console.log("ID: "+ idToBeUpdated);
   const icon = req.body.icon
   console.log("icon " + icon);
 User.findByIdAndUpdate(idToBeUpdated, {
    icon: icon
 },
 (err, docs) => {
    if (err){
        console.log(err)
    }
    else {
        console.log(`Update User ID: ${req.user._id}`);
    }
  })
 res.redirect("/dashboard")
}

module.exports = {
  addUserIcon
};