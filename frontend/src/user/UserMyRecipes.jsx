import { useState, useEffect } from "react";
import { Flex, Text, Button, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import UserRecipes from "./UserRecipes";
import { getUserRecipes } from "./RecipesService";
import { getCurrentUserId } from "../commons/utils";
import ScrollContainer from "../components/ScrollContainer";

function UserMyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = getCurrentUserId();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getUserRecipes(userId);
      if (data) {
        setRecipes(data);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <>
      {!isLoading &&
        (recipes.length > 0 ? (
          <ScrollContainer>
            <UserRecipes data={recipes} isUserRecipe pathName='my-recipes' />
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
              Add your own recipe and share it with the community
            </Text>
            <Button
              mt={4}
              color='#fff'
              bgColor='#FFBE73'
              _hover={{ bgColor: "#FF8900" }}
              p='0 30px'
              borderRadius={30}
              onClick={() => navigate("/add-recipe")}
            >
              Add recipe
            </Button>
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

export default UserMyRecipes;
