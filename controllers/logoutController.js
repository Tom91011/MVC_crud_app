const User = require("../models/User");

const logoutUser = (req, res) => {
    console.log(req.user);
    console.log("logging -out");
    req.session.destroy(function(err) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        (res.redirect("/login"))
      })
    
}

module.exports = {
    logoutUser
  };