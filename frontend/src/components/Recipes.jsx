import { Flex, Text } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";
import recipe_bowl from "../assets/bowl.png";

const recipeData = [
  {
    id: 1,
    name: "Recipe 1",
    imgUrl: "https://source.unsplash.com/kcA-c3f_3FE",
  },
  {
    id: 2,
    name: "Recipe 2",
    imgUrl: "https://source.unsplash.com/zcUgjyqEwe8",
  },
  {
    id: 3,
    name: "Recipe 3",
    imgUrl: "https://source.unsplash.com/vIm26fn_QKg",
  },
];

function Recipes() {
  return (
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      // bgColor='#FAECED'
      p='20px'
    >
      <Flex
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
        mb='30px'
      >
        <img
          src={recipe_bowl}
          alt='recipe_bowl'
          style={{ width: "5%", height: "auto" }}
        />
        <Text fontWeight={600} ml={2}>
          Try Out New Recipes
        </Text>
      </Flex>
      <Flex w='80%' justifyContent='center' gap={3}>
        {recipeData.map((item) => (
          <RecipeCard key={item.id} name={item.name} imgUrl={item.imgUrl} />
        ))}
      </Flex>
    </Flex>
  );
}

export default Recipes;
