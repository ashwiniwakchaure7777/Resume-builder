const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: [3, "Provide minimum 3 character"],
    },
    familyName: {
      type: String,
      min: [3, "Provide minimum 3 character"],
    },
    googleId: {
      type: String,
    },
    email: {
      type: String,
      validator: [validator.isEmail, "Provide valid email"],
    },
    mobile: {
      type: String,
      length: [10, "Provide valid 10 numbers mobile number"],
    },
    password: {
      type: String,
      length: [7, "Provide minimum 7 letters password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isSignupByOAuth: {
      type: Boolean,
      default: false,
    },
    isSubscribed: {
      type: Boolean,
      default: true,
    },
    isPremiumTaken: {
      type: Boolean,
      default: false,
    },
    rememberToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
});

// userSchema.methods.comparePassword = async function (inputPassword) {
//     return await bcrypt.compare(inputPassword, this.password);
//   };

const USER_MODEL = mongoose.model("User", userSchema);

module.exports = USER_MODEL;
