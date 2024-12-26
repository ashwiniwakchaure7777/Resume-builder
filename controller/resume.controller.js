const RESUME_MODEL = require("../model/resume.model");
const USER_MODEL = require("../model/user.model");
const { findResume, findandUpdateResume } = require("../service/resume.service");
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

    // Use `req.user` from authentication middleware
    const userId = req.user._id;

    // Check if a resume already exists for this user
    const isResume = await findResume(userId);

    // Build the payload
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

    let resume;

    if (isResume) {
      // Update existing resume
      resume = await findandUpdateResume({ userId }, payload, { new: true, upsert: true });
    } else {
      // Create a new resume
      resume = await new RESUME_MODEL(payload).save(); // Replace `RESUME_MODEL` with your model
    }

    // Send success response
    res.status(200).json({ success: true, message: "Resume created or updated successfully", resume });
  } catch (error) {
    // Handle errors
    ERROR_RESPONSE(res, error);
  }
};


module.exports.getResume = async (req, res) => {
  try {
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.updateResume = async (req, res) => {
  try {
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteResume = async (req, res) => {
  try {
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
