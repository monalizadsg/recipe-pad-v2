import { useEffect, useState } from "react";
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
import { addRecipe, editRecipe } from "./RecipesService";
import { CustomToast, getCurrentUserId } from "../commons/utils";
import { useNavigate } from "react-router-dom";

function AddRecipe({ isEditing, selectedRecipe }) {
  const [recipeData, setRecipeData] = useState({
    image: "",
    name: "",
    description: "",
    ingredients: "",
    instructions: "",
  });
  // const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [image, setImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const ownerId = getCurrentUserId();
  const navigate = useNavigate();
  const { addToast } = CustomToast();

  useEffect(() => {
    if (selectedRecipe) {
      setRecipeData(selectedRecipe);
      setImage(selectedRecipe.imgUrl);
      // setSelectedRecipe(selectedRecipe);
    }
  }, [selectedRecipe]);

  useEffect(() => {
    const { name, ingredients, instructions } = recipeData;
    const disabled =
      !name ||
      !(selectedRecipe ? recipeData?.imgUrl : image) ||
      !ingredients ||
      !instructions;
    setIsDisabled(disabled);
    console.log({ isDisabled: disabled });
  }, [image, recipeData, selectedRecipe]);

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
    const { name, description, ingredients, instructions } = recipeData;
    const recipe = {
      name,
      description,
      imgFile: image,
      ingredients,
      instructions,
      ownerId: ownerId,
    };

    let upsertPromise = null;
    if (selectedRecipe?._id) {
      upsertPromise = editRecipe(recipe, selectedRecipe?._id);
    } else {
      upsertPromise = addRecipe(recipe);
    }

    try {
      const result = await upsertPromise;
      if (result.status === 200 || result.status === 201) {
        if (isEditing) {
          console.log({ result });
          addToast({
            title: "Recipe updated!",
            type: "success",
          });
          setTimeout(navigate(`/my-recipes`), 8000);
        } else {
          addToast({
            title: "Recipe created!",
            type: "success",
          });
          setTimeout(navigate("/my-recipes"), 8000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { name, description, ingredients, instructions } = recipeData;

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
          {`${isEditing ? "Edit" : "New"} Recipe`}
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={3} align='stretch' alignItems='center'>
            {/* Image Upload */}
            <ImageUploader
              onChange={handleImageChange}
              imgUrl={recipeData.imgUrl}
            />

            {/* Title */}
            <FormControl>
              <Input
                type='text'
                name='name'
                fontWeight={700}
                variant='unstyled'
                placeholder='Title your recipe...'
                fontSize='xl'
                sx={{ "::placeholder": { fontWeight: 600 } }}
                value={name}
                onChange={handleChange}
              />
            </FormControl>

            {/* Description */}
            <FormControl>
              <FormLabel>Description (optional)</FormLabel>
              <Textarea
                name='description'
                value={description}
                onChange={handleChange}
                variant='unstyled'
                // rows={4}
                // placeholder='Enter your ingredients, one per line...'
                resize='none'
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                }}
              />
            </FormControl>

            {/* Ingredients */}
            <FormControl>
              <FormLabel>Ingredients (one on each line)</FormLabel>
              <Textarea
                name='ingredients'
                value={ingredients}
                onChange={handleChange}
                variant='unstyled'
                // rows={4}
                placeholder='Enter your ingredients, one per line...'
                resize='none'
                // sx={{
                //   "&::-webkit-scrollbar": {
                //     width: "4px",
                //   },
                // }}
              />
            </FormControl>

            {/* Instructions */}
            <FormControl>
              <FormLabel>
                Instructions (steps to reproduce this recipe)
              </FormLabel>
              <Textarea
                name='instructions'
                value={instructions}
                onChange={handleChange}
                variant='unstyled'
                // rows={6}
                placeholder='Enter your instructions, one step per line...'
                resize='none'
                // sx={{
                //   "&::-webkit-scrollbar": {
                //     width: "4px",
                //   },
                // }}
              />
            </FormControl>

            {/* Add Recipe Button */}
            <Button
              w='300px'
              type='submit'
              bgColor='#FFBE73'
              _hover={{ bgColor: "#FF8900" }}
              isDisabled={isDisabled}
            >
              {isEditing ? "Save" : "Add Recipe"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

export default AddRecipe;
