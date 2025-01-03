const express = require("express");
const { dbConnection } = require("./config/dbConnection");
require("dotenv").config();
const userRoute = require("./route/user.route");
const resumeRoute = require("./route/resume.route");
const cvRoute = require("./route/cv.route");
const coverLetterRoute = require("./route/coverLetter.route");
const googleAuthRoute = require("./route/googleAuth.route");
const passport = require("./config/passport");
const session = require("express-session");
const cors = require("cors");
const { cleanupBlacklist } = require("./utils/cleanupBlacklist ");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/user", userRoute);
app.use("/api/resume", resumeRoute);
app.use("/api/cv", cvRoute);
app.use("/api/coverletter", coverLetterRoute);

app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/profile", (req, res) => {
  console.log(req.user);
  res.send(`Welcome ${req.user.email}`);
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Error logging out");
    res.redirect("/");
  });
});
cleanupBlacklist();

app.listen(process.env.PORT || 4500, () => {
  try {
    dbConnection();
    console.log("Server is running on port 4500...");
  } catch (error) {
    console.log("Server connection issue", error);
  }
});
