import { useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { userRecipeMockData } from "../data/RecipeData";
import UserRecipes from "./UserRecipes";

function UserMyRecipes() {
  const [recipes, setRecipes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // TODO: fetch recipe data here
    setRecipes(userRecipeMockData);
  }, []);

  return (
    <>
      {recipes.length > 0 ? (
        <UserRecipes data={recipes} isUserRecipe />
      ) : (
        <Flex
          // border='1px solid red'
          flexDir='column'
          alignItems='center'
          justifyContent='center'
          h='100%'
        >
          <Text fontSize='lg'>
            Add your own recipe and share it with the community
          </Text>
          <Button
            mt={4}
            color='#fff'
            bgColor='#FE7071'
            p='0 30px'
            borderRadius={30}
            _hover={{ opacity: 0.8 }}
            onClick={() => navigate("/my-recipes/add")}
          >
            Add recipe
          </Button>
        </Flex>
      )}
    </>
  );
}

export default UserMyRecipes;
