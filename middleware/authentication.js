const jwt = require("jsonwebtoken");

module.exports.authentication = async (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1];

    if (!token) {
      return res.status(201).json({
        success: false,
        message: "Login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;
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
