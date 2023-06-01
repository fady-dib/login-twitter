const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/userModel');
require('dotenv').config();


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3005/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOne({ twitterId: profile.id }, function(err, user) {
      if(err) {
        return cb(err);
      }
      if(user) {
        return cb(null, user);
      } else {
        const newUser = new User();
        newUser.twitterId = profile.id;
        newUser.save(function(err) {
          if(err) {
            throw err;
          }
          return cb(null, newUser);
        });
      }
    });
  }
));
module.exports = passport;