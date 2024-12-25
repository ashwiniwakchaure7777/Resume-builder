const express = require("express");
const passport = require("passport");
const route = express.Router();

route.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

route.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

route.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

route.get("/profile", (req, res) => {
  console.log(req.user);
  res.send(`Welcome ${req.user.email}`);
});

route.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Error logging out");
    res.redirect("/");
  });
});

module.exports = route;
