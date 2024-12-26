const mongoose = require("mongoose");

const coverLetterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    hiringManagerName: {
      type: String,
    },
    companyDetails: {
      companyName: {
        type: String,
      },
      companyAddress: {
        type: String,
      },
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    coverLetterData: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const COVER_LETTER_SCHEMA = mongoose.model("coverLetter", coverLetterSchema);

module.exports = coverLetterSchema;
