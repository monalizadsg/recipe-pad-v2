import { useState, useEffect } from "react";
import { userRecipeMockData } from "../data/RecipeData";
import UserRecipes from "./UserRecipes";
import { getAllRecipes } from "./RecipesService";

function UserAllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // TODO: fetch recipe data here
    /* setRecipes(recipeData);
  }, []);*/

    const fetchRecipeData = async () => {
      const recipeData = await getAllRecipes();
      setRecipes(recipeData.data);
    };

    fetchRecipeData();
  }, []);

  return (
    <>
      <UserRecipes data={recipes} pathName='recipes' />
    </>
  );
}

export default UserAllRecipes;
