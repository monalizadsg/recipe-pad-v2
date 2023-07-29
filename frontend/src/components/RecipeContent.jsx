// import { useState } from "react";
import { Box, Flex, Image, ListItem, Text, List } from "@chakra-ui/react";
import BackButton from "./BackButton";
import favIcon from "../assets/heart.png";
import editIcon from "../assets/edit.png";
import deletetIcon from "../assets/trash.png";

const recipeData = {
  name: "Recipe name",
  description: "this is a desc",
  imgUrl: "https://source.unsplash.com/kcA-c3f_3FE",
  ingredients: "Ingredient 1\nIngredient 2\nIngredient 3",
  instructions: "Instruction 1\nInstruction 2\nInstruction 3",
};

function RecipeContent() {
  return (
    <Flex
      flexDir='column'
      gap={4}
      // border='1px solid green'
      height='calc(100vh - 60px)'
    >
      <BackButton />
      <Box p={8} pt={6} bgColor='#FFFAEF' borderRadius={10} position='relative'>
        <Flex flexDir='column' gap={5}>
          <Flex gap={10} alignItems='center'>
            <Image
              // cursor='pointer'
              boxSize='150px'
              src={recipeData.imgUrl}
              alt=''
            />
            <Flex flexDir='column' gap={2}>
              <Text as='b' fontSize='xl'>
                {recipeData.name}
              </Text>
              <Flex gap={3}>
                <Image
                  cursor='pointer'
                  boxSize='20px'
                  src={favIcon}
                  alt='Favorite Recipe'
                />
                <Image
                  cursor='pointer'
                  boxSize='25px'
                  src={editIcon}
                  alt='Favorite Recipe'
                />
                <Image
                  cursor='pointer'
                  boxSize='20px'
                  src={deletetIcon}
                  alt='Favorite Recipe'
                />
              </Flex>
            </Flex>
          </Flex>
          {recipeData.description && <Text>{recipeData.description}</Text>}
          <DisplayList title='Ingredients' list={recipeData.ingredients} />
          <DisplayList title='Instructions' list={recipeData.instructions} />
        </Flex>
      </Box>
    </Flex>
  );
}

function DisplayList({ title, list }) {
  const listArr = list.split("\n");
  return (
    <Flex flexDir='column'>
      <Text as='b' fontSize='md'>
        {title}
      </Text>
      <List>
        {listArr.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
    </Flex>
  );
}

export default RecipeContent;
