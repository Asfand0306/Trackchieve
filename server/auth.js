const express = require('express');
const router = express.Router();
const passport = require('passport');

// Steam authentication routes
router.get('/steam', 
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/steam/return',
  (req, res, next) => {
    req.url = req.originalUrl;
    next();
  },
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the React app
    res.redirect('http://localhost:3000/dashboard');
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('http://localhost:3000');
  });
});

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: req.user
    });
  } else {
    res.json({
      isAuthenticated: false
    });
  }
});

module.exports = router;