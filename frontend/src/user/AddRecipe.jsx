import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  Flex,
} from "@chakra-ui/react";
import ImageUploader from "../components/ImageUploader";
import BackButton from "../components/BackButton";
import { addRecipe } from "./RecipesService";
import { CustomToast, getCurrentUserId } from "../commons/utils";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
  const [recipeData, setRecipeData] = useState({
    image: "",
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
  });
  const [image, setImage] = useState(null);
  const ownerId = getCurrentUserId();
  const navigate = useNavigate();
  const { addToast } = CustomToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (imageFile) => {
    setImage(imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: handle the recipe submission here
    const recipe = {
      name: recipeData.title,
      description: recipeData.description,
      imgFile: image,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
      ownerId: ownerId,
    };
    const result = await addRecipe(recipe);
    if (result.status === 201) {
      addToast({
        title: "Recipe created!",
        type: "success",
      });
      setTimeout(navigate("/my-recipes"), 4000);
    }
  };

  return (
    <Flex
      flexDir='column'
      gap={4}
      // border='1px solid green'
      height='calc(100vh - 60px)'
    >
      <BackButton />
      <Box p={8} pt={6} bgColor='#FFFAEF' borderRadius={10} position='relative'>
        <Heading size='md' mb={6}>
          New Recipe
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={3} align='stretch' alignItems='center'>
            {/* Image Upload */}
            <ImageUploader onChange={handleImageChange} />

            {/* Title */}
            <FormControl>
              <Input
                type='text'
                name='title'
                fontWeight={700}
                variant='unstyled'
                placeholder='Title your recipe...'
                fontSize='xl'
                sx={{ "::placeholder": { fontWeight: 600 } }}
                value={recipeData.title}
                onChange={handleChange}
              />
            </FormControl>

            {/* Description */}
            <FormControl>
              <FormLabel>Description (optional)</FormLabel>
              <Input
                name='description'
                value={recipeData.description}
                onChange={handleChange}
                variant='unstyled'
              />
            </FormControl>

            {/* Ingredients */}
            <FormControl>
              <FormLabel>Ingredients (one on each line)</FormLabel>
              <Textarea
                name='ingredients'
                value={recipeData.ingredients}
                onChange={handleChange}
                variant='unstyled'
                rows={2}
                placeholder='Enter your ingredients, one per line...'
                resize='none'
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                }}
              />
            </FormControl>

            {/* Instructions */}
            <FormControl>
              <FormLabel>
                Instructions (steps to reproduce this recipe)
              </FormLabel>
              <Textarea
                name='instructions'
                value={recipeData.instructions}
                onChange={handleChange}
                variant='unstyled'
                rows={6}
                placeholder='Enter your instructions, one step per line...'
                resize='none'
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                }}
              />
            </FormControl>

            {/* Add Recipe Button */}
            <Button
              w='300px'
              type='submit'
              bgColor='#FFBE73'
              _hover={{ bgColor: "#FF8900" }}
            >
              Add Recipe
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

export default AddRecipe;
