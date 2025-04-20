// auth.js
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Steam authentication routes
router.get(
  "/steam",
  passport.authenticate("steam", {
    failureRedirect: "/",
    failureFlash: true, // Optional: for flash messages
  })
);

router.get(
  "/steam/return",
  passport.authenticate("steam", {
    failureRedirect: "/",
    session: true, // Keep session true
  }),
  (req, res) => {
    // Successful authentication, redirect to the React app
    res.redirect("http://localhost:3000/dashboard");
  }
);

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
        return res.redirect("/");
      }
      if (!user) {
        console.error("No user returned:", info);
        return res.redirect("/");
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error("Login error:", err);
          return res.redirect("/");
        }
        return res.redirect("http://localhost:3000/dashboard");
      });
    }
  )(req, res, next);
});

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
module.exports = router;
