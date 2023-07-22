import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import UserRecipes from "./UserRecipes";

const favRecipesMockupData = [
  {
    id: 1,
    name: "Gyoza",
    imgSrc: "https://source.unsplash.com/kcA-c3f_3FE",
    description: "This is a description.",
    ingredients: ["cabbage, meat, onion, garlic, salt, pepper"],
    instructions: ["Mixed all ingredients. Wrap. Cook."],
  },
  {
    id: 2,
    name: "Gyoza bb",
    imgSrc: "https://source.unsplash.com/kcA-c3f_3FE",
    description: "This is a description.",
    ingredients: ["cabbage, meat, onion, garlic, salt, pepper"],
    instructions: ["Mixed all ingredients. Wrap. Cook."],
  },
  {
    id: 3,
    name: "Gyoza bb",
    imgSrc: "https://source.unsplash.com/kcA-c3f_3FE",
    description: "This is a description.",
    ingredients: ["cabbage, meat, onion, garlic, salt, pepper"],
    instructions: ["Mixed all ingredients. Wrap. Cook."],
  },
];

function UserFavorites() {
  const [recipes, setRecipes] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    // TODO: fetch recipe data here
    const newRecipes = favRecipesMockupData.map((item) => {
      return { ...item, isFavorite: true };
    });
    setRecipes(newRecipes);
  }, []);

  return (
    <>
      <UserRecipes data={recipes} />
    </>
  );
}

export default UserFavorites;
