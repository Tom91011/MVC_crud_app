const composeView =  (req, res) => {
    res.render("compose", {
        userName:req.user.name,
        icon: req.user.icon
    });  
};
  
module.exports = {
    composeView,
};