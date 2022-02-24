const composeView =  (req, res) => {
    res.render("compose", {
        userName:req.user.name,
    });  
};
  
module.exports = {
    composeView,
};