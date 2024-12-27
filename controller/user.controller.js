const USER_MODEL = require("../model/user.model");
const {
  generateToken,
  generateAccessToken,
} = require("../utils/generateToken");
const ERROR_RESPONSE = require("../utils/handleError");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res) => {
  try {
    const {
      firstName = "",
      familyName = "",
      googleId = "",
      email = "",
      mobile = "",
      password = "",
      role = "",
      isSubscribed = true,
      isPremiumTaken = false,
    } = req.body;

    if (!firstName || !familyName || !email || !mobile || !password || !role) {
      return res.status(201).json({
        success: false,
        message: "Please provide all the required details",
      });
    }

    const user = await findUserDetail({ email },res);

    if (user) {
      return res
        .status(201)
        .json({ sucess: false, message: "Email already registered" });
    }

    const newUser = await USER_MODEL.create({
      firstName,
      familyName,
      googleId,
      email,
      mobile,
      password,
      role,
      isSubscribed,
      isPremiumTaken,
    });

    if (!newUser) {
      return res
        .status(201)
        .json({ sucess: false, message: "User not created" });
    }
    console.log(newUser);
    const token = await generateAccessToken(newUser?._id, res);
    const cookieName = newUser.role;
    res
      .status(200)
      .cookie(cookieName, token, { httpOnly: true, secure: true })
      .json({ success: true, token, message: "User signup successfully" });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(201).json({
        success: false,
        message: "Please provide all the required details",
      });
    }

    const user = await USER_MODEL.findOne({ email });
    if (!user) {
      return res.status(203).json({
        success: false,
        message: "User not registered,please register first",
      });
    }
    console.log(user);

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res
        .status(201)
        .json({ success: false, message: "Input incorrect" });
    }
    const token = await generateAccessToken(user?._id, res);
    console.log(token, "difudi");

    const cookieName = user.role;
    res
      .status(200)
      .cookie(cookieName, token, { httpOnly: true, secure: true })
      .json({ success: true, token, message: "User login successfully" });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
