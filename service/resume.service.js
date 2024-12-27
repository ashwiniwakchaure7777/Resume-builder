const RESUME_MODEL = require("../model/resume.model");

module.exports.createResume = async (payload, res) => {
  try {
    const createdResume = await RESUME_MODEL.create(payload);
    return createdResume;
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.findResume = async (query, res) => {
  try {
    const resume = await RESUME_MODEL.findOne(query);
    return resume;
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.findandUpdateResume = async (query, update, options, res) => {
  try {
    const resume = await RESUME_MODEL.findOneAndUpdate(query, update, options);
    return resume;
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteResumeService = async (query, res) => {
  try {
    const resume = await RESUME_MODEL.findOneAndDelete(query);
    return resume;
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
