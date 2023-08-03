import { useState, useEffect } from "react";
import UserRecipes from "./UserRecipes";
import { getAllRecipes } from "./RecipesService";
import ScrollContainer from "../components/ScrollContainer";

function UserAllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      const recipeData = await getAllRecipes();
      setRecipes(recipeData.data);
    };

    fetchRecipeData();
  }, []);

  return (
    <>
      <ScrollContainer>
        <UserRecipes data={recipes} pathName='recipes' />
      </ScrollContainer>
    </>
  );
}

export default UserAllRecipes;
