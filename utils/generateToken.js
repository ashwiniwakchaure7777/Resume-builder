const jwt = require("jsonwebtoken");
const ERROR_RESPONSE = require("./handleError");

module.exports.generateAccessToken = async (user, res) => {
  try {
    const payload = {
      id: user?._id,
      firstName: user?.firstName,
      email: user?.email,
      role: user?.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,{expiresIn:"24h"});
    return token;
  } catch (err) {
    ERROR_RESPONSE(res, err);
  }
};

module.exports.generateRememberToken = async (user, res) => {
  try {
    const payload = {
      id: user?._id,
      email: user?.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });
    return token;
  } catch (err) {
    ERROR_RESPONSE(res, err);
  }
};
