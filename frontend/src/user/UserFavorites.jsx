import { useEffect, useState } from "react";
import UserRecipes from "./UserRecipes";
import { getFavoriteRecipes } from "./RecipesService";
import ScrollContainer from "../components/ScrollContainer";

function UserFavorites() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      const recipeData = await getFavoriteRecipes();
      setRecipes(recipeData.data);
    };

    fetchRecipeData();
  }, []);

  return (
    <>
      <ScrollContainer>
        <UserRecipes data={recipes} pathName='favorites' />
      </ScrollContainer>
    </>
  );
}

export default UserFavorites;
