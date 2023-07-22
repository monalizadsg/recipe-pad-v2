import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import { Grid, VStack } from "@chakra-ui/react";
import { recipeData } from "../data/RecipeData";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import RecipeNotFound from "./RecipeNotFound";

function RecipeIndex() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounce(inputValue, 500);

  useEffect(() => {
    // TODO: fetch recipe data here
    setRecipes(recipeData);
  }, []);

  useEffect(() => {
    const filteredRecipes = recipes.filter((item) =>
      item.name.toLowerCase().includes(debouncedValue.toLowerCase())
    );
    setFilteredRecipes(filteredRecipes);
  }, [debouncedValue, recipes]);

  const handleSearch = (input) => {
    setInputValue(input);
  };

  return (
    <VStack>
      <SearchBar handleSearch={handleSearch} />
      {filteredRecipes.length > 0 ? (
        <Grid templateColumns={"repeat(4, 1fr)"} gap={50} margin={10}>
          {filteredRecipes.map((data) => (
            <RecipeCard
              key={data.id}
              name={data.name}
              imgUrl={data.imgUrl}
              search={inputValue}
            />
          ))}
        </Grid>
      ) : (
        <RecipeNotFound />
      )}
    </VStack>
  );
}

export default RecipeIndex;
