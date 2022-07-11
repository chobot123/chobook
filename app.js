require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("./models/UserSchema");

const usersRouter = require('./routes/users');
const postsRouter = require("./routes/posts");
const messagesRouter = require("./routes/messages");
const inboxesRouter = require("./routes/inboxes");

const app = express();

//Mongoose connection
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use('/users', usersRouter);
app.use('/inbox', inboxesRouter);
app.use("/messages", messagesRouter);
app.use("/posts", postsRouter);

//passport local strategy

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne(
    {
      "username": username,
    },
    (err, user) => {
      if(err) {return done(err);}
    }
    if(!user) { return done(null, false, { message: "Incorrect username or password"}); }
  )
}))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
