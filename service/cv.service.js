const CV_MODEL = require("../model/cv.model");

module.exports.createCv = async (payload, res) => {
  try {
    const createdCv = await CV_MODEL.create(payload);
    return createdCv;
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.findCv = async (query, res) => {
  try {
    const cv = await CV_MODEL.findOne(query);
    return cv;
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.findandUpdateCv = async (query, update, options, res) => {
  try {
    const cv = await CV_MODEL.findOneAndUpdate(query, update, options);
    return cv;
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteCvService = async (query, res) => {
  try {
    const cv = await CV_MODEL.findOneAndDelete(query);
    return cv;
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
