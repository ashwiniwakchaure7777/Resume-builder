const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "project",
  },
  resumeId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'resume'
  },
  projectName: {
    type: String,
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  endDate: {
    type: Date,
    default: new Date(),
  },
  projectDescription: {
    type: String,
  },
});

const PROJECT_MODEL = mongoose.model("project", projectSchema);
module.exports = PROJECT_MODEL;
