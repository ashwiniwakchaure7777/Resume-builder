const express = require("express");
const userController = require("../controller/user.controller");
const route = express.Router();

route.post("/signup", userController?.signup);
route.post("/login", userController?.login);

module.exports = route;