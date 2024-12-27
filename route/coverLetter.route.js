const express = require("express");
const coverLetterController = require("../controller/coverLetter.controller");
const { authentication } = require("../middleware/authentication");
const route = express.Router();

route.use(authentication);

route.post(
  "/create-coverLetter",
  coverLetterController?.createUpdateCoverLetter
);
route.get("/get-coverLetter", coverLetterController?.getCoverLetter);
route.delete("/delete-coverLetter", coverLetterController?.deleteCoverLetter);

module.exports = route;
