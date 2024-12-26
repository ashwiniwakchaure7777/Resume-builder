const jwt = require("jsonwebtoken");
const ERROR_RESPONSE = require("./handleError");
const USER_MODEL = require("../model/user.model");

module.exports.generateAccessToken = async (id,res) => {
    try{
      const payload = { id };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      return token;
    }catch(err){
      ERROR_RESPONSE(res,err)
    }
};
