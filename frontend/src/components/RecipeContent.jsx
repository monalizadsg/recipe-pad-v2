import { useState, useEffect } from "react";
import { Box, Flex, Image, ListItem, Text, List } from "@chakra-ui/react";
import BackButton from "./BackButton";
import favIcon from "../assets/heart.png";
import editIcon from "../assets/edit.png";
import deletetIcon from "../assets/trash.png";
import activeFavIcon from "../assets/active_favorite.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteFavoriteRecipe,
  deleteRecipe,
  getRecipeById,
  saveFavoriteRecipe,
} from "../user/RecipesService";
import { CustomToast, getCurrentUserId } from "../commons/utils";
import AddRecipe from "./../user/AddRecipe";
import ScrollContainer from "./ScrollContainer";

function RecipeContent({ isUserRecipe, isLandingPage }) {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const location = useLocation();
  const recipeId = location?.state?.recipeId;
  const isOnEdit = location?.state?.isEditing;
  const { addToast } = CustomToast();
  const navigate = useNavigate();
  const userId = getCurrentUserId();

  useEffect(() => {
    async function fetchData() {
      const newData = await getRecipeById(recipeId);
      setData(newData);
      setIsFav(newData.isFavorite);
    }
    if (!(isOnEdit === false)) {
      setIsEditing(isOnEdit);
    }
    fetchData();
  }, [recipeId, isOnEdit]);

  const handleDelete = async () => {
    const result = await deleteRecipe(data._id);
    if (result.status === 200) {
      addToast({
        title: "Recipe deleted!",
        type: "success",
      });
      setTimeout(navigate("/my-recipes"), 8000);
    }
  };

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleOnSaveFavorite = async () => {
    const result = await saveFavoriteRecipe(recipeId, userId);
    if (result.status === 200) {
      addToast({
        title: "Save recipe as favorite!",
        type: "success",
      });
      setData(result.data.recipe);
      setIsFav(true);
    }
  };

  const handleOnRemoveFavorite = async () => {
    const result = await deleteFavoriteRecipe(recipeId, userId);
    if (result.status === 200) {
      addToast({
        title: "Remove recipe as favorite!",
        type: "success",
      });
      setIsFav(false);
    }
  };

  const Content = () => {
    return (
      data && (
        <>
          <BackButton />
          <Box
            p={8}
            pt={6}
            bgColor='#FFFAEF'
            borderRadius={10}
            position='relative'
          >
            <Flex flexDir='column' gap={5}>
              <Flex gap={10} alignItems='center'>
                <Image
                  // cursor='pointer'
                  boxSize='150px'
                  src={data?.imgUrl}
                  style={{ objectFit: "cover" }}
                  alt=''
                />
                {!isLandingPage && (
                  <Flex flexDir='column' gap={2}>
                    <Text as='b' fontSize='xl'>
                      {data?.name}
                    </Text>
                    <Flex gap={3}>
                      {isFav ? (
                        <Image
                          cursor='pointer'
                          boxSize='20px'
                          src={activeFavIcon}
                          onClick={handleOnRemoveFavorite}
                          alt='Favorite Recipe'
                        />
                      ) : (
                        <Image
                          cursor='pointer'
                          boxSize='20px'
                          src={favIcon}
                          onClick={handleOnSaveFavorite}
                          alt='Favorite Recipe'
                        />
                      )}

                      {isUserRecipe && (
                        <>
                          <Image
                            cursor='pointer'
                            boxSize='25px'
                            src={editIcon}
                            onClick={handleEdit}
                            alt='Favorite Recipe'
                          />
                          <Image
                            cursor='pointer'
                            boxSize='20px'
                            src={deletetIcon}
                            onClick={handleDelete}
                            alt='Favorite Recipe'
                          />
                        </>
                      )}
                    </Flex>
                  </Flex>
                )}
              </Flex>
              {data?.description && <Text>{data.description}</Text>}
              <DisplayList title='Ingredients' list={data?.ingredients} />
              <DisplayList title='Instructions' list={data?.instructions} />
            </Flex>
          </Box>
        </>
      )
    );
  };

  return isEditing ? (
    <AddRecipe isEditing={isEditing} selectedRecipe={data} />
  ) : isLandingPage ? (
    <Flex
      flexDir='column'
      margin='0 auto'
      justifySelf='center'
      gap={4}
      w='80%'
      p='30px'
    >
      <Content />
    </Flex>
  ) : (
    <ScrollContainer>
      <Flex
        flexDir='column'
        gap={4}
        // border='1px solid green'
        height='calc(100vh - 60px)'
      >
        <Content />
      </Flex>
    </ScrollContainer>
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
