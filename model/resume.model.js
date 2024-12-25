const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
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
        },
        phoneNumber: {
          type: String,
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


const RESUME_MODEL = mongoose.model("resume",resumeSchema);