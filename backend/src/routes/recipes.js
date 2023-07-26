import express from "express";
import { RecipeModel } from "../model/Recipes.js";
import { UserModel } from "../model/Users.js";

const router = express.Router();

// get all recipes
router.get("/", async (req, res) => {
  try {
    const result = await RecipeModel.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create new recipe
router.post("/", async (req, res) => {
  console.log(req.body);
  const { name, description, ingredients, instructions, userOwner } = req.body;
  // TODO: update imgUrl
  const imgUrl = "https://source.unsplash.com/kcA-c3f_3FE";

  // generate unique id
  // let generatedRecipeId;
  // let unique = false;

  // while (!unique) {
  //   // Generate a random number as the userId
  //   generatedRecipeId = generateRandomNumber(1, 99999); // Modify the range as needed

  //   // Check if the userId already exists in the collection
  //   const existingRecipe = await RecipeModel.findOne({
  //     id: generatedRecipeId,
  //   });

  //   if (!existingRecipe) {
  //     // If the userId is unique, exit the loop
  //     unique = true;
  //   }
  // }

  // TODO: figure out how to add overallRating
  let overallRating = null;

  try {
    const newRecipe = new RecipeModel({
      // id: generatedRecipeId,
      name,
      description,
      imgUrl,
      ingredients,
      instructions,
      overallRating,
      userOwner,
      // ownerID, // TODO: add ownerID
    });

    const recipe = await newRecipe.save();
    console.log(newRecipe);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error saving recipe to the database." });
    console.log(error);
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

// edit recipe
router.put("/", async (req, res) => {
  const { id, name, description, imgUrl, ingredients, instructions } = req.body;

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
    res.status(500).json(error);
  }
});

export { router as recipeRouter };