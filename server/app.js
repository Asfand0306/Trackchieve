const express = require('express');
const passport = require('passport');
const session = require('express-session');
const SteamStrategy = require('passport-steam').Strategy;
const authRoutes = require('./auth');
const cors = require('cors');

const app = express();

// Passport session setup
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Steam Strategy
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:5000/auth/steam/return',
    realm: 'http://localhost:5000/',
    apiKey: 'YOUR_STEAM_API_KEY' // Replace with your actual Steam API key
  },
  (identifier, profile, done) => {
    process.nextTick(() => {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's origin
  credentials: true
}));
app.use(session({
  secret: 'your-secret-key', // Replace with a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});