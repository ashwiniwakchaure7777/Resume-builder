const express = require("express");
const resumeController = require("../controller/resume.controller");
const { authentication } = require("../middleware/authentication");

const route = express.Router();

route.use(authentication);

route.post("/create-resume", resumeController?.createUpdateResume);
route.get("/get-resume", resumeController?.getResume);
route.delete("/delete-resume", resumeController?.deleteResume);

module.exports = route;
