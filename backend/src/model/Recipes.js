import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  overallRating: {
    type: Number,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: [reviewSchema],
});

export const RecipeModel = mongoose.model("Recipes", RecipeSchema);
