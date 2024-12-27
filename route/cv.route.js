const express = require('express');
const cvController = require('../controller/cv.controller');
const {authentication} = require('../middleware/authentication');

const route = express.Router();

route.use(authentication);

route.post("/create-cv",cvController?.createUpdateCv);
route.get("/get-cv",cvController?.getCv);
route.delete("/delete-cv",cvController?.deleteCv);

module.exports = route;