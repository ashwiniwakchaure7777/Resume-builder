const mongoose = require("mongoose");
const validator = require('validator');
const { default: isEmail } = require("validator/lib/isEmail");

const cvSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    position: {
        type: String,
    },
    objective: {
      type: String,
    },
    mainContact: [
      {
        email: {
            type: String,
            validator:[validator.isEmail,"Please provide valid email"]
        },
        phoneNumber: {
          type: String,
          length:[10,"Please provide 10 number phonne number"]
        },
        country: {
          type: String,
        },
        city: {
          type: String,
        },
        address: {
          type: String,
        },
      },
    ],
    socialContact: [{
        linkedinDetails:{
            type: String,
        },
        twitter:{
            type: String,
        },
        facebook:{
            type: String,
        },
        quora:{
            type: String,
        },
        github:{
            type: String,
        },
        instagram:{
            type: String,
        }
    }],
    education: [
      {
        studyProgram: {
          type: String,
        },
        institution: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        cityCountryCGPA: {
          type: String,
        },
        courseProject: {
          type: String,
        },
      },
    ],
    work: [
      {
        position: {
          type: String,
        },
        company: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
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
      },
    ],
    certificate: [
      {
        certificateName: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        certificateDescription: {
          type: String,
        },
      },
    ],
    project: [
      {
        projectName: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        projectDescription: {
          type: String,
        },
      },
    ],
    achievement: [
      {
        achievementName: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        achievementDescription: {
          type: String,
        },
      },
    ],
    languages: [
      {
        type: String,
      },
    ],
    interest: [
      {
        type: String,
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);


const CV_MODEL = mongoose.model("cv",cvSchema);

module.exports = CV_MODEL;