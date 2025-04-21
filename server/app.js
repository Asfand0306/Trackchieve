// server/app.js
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const SteamStrategy = require("passport-steam").Strategy;
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Load environment variables from .env file

// Create Express app
const app = express();

// Check for API key
if (!process.env.STEAM_API_KEY) {
  console.error("ERROR: STEAM_API_KEY environment variable is not set!");
  console.error("Please set STEAM_API_KEY before starting the server.");
}

console.log(
  "Starting server with Steam API Key:",
  process.env.STEAM_API_KEY
    ? `${process.env.STEAM_API_KEY.substring(0, 4)}...`
    : "NOT SET"
);

// Middleware order is crucial for authentication
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup - must come before authentication middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Session setup - must come before passport
app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true in production (HTTPS only)
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      sameSite: "lax", // Helps with CORS issues
    },
  })
);

// Initialize passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Passport session setup
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user.id);
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  console.log("Deserializing user:", obj.id);
  done(null, obj);
});

// Steam Strategy
passport.use(
  new SteamStrategy(
    {
      providerURL: "https://steamcommunity.com/openid",
      returnURL: "http://localhost:5000/auth/steam/return",
      realm: "http://localhost:5000/",
      apiKey: process.env.STEAM_API_KEY,
    },
    (identifier, profile, done) => {
      console.log("Steam Authentication Successful!");
      console.log("Identifier:", identifier);
      console.log("Profile ID:", profile.id);

      // We're simply passing the profile as-is
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

// Auth routes
const authRouter = express.Router();

// Steam authentication - Initial request
authRouter.get("/steam", (req, res, next) => {
  console.log("Starting Steam authentication...");
  passport.authenticate("steam", {
    failureRedirect: "http://localhost:3000/?auth=failed",
  })(req, res, next);
});

// Steam authentication - Return callback
// Steam authentication - Return callback
authRouter.get("/steam/return", (req, res, next) => {
  console.log("Received return from Steam authentication...");

  passport.authenticate(
    "steam",
    { failureRedirect: "http://localhost:3000/?auth=failed" },
    (err, user, info) => {
      if (err) {
        console.error("Authentication error:", err);
        return res.redirect(
          "http://localhost:3000/?auth=failed&reason=" +
            encodeURIComponent(err.message)
        );
      }

      if (!user) {
        console.error("No user returned:", info);
        return res.redirect("http://localhost:3000/?auth=nouser");
      }

      console.log("Steam auth successful, logging in user:", user.displayName);

      req.logIn(user, (err) => {
        if (err) {
          console.error("Login error:", err);
          return res.redirect(
            "http://localhost:3000/?auth=loginfailed&reason=" +
              encodeURIComponent(err.message)
          );
        }

        console.log("User logged in successfully, redirecting to home");
        return res.redirect("http://localhost:3000/home/"); // Changed from /dashboard to /home
      });
    }
  )(req, res, next);
});

// User status check
authRouter.get("/user", (req, res) => {
  console.log("Auth status check. Authenticated:", req.isAuthenticated());
  console.log("Session:", req.session);

  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: req.user,
    });
  } else {
    res.json({
      isAuthenticated: false,
    });
  }
});

// Logout route
authRouter.get("/logout", (req, res) => {
  console.log("Logging out user");

  req.logout(function (err) {
    if (err) {
      console.error("Logout error:", err);
      return res
        .status(500)
        .json({ error: "Logout failed", details: err.message });
    }
    console.log("User logged out successfully");
    res.json({ success: true });
  });
});

// Debug route - session info
authRouter.get("/debug/session", (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    session: req.session,
    user: req.user,
  });
});

// Mount the auth router
app.use("/auth", authRouter);

// Root route for testing
app.get("/", (req, res) => {
  res.send("Server is running! Try accessing /auth/debug/session");
});

// Error handling middleware (placed after routes)
app.use((err, req, res, next) => {
  console.error("Authentication error:", err);
  res
    .status(500)
    .json({ error: "Authentication failed", details: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} - http://localhost:${PORT}`);
});
