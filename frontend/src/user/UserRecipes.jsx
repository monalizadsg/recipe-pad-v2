import { useState, useEffect } from "react";
import { Grid, GridItem, Flex } from "@chakra-ui/react";
import RecipeCard from "../components/RecipeCard";
// import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useDebounce } from "use-debounce";
import AddRecipeCard from "./AddRecipeCard";
import RecipeNotFound from "../components/RecipeNotFound";
import { ProfileMenu } from "../components/ProfileMenu";

function UserRecipes({ data, isUserRecipe, pathName }) {
  const [recipes, setRecipes] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [debouncedValue] = useDebounce(inputValue, 500);
  // const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data]);

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
    <>
      <Flex justifyContent="center" mb={3}>
        <SearchBar handleSearch={handleSearch} />
      </Flex>
      {filteredRecipes.length > 0 ? (
        <Grid templateColumns="repeat(4, 1fr)" gap={10} w="100%">
          {isUserRecipe && <AddRecipeCard />}
          {filteredRecipes.map((item) => (
            <GridItem key={item._id}>
              <RecipeCard
                id={item._id}
                name={item.name}
                imgUrl={item.imgUrl}
                isUserRecipe
                pathName={pathName}
              />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <RecipeNotFound />
      )}
    </>
  );
}

export default UserRecipes;
