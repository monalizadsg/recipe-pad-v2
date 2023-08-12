import { useEffect, useState } from "react";
import UserRecipes from "./UserRecipes";
import { getFavoriteRecipes } from "./RecipesService";
import ScrollContainer from "../components/ScrollContainer";
import { Flex, Text, Spinner } from "@chakra-ui/react";
import { getCurrentUserId } from "../commons/utils";

function UserFavorites() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = getCurrentUserId();

  useEffect(() => {
    const fetchRecipeData = async () => {
      setIsLoading(true);
      const recipeData = await getFavoriteRecipes(userId);
      if (recipeData) {
        setRecipes(recipeData.data.favoriteRecipes);
        setIsLoading(false);
      }
    };

    fetchRecipeData();
  }, [userId]);

  return (
    <>
      {!isLoading &&
        (recipes.length > 0 ? (
          <ScrollContainer>
            <UserRecipes data={recipes} pathName='favorites' />
          </ScrollContainer>
        ) : (
          <Flex
            flexDir='column'
            alignItems='center'
            justifyContent='center'
            h='100%'
            border='3px dashed #FFBE73'
          >
            <Text fontSize='lg' as='b'>
              No favorite recipes yet.
            </Text>
          </Flex>
        ))}
      {isLoading && (
        <Flex alignItems='center' justifyContent='center' h='100%'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Flex>
      )}
    </>
  );
}

export default UserFavorites;
