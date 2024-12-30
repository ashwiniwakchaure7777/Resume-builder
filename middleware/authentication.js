const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

module.exports.authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const blacklistFilePath = path.join(__dirname, "../blacklist.json");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const blacklisted = fs.existsSync(blacklistFilePath)
      ? JSON.parse(fs.readFileSync(blacklistFilePath, "utf-8"))
      : {};

    if (blacklisted[token]) {
      return res.status(401).json({
        success: false,
        message: "Token has expired, Please login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.error("Authentication error:", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please log in again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token. Please log in again.",
    });
  }
};
