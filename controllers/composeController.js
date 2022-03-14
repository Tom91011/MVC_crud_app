const composeView =  (req, res) => {
    res.render("compose", {
        userId: req.user._id.valueOf(),
        userName:req.user.name,
        icon: req.user.icon
    });  
};
  
module.exports = {
    composeView,
};