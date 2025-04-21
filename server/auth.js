// auth.js
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Steam authentication routes
router.get(
  "/steam",
  passport.authenticate("steam", {
    failureRedirect: "/",
  })
);

// Fixed: Removed duplicate route and improved error handling
router.get("/steam/return", (req, res, next) => {
  passport.authenticate(
    "steam",
    {
      failureRedirect: "/",
      session: true,
    },
    (err, user, info) => {
      if (err) {
        console.error("Authentication error:", err);
        return res.redirect("http://localhost:3000/?auth=failed");
      }
      if (!user) {
        console.error("No user returned:", info);
        return res.redirect("http://localhost:3000/?auth=nouser");
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error("Login error:", err);
          return res.redirect("http://localhost:3000/?auth=loginfailed");
        }
        return res.redirect("http://localhost:3000/dashboard");
      });
    }
  )(req, res, next);
});

// User status check
router.get("/user", (req, res) => {
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

// Add logout route
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ success: true });
  });
});

module.exports = router;
