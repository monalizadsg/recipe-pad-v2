import { useState, useEffect } from "react";
import { userRecipeMockData } from "../data/RecipeData";
import UserRecipes from "./UserRecipes";

function UserAllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // TODO: fetch recipe data here
    setRecipes(userRecipeMockData);
  }, []);

  return (
    <>
      <UserRecipes data={recipes} />
    </>
  );
}

export default UserAllRecipes;
