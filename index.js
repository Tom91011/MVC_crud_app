const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();

// Mongo DB conncetion
const database = process.env.MONGODB_DATABASE_ACCESS;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("e don connect"))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, './public')))

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
  

app.use('/', require('./routes/login'))

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log("Server connected to port: " + PORT))