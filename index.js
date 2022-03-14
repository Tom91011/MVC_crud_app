const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const session = require('express-session');
const MongoStore = require('connect-mongo')//needed to store the session in MongoDB
const passport = require('passport')
// var moment = require('moment');
app.locals.moment = require('moment');
const { loginCheck } = require('./auth/passport')
loginCheck(passport);
const { getNextArticle } = require('./controllers/dashboardController')
const { pairUserIdWithSocketId } = require('./controllers/dashboardController')
const { deleteUserIdWithSocketId } = require('./controllers/dashboardController')


// Mongo DB conncetion
const database = process.env.MONGODB_DATABASE_ACCESS;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to Mongoose"))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, './public')))

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_DATABASE_ACCESS })
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/login'))
app.use('/', require('./routes/dashboard'))
app.use('/', require('./routes/compose'))
app.use('/', require('./routes/edit'))
app.use('/', require('./routes/article'))

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, console.log("Server connected to port: " + 4000))

const io = require('socket.io')(server);

io.on('connection',
  (socket) => {
    console.log(socket.id + " has connected");
    io.to(socket.id).emit('userIdRequest')

    socket.on('clientId', (usernameId) => {
      console.log("the client has sent the following user ID : " + usernameId);
      pairUserIdWithSocketId(socket.id, usernameId)
    })
   
    socket.on('loadMore',
      (previousArticleId) => {
        console.log("The previous article ID received from client : " + previousArticleId.userId)
        console.log("socket ID requesting more articles is : " + socket.id)
        const nextArticle = getNextArticle(previousArticleId, previousArticleId.userId, socket.id)
        io.to(socket.id).emit('privateMessage', nextArticle)
      }
    );

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
      deleteUserIdWithSocketId(socket.id)
      socket.disconnect(socket.id)
    });
  }
);