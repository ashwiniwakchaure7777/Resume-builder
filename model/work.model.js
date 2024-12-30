const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "work",
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "resume",
  },
  workPosition: {
    type: String,
  },
  company: {
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
  companyDescription: {
    type: String,
  },
  taskAchiement: {
    type: String,
  },
  contact: [
    {
      contactPerson: { type: String },
      contactInfo: { type: String },
    },
  ],
});

const WORK_MODEL = mongoose.model("work", workSchema);

module.exports = WORK_MODEL;
