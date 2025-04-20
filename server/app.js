// app.js
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
  providerURL: 'https://steamcommunity.com/openid',
  returnURL: 'http://localhost:5000/auth/steam/return',
  realm: 'http://localhost:5000/',
  apiKey: process.env.STEAM_API_KEY,
  stateless: true // Important: Set to true
}, (identifier, profile, done) => {
  console.log('Received profile:', profile);
  console.log('Identifier:', identifier);
  return done(null, profile);
}));

// Middleware
app.use((err, req, res, next) => {
  console.error("Authentication error:", err);
  res.status(500).json({ error: "Authentication failed" });
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true in production (HTTPS only)
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

// Error handling middleware (should be placed after routes)
app.use((err, req, res, next) => {
  console.error('Authentication error:', err);
  res.status(500).json({ error: 'Authentication failed' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
