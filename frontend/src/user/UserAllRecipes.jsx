import { useState, useEffect } from "react";
import UserRecipes from "./UserRecipes";
import { getAllRecipes, getFavoriteRecipes } from "./RecipesService";
import ScrollContainer from "../components/ScrollContainer";
import { getCurrentUserId } from "../commons/utils";

function UserAllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const userId = getCurrentUserId();

  useEffect(() => {
    const fetchFavRecipeData = async () => {
      const recipeData = await getFavoriteRecipes(userId);
      if (recipeData) {
        setFavoriteRecipes(recipeData.data.favoriteRecipes);
      }
    };

    fetchFavRecipeData();
  }, [userId]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      const recipeData = await getAllRecipes();
      const updatedRecipes = recipeData.data.map((recipe) => ({
        ...recipe,
        isFavorite: favoriteRecipes.some(
          (favRecipe) => favRecipe.id === recipe.id
        ),
      }));

      setRecipes(updatedRecipes);
    };

    fetchRecipeData();
  }, [favoriteRecipes]);

  return (
    <>
      <ScrollContainer>
        <UserRecipes data={recipes} pathName='recipes' />
      </ScrollContainer>
    </>
  );
}

export default UserAllRecipes;
