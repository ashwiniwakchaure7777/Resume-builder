const jwt = require("jsonwebtoken");

module.exports.authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(201).json({
        success: false,
        message: "Login first",
      });
    }

    const blacklistFilePath = path.join(__dirname, "blacklist.txt");

    const isTokenBlacklisted = (token) => {
      const blacklist = fs.readFileSync(blacklistFilePath, "utf-8");
      return blacklist
        .split("\n")
        .some((line) => line.startsWith(`${token} |`));
    };

    if (!token || isTokenBlacklisted(token)) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized or blacklisted" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

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
