const { query } = require("express");
const {
  getCoverLetter,
  getCoverLetterService,
  createUpdateCoverLetter,
  deleteCoverLetterService,
} = require("../service/coverLetter.service");
const ERROR_RESPONSE = require("../utils/handleError");

module.exports.createUpdateCoverLetter = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const {
      hiringManagerName = "",
      companyDetails = [],
      coverLetterData,
    } = req.body;

    const payload = {
      userId,
      hiringManagerName,
      companyDetails,
      coverLetterData,
    };

    const coverLetter = await createUpdateCoverLetter(
      { userId },
      payload,
      { upsert: true, new: true },
      res
    );

    if (!coverLetter) {
      return res
        .status(201)
        .json({ success: false, message: "Cover letter not created" });
    }

    res
      .status(200)
      .json({ success: true, message: "Cover letter created successfully" });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.getCoverLetter = async (req, res) => {
  try {
    const user = req.user;
    console.log(user, "get");
    const coverLetter = await getCoverLetterService({ userId: user.id }, res);

    if (!coverLetter) {
      return res
        .status(201)
        .json({ success: false, message: "Cover letter not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Cover letter fetched successfully",
        coverLetter,
      });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteCoverLetter = async (req, res) => {
  try {
    const user = req.user;

    const cl = await deleteCoverLetterService({ userId: user.id }, res);

    console.log(cl);
    return res.status(201).json({
      success: true,
      message: "Cover letter deleted successfully",
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
