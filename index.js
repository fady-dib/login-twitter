require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.listen(process.env.PORT, (err) => {
    if (err) console.log (err)
    console.log("Server is running on port ", process.env.PORT||3007);
    require("./config/db.config")
})