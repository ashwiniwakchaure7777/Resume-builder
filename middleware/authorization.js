const jwt = require("jsonwebtoken");

module.exports.authorization = async (...role) => {
  return async (req, res, next) => {
    const token = req.headers.authorization.split("")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Please login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = User.findById(decoded.id);

    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised, you are not authorised",
      });
    }

    if (!role.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorised to perform this action",
      });
    }
  };
};
