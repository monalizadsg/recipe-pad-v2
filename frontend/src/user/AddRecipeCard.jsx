import { Flex, Image, Text } from "@chakra-ui/react";
import plusRecipe from "../assets/plusRecipe.png";
import { useNavigate } from "react-router-dom";

function AddRecipeCard() {
  const navigate = useNavigate();
  return (
    <Flex
      flexDir='column'
      border='2px dashed #FFBE73'
      h='280px'
      w='250px'
      alignItems='center'
      justifyContent='center'
      cursor='pointer'
      _hover={{
        bgColor: "#FFD480",
        color: "#fff",
      }}
      onClick={() => navigate("/add-recipe")}
    >
      <Image src={plusRecipe} w='50px' h='50px' />
      <Text fontWeight={600}>Add new recipe</Text>
    </Flex>
  );
}

export default AddRecipeCard;
