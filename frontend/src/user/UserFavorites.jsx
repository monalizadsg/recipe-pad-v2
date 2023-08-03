import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import UserRecipes from "./UserRecipes";
import { getFavoriteRecipes } from "./RecipesService";

/* const favRecipesMockupData = [
  {
    id: 1,
    name: "Gyoza",
    imgUrl: "https://source.unsplash.com/kcA-c3f_3FE",
    description: "This is a description.",
    ingredients: ["cabbage, meat, onion, garlic, salt, pepper"],
    instructions: ["Mixed all ingredients. Wrap. Cook."],
  },
  {
    id: 2,
    name: "Gyoza bb",
    imgUrl: "https://source.unsplash.com/kcA-c3f_3FE",
    description: "This is a description.",
    ingredients: ["cabbage, meat, onion, garlic, salt, pepper"],
    instructions: ["Mixed all ingredients. Wrap. Cook."],
  },
  {
    id: 3,
    name: "Gyoza bb",
    imgUrl: "https://source.unsplash.com/kcA-c3f_3FE",
    description: "This is a description.",
    ingredients: ["cabbage, meat, onion, garlic, salt, pepper"],
    instructions: ["Mixed all ingredients. Wrap. Cook."],
  },
]; */

function UserFavorites() {
  const [recipes, setRecipes] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    // TODO: fetch recipe data here
    /* setRecipes(recipeData);
  }, []);*/

    const fetchRecipeData = async () => {
      const recipeData = await getFavoriteRecipes();
      setRecipes(recipeData.data);
    };

    fetchRecipeData();
  }, []);

  return (
    <>
      <UserRecipes data={recipes} pathName='favorites' />
    </>
  );
}

export default UserFavorites;
