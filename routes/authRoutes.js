
const router = require('express').Router();
const passport = require('../controllers/authController');

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.send('Authentication successful!');
  });


module.exports = router;
