require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const app = express();
const User = require('./models/userModel');

app.use(cors())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.listen(process.env.PORT, (err) => {
    if (err) console.log (err)
    console.log("Server is running on port ", process.env.PORT||3007);
    require("./config/db.config")
})