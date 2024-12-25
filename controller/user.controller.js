const USER_MODEL = require("../model/user.model");
const { generateToken } = require("../utils/generateToken");

module.exports.signup = async (req, res) => {
  try {
    const {
      firstName = "",
      familyName = "",
      email = "",
      mobile = "",
      password = "",
      role = "",
      isSubscribed = true,
      isPremiumTaken = false,
    } = req.body;

    if (
      !firstName ||
      !familyName ||
      !email ||
      !mobile ||
      !password ||
      !role ||
      !isSubscribed ||
      !isPremiumTaken
    ) {
      return res.status(201).json({
        success: false,
        message: "Please provide all the required details",
      });
    }

    const user = await USER_MODEL.findOne({ email });

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
      resume,
      cv,
      coverLetter,
      role,
      isSubscribed,
      isPremiumTaken,
    });

    if (!newUser) {
      return res
        .status(201)
        .json({ sucess: false, message: "User not created" });
    }

    const token = await generateToken(newUser);
    res
      .status(200)
      .json({ success: true, message: "User already registered", token });
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, message: "Internal error", error });
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
      return res
        .status(203)
        .json({ success: false, message: "User not registered" });
    }

    const matchPassword = await USER_MODEL.comparePassword(password);
    if (!matchPassword) {
      return res
        .status(201)
        .json({ success: false, message: "Input incorrect" });
    }
    const token = user.generateToken();

    res
      .status(200)
      .json({ success: true, token, message: "User login successfully" });
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, message: "Internal error", error });
  }
};
