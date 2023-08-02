import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import { RecipeModel } from "../model/Recipes.js";
import { UserModel } from "../model/Users.js";
import calculateRatings from "../utils/calculateRatings.js";
import { uploadFileAndGetURL } from "../cloudinary/index.js";

const router = express.Router();

router.use(bodyParser.json());

const uploader = multer({
  dest: "uploads/",
});

// get all recipes
router.get("/", async (req, res) => {
  try {
    const result = await RecipeModel.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get user recipes
router.get("/user-recipes/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const userRecipes = await RecipeModel.find({ recipeOwnerId: userId });
    res.status(200).json({ userRecipes });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get recipe by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let recipe = await RecipeModel.findById(id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error getting a recipe by id" });
  }
});

// create new recipe
router.post("/", uploader.single("file"), async (req, res) => {
  const { name, description, ingredients, instructions, ownerId } = req.body;
  const imgUrl = await uploadFileAndGetURL(req.file.path);

  try {
    const newRecipe = new RecipeModel({
      name,
      description,
      imgUrl,
      ingredients,
      instructions,
      overallRating: null,
      recipeOwnerId: ownerId,
    });

    const recipe = await newRecipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error saving recipe to the database." });
  }
});

// edit recipe
router.put("/", uploader.single("file"), async (req, res) => {
  const { id, name, description, ingredients, instructions } = req.body;
  let imgUrl = req.body.imgUrl;
  if (!imgUrl) {
    imgUrl = await uploadFileAndGetURL(req.file.path);
  }

  try {
    const result = await RecipeModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        imgUrl,
        ingredients,
        instructions,
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe" });
  }
});

// delete a recipe
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await RecipeModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting a recipe" });
  }
});

// save a favorite recipe
router.put("/favorites", async (req, res) => {
  const recipe = await RecipeModel.findById(req.body.recipeId);
  const user = await UserModel.findById(req.body.userId);

  try {
    user.favoriteRecipes.push(recipe);
    await user.save();
    res.status(200).json({ favoriteRecipes: user.favoriteRecipes });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// get favorite recipes
router.get("/favorites/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const favRecipes = await RecipeModel.find({
      _id: { $in: user.favoriteRecipes },
    });
    res.status(200).json({ favoriteRecipes: favRecipes });
  } catch (error) {
    res.status(500).json(error);
  }
});

// remove favorite recipe
router.delete("/favorites/:userId", async (req, res) => {
  const { recipeId } = req.body;

  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // remove recipe from the favoriteRecipes array
    user.favoriteRecipes.pull(recipeId);
    await user.save();
    // return the updated array
    res.status(200).json({ favoriteRecipes: user.favoriteRecipes });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// add a review for a recipe
router.post("/:recipeId/reviews", async (req, res) => {
  const recipeId = req.params.recipeId;
  const { reviewerId, comment, rating } = req.body;

  try {
    // Validate the review data
    if (!reviewerId || !rating) {
      return res
        .status(400)
        .json({ error: "Reviewer, and rating are required fields" });
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ error: "Rating must be a number between 1 and 5" });
    }

    // Check if the recipe exists
    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Check if the reviewer is the owner of the recipe
    if (recipe.recipeOwnerId.toString() === reviewerId) {
      return res
        .status(400)
        .json({ error: "You cannot review your own recipe" });
    }

    // Create the review object
    const newReview = {
      reviewerId: reviewerId,
      comment: comment,
      rating: rating,
    };
    // Add the review to the recipe's reviews array
    recipe.reviews.push(newReview);

    // Calculate the new overallRating
    recipe.overallRating = calculateRatings(recipe.reviews);

    // save updated recipe
    await recipe.save();
    return res.json({ recipe });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// get recipe reviews
router.get("/:recipeId/reviews", async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    // Find the recipe by its ID
    const recipe = await RecipeModel.findById(recipeId);

    // Check if the recipe exists
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Return the reviews for the recipe
    const reviews = recipe.reviews;
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Edit recipe review
router.put("/:recipeId/reviews/:reviewId", async (req, res) => {
  const recipeId = req.params.recipeId;
  const reviewId = req.params.reviewId;
  const { reviewer, comment, rating } = req.body;

  try {
    // Find the recipe by its ID
    const recipe = await RecipeModel.findById(recipeId);

    // Check if the recipe exists
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Find the review within the recipe's reviews array
    const reviewIndex = recipe.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );

    // Check if the review exists in the recipe's reviews array
    if (reviewIndex === -1) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Check if the reviewer is the owner of the review
    if (recipe.reviews[reviewIndex].reviewer.toString() !== reviewer) {
      return res
        .status(403)
        .json({ error: "You are not allowed to edit this review" });
    }

    // Update the review comment and rating
    recipe.reviews[reviewIndex].comment = comment;
    recipe.reviews[reviewIndex].rating = rating;

    // Recalculate the overallRating for the recipe
    recipe.overallRating = calculateRatings(recipe.reviews);

    // Save the updated recipe
    await recipe.save();

    // Return the updated recipe
    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Delete recipe review
router.delete("/:recipeId/reviews/:reviewId", async (req, res) => {
  const recipeId = req.params.recipeId;
  const reviewId = req.params.reviewId;

  try {
    // Find the recipe by its ID
    const recipe = await RecipeModel.findById(recipeId);

    // Check if the recipe exists
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Find the index of the review within the recipe's reviews array
    const reviewIndex = recipe.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );

    // Check if the review exists in the recipe's reviews array
    if (reviewIndex === -1) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Check if the requester is the owner of the review
    const reviewerId = req.body.reviewer;
    if (recipe.reviews[reviewIndex].reviewer.toString() !== reviewerId) {
      return res
        .status(403)
        .json({ error: "You are not allowed to delete this review" });
    }

    // Remove the review from the recipe's reviews array
    recipe.reviews.splice(reviewIndex, 1);

    // Recalculate the overallRating for the recipe
    recipe.overallRating = calculateRatings(recipe.reviews);

    // Save the updated recipe
    await recipe.save();

    // Return the updated recipe
    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export { router as recipeRouter };
