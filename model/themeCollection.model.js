const mongoose = require("mongoose");

const themeCollectionSchema = new mongoose.Schema(
  {
    themeName: {
      type: String,
      trim: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
    previewImage: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
  },
  {
    timestamps: true,
  }
);

const THEME_COLLECTION_MODEL = mongoose.model(
  "themecollection",
  themeCollectionSchema
);

module.exports = THEME_COLLECTION_MODEL;
