const express = require("express");
const userController = require("../controller/user.controller");
const { authenticate } = require("passport");
const { authentication } = require("../middleware/authentication");
const route = express.Router();

route.post("/signup", userController?.signup);
route.post("/login", userController?.login);
route.post("/forget-password", userController?.forgetPasswordGenerateToken);
route.post("/reset-password", userController?.resetForgotPassword);

route.use(authentication);
route.patch("/change-password", userController?.changePassword);
route.post("/logout",userController?.logout);

module.exports = route;
