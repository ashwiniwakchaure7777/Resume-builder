const RESUME_MODEL = require("../model/resume.model");
const USER_MODEL = require("../model/user.model");
const {
  findResume,
  findandUpdateResume,
} = require("../service/resume.service");
const ERROR_RESPONSE = require("../utils/handleError");

module.exports.createUpdateResume = async (req, res) => {
  try {
    const {
      fullName = "",
      position = "",
      objective = "",
      mainContact = [],
      socialContact = [],
      education = [],
      work = [],
      certificate = [],
      project = [],
      achievement = [],
      languages = [],
      interest = [],
      skills = [],
    } = req.body;

    const userId = req.user._id;
    console.log(req.body);

    const isResume = await findResume({ userId }, res);

    const payload = {
      fullName,
      userId,
      position,
      objective,
      mainContact,
      socialContact,
      education,
      work,
      certificate,
      project,
      achievement,
      languages,
      interest,
      skills,
    };

    console.log("payload", payload);

    let resume = await findandUpdateResume(
      { userId },
      payload,
      { new: true, upsert: true },
      res
    );

    res.status(200).json({
      success: true,
      message: "Resume created or updated successfully",
      resume,
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.getResume = async (req, res) => {
  try {
    const user = req.user;

    const isResume = await findResume({ userId: user._id },res);

    if (!isResume) {
      return res.status(201).json({
        success: false,
        message: "resume not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Resume fetched successfully",
      isResume,
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteResume = async (req, res) => {
  try {
    const user = req.user;

    const isResume = await findResume({ userId: user._id },res);

    if (!isResume) {
      return res.status(201).json({
        success: false,
        message: "resume not found",
      });
    }

    await RESUME_MODEL.deleteOne({ userId: user._id },res);

    return res.status(201).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
