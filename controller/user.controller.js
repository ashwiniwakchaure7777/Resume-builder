const passport = require("passport");
const USER_MODEL = require("../model/user.model");
const { findUserDetails } = require("../service/user.service");
const {
  generateAccessToken,
  generateRememberToken,
} = require("../utils/generateToken");
const ERROR_RESPONSE = require("../utils/handleError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

module.exports.signup = async (req, res) => {
  try {
    const {
      firstName = "",
      familyName = "",
      googleId = "",
      email = "",
      mobile = "",
      password = "",
      role = "user",
      isSubscribed = true,
      isPremiumTaken = false,
    } = req.body;

    if (!firstName || !familyName || !email || !mobile || !password) {
      return res.status(201).json({
        success: false,
        message: "Please provide all the required details",
      });
    }

    const user = await findUserDetails({ email }, res);

    if (user) {
      return res.status(400).json({
        sucess: false,
        message: "Email already registered, Please login",
      });
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
      return res.status(201).json({
        sucess: false,
        message: "User not created",
      });
    }
    console.log(newUser);
    const token = await generateAccessToken(newUser, res);
    res
      .status(200)
      // .cookie("auth", token, { httpOnly: true, secure: true })
      .json({ success: true, token, message: "User signup successfully" });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;
    if (!email || !password) {
      return res.status(201).json({
        success: false,
        message: "Please provide all the required details",
      });
    }

    const user = await USER_MODEL.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not registered, please register first",
      });
    }

    const matchPassword = bcrypt.compareSync(password, user?.password);
    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Please enter valid credentials",
      });
    }
    const token = await generateAccessToken(user, res);

    res
      .status(200)
      // .cookie("auth", token, { httpOnly: true, secure: true })
      .json({ success: true, token, message: "User login successfully" });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const user = req.user;
    console.log("asd", user);

    const isUser = await USER_MODEL.findById(user.id);
    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "please register first",
      });
    }

    const matchPassword = bcrypt.compareSync(oldPassword, isUser?.password);
    console.log(matchPassword, "matchpassword");
    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Please enter valid credentials",
      });
    }

    const newHashPassword = bcrypt.hashSync(newPassword, 5);

    const userUpdated = await USER_MODEL.findByIdAndUpdate(
      isUser._id,
      { $set: { password: newHashPassword } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.forgetPasswordGenerateToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findUserDetails({ email });

    if (!user) {
      return res.status(201).json({
        success: false,
        message: "User not registered",
      });
    }

    const rememberToken = await generateRememberToken(user, res);

    await USER_MODEL.findByIdAndUpdate(user._id, {
      $set: { rememberToken },
    });

    res.status(200).json({
      success: true,
      message: "Token sent for reset password",
      rememberToken,
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.resetForgotPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const { rememberToken } = req.query;

    if (confirmPassword !== password) {
      return res.status(401).json({
        success: false,
        message: "Password and confirm password does not match",
      });
    }

    email = email.toLowerCase();
    const user = await findUserDetails({ email }, res);

    if (rememberToken !== user?.rememberToken) {
      return res.status(401).json({
        success: false,
        message: "Provided token is invalid, Pls try again first",
      });
    }

    const isVerified = jwt.verify(rememberToken, process.env.JWT_SECRET_KEY);

    if (!isVerified) {
      return res.status(401).json({
        success: false,
        message: "Provided token is invalid, Pls try again.",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 5);

    await USER_MODEL.findByIdAndUpdate(user._id, {
      $set: { password: hashedPassword },
    });

    res
      .status(200)
      .json({ success: true, messgae: "Password reset successfully" });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const blacklistFilePath = path.join(__dirname, "blacklist.txt");
    
    if (!token) {
      return res.status(400).json({ success: false, message: "Token missing" });
    }

    const decoded = jwt.decode(token);
    const expiresAt = decoded.exp
      ? new Date(decoded.exp * 1000).toISOString()
      : null;
    console.log(decoded, "decoded");

    const entry = `${token} | ${expiresAt}\n`;
    fs.appendFileSync(blacklistFilePath, entry, "utf-8");

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
