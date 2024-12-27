const { findCv, deleteCvService, findandUpdateCv } = require("../service/cv.service");
const ERROR_RESPONSE = require("../utils/handleError");

module.exports.createUpdateCv = async (req, res) => {
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

    const isCv = await findCv({ userId }, res);

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

    let cv = await findandUpdateCv(
      { userId },
      payload,
      { new: true, upsert: true },
      res
    );

    res.status(200).json({
      success: true,
      message: "CV created or updated successfully",
      cv,
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.getCv = async (req, res) => {
  try {
    const user = req.user;

    const isResume = await findCv({ userId: user._id },res);

    if (!isResume) {
      return res.status(201).json({
        success: false,
        message: "resume not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Cv fetched successfully",
      isResume,
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteCv = async (req, res) => {
  try {
    const user = req.user;

    const isResume = await findCv({ userId: user._id },res);

    if (!isResume) {
      return res.status(201).json({
        success: false,
        message: "resume not found",
      });
    }

    await deleteCvService({ userId: user._id },res);

    return res.status(201).json({
      success: true,
      message: "CV deleted successfully",
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
