import { useState, useEffect } from "react";
import { Grid, GridItem, Flex } from "@chakra-ui/react";
import RecipeCard from "../components/RecipeCard";
// import { useNavigate } from "react-router-dom";
import ScrollContainer from "../components/ScrollContainer";
import SearchBar from "../components/SearchBar";
import { useDebounce } from "use-debounce";
import AddRecipeCard from "./AddRecipeCard";
import RecipeNotFound from "../components/RecipeNotFound";

function UserRecipes({ data, isUserRecipe }) {
  const [recipes, setRecipes] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [debouncedValue] = useDebounce(inputValue, 500);
  // const navigate = useNavigate();

  useEffect(() => {
    setRecipes(data);
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
      <ScrollContainer>
        <Flex justifyContent='center' mb={3}>
          <SearchBar handleSearch={handleSearch} />
        </Flex>
        {filteredRecipes.length > 0 ? (
          <Grid templateColumns='repeat(4, 1fr)' gap={10} w='100%'>
            {isUserRecipe && <AddRecipeCard />}
            {filteredRecipes.map((item) => (
              <GridItem key={item.id}>
                <RecipeCard name={item.name} imgUrl={item.imgSrc} />
              </GridItem>
            ))}
          </Grid>
        ) : (
          <RecipeNotFound />
        )}
      </ScrollContainer>
    </>
  );
}

export default UserRecipes;
