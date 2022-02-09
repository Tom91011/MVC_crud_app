const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, './public')))
// app.use('/public/images/');

app.get("/", (req, res) => {
    res.render("index")
})
app.listen(PORT, console.log("Server don start for port: " + PORT))